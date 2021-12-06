import { addMilliseconds } from "date-fns";
import { CookieOptions, Request } from "express";
import { sign, verify } from "jsonwebtoken";
import ms from "ms";
import constants from "../constants";
import { Context } from "../context";

export type JwtPayload = {
	userId: string;
};

type GetUserIdContext = {
	request: Request;
	connection?: any;
};

export const createAccessToken = (payload: JwtPayload) => {
	return sign(payload, constants.JWT_ACCESS_SECRET, {
		expiresIn: constants.JWT_ACCESS_EXPIRATION,
	});
};

export const createRefreshToken = (payload: JwtPayload) => {
	return sign(payload, constants.JWT_REFRESH_SECRET, {
		expiresIn: constants.JWT_REFRESH_EXPIRATION,
	});
};

export const createRefreshCookie = (
	jwt: string
): [string, string, CookieOptions] => {
	const isProd = process.env.NODE_ENV === "production";
	const cookieOptions: CookieOptions = {
		secure: isProd ? true : false,
		httpOnly: true,
		expires: addMilliseconds(Date.now(), ms(constants.JWT_REFRESH_EXPIRATION)),
		// Same site if frontend and backend are not separate
		// sameSite: true
	};

	return ["refresh", jwt, cookieOptions];
};

export const removeRefreshCookie = (context: any) => {
	context.response.cookie("refresh", "", { expires: new Date() });
};

export const createTokens = async (payload: JwtPayload, context?: Context) => {
	const accessToken = createAccessToken(payload);
	const refreshToken = createRefreshToken(payload);

	if (!!context) {
		const refreshCookie = createRefreshCookie(refreshToken);
		context.response.cookie(...refreshCookie);
	}

	return {
		accessToken,
		refreshToken,
	};
};

export function getUserId({ request, connection }: GetUserIdContext) {
	const Authorization = connection
		? connection.context.authorization
		: request.get("Authorization");
	if (Authorization) {
		const token = Authorization.replace("Bearer ", "");
		const verifiedToken = verify(
			token,
			constants.JWT_ACCESS_SECRET
		) as JwtPayload;
		return verifiedToken && verifiedToken.userId;
	}
}

export function getRefreshCookie({
	request,
}: Pick<GetUserIdContext, "request">) {
	const refreshToken = request.cookies["refresh"];
	if (refreshToken) {
		const jwtContent = verify(
			refreshToken,
			constants.JWT_REFRESH_SECRET
		) as JwtPayload;
		return jwtContent;
	}
}
