import { config } from "dotenv";
config({ path: ".env.development" });
const env = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT),
  MONGODB_URI: process.env.MONGODB_URI,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
  SECRET_ACCESS_TOKEN: process.env.SECRET_ACCESS_TOKEN,
  SECRET_REFRESH_TOKEN: process.env.SECRET_REFRESH_TOKEN,
  EXPIRES_ACCESS_TOKEN: process.env.EXPIRES_ACCESS_TOKEN,
  EXPIRES_REFRESH_TOKEN: process.env.EXPIRES_REFRESH_TOKEN,
};
export default env;