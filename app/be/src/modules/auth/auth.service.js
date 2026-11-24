import User from "../users/user.model.js";
import RefreshSession from "../refreshSession/refreshSession.model.js";
import AppError from "../../utils/AppError.js";
import { generateToken, verifyToken } from "../../utils/JwtProvider.js";
import { hashData, generateId } from "../../utils/CrytoProvider.js";
import env from "../../config/env.js";
import ms from "ms";

const loginService = async ({ email, password }) => {
  const result = await User.findOne({ email }).select("+password").lean().exec();
  if (!result) throw new AppError("Email của bạn chưa được đăng ký trong hệ thống", 401);
  if (result.password !== password) throw new AppError("Email hoặc mật khẩu không chính xác", 401);
  if (!result.isActive) throw new AppError("Tài khoản đã bị khóa", 403);
  const payload = {
    sub: result._id,
    role: result.role,
  }
  const accessToken = generateToken(payload, env.SECRET_ACCESS_TOKEN, env.EXPIRES_ACCESS_TOKEN);
  const refreshToken = generateToken({ sub: result._id }, env.SECRET_REFRESH_TOKEN, env.EXPIRES_REFRESH_TOKEN);
  await RefreshSession.create({
    userId: result._id,
    familyId: generateId(),
    tokenHash: hashData(refreshToken),
    expiresAt: new Date(Date.now() + ms(env.EXPIRES_REFRESH_TOKEN)),
  });
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

const logoutService = async refreshToken => {
  if (!refreshToken) return;
  const decoded = verifyToken(refreshToken, env.SECRET_REFRESH_TOKEN);
  const result = await RefreshSession.findOne({
    userId: decoded.sub,
    tokenHash: hashData(refreshToken),
  }).select("familyId").lean().exec();
  await RefreshSession.updateMany({
    userId: decoded.sub,
    familyId: result.familyId,
    revokeAt: null,
  }, {
    $set: {
      revokeAt: new Date(),
    }
  }).exec();
}

export {
  loginService,
  logoutService,
}