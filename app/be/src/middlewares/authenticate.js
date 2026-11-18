import AppError from "../utils/AppError.js";
import { verifyToken } from "../utils/JwtProvider.js";
import env from "../config/env.js";

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization;
    if (!authHeader?.startsWith("Bearer ")) throw new AppError("Phiên đăng nhập không hợp lệ", 401);
    const accessToken = authHeader.split(" ")[1];
    const decoded = verifyToken(accessToken, env.SECRET_ACCESS_TOKEN);
    req.jwtDecoded = decoded;
    next();
  } catch (error) {
    next(error);
  }


}

export default authenticate;