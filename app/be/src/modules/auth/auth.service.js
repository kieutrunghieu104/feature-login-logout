import User from "../users/user.model.js";
import AppError from "../../utils/AppError.js";
import { generateToken } from "../../utils/JwtProvider.js";
import env from "../../config/env.js";

const loginService = async (data) => {
  const result = await User.findOne({ email: data.email }).select("+password").lean().exec();
  if (!result || result.password !== data.password) throw new AppError("Email hoặc mật khẩu không chính xác", 401);
  if (!result.isActive) throw new AppError("Tài khoản đã bị khóa", 403);
  const payload = {
    sub: result._id,
    role: result.role,
  }
  const accessToken = generateToken(payload, env.SECRET_ACCESS_TOKEN, env.EXPIRES_ACCESS_TOKEN);
  const refreshToken = generateToken({ sub: result._id }, env.SECRET_REFRESH_TOKEN, env.EXPIRES_REFRESH_TOKEN);
  return {
    user: {
      id: result._id,
      email: result.email,
      role: result.role,
    },
    accessToken,
    refreshToken,
  };
};

export {
  loginService,
}