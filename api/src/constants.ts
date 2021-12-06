const constants = {
	JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "erhjebrgjhetbgethj",
	JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "rkjjrebgjhbgj4hgb",
	JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION || "5 minutes",
	JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION || "7 days",
};

export default constants;
