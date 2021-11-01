
const constants = {
	JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "",
	JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "",
	JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION || "30 minutes",
	JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION || "30 days",
};

export default constants;
