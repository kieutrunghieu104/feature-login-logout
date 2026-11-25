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
  if (!result) return;
  await RefreshSession.updateMany({
    userId: decoded.sub,
    familyId: result.familyId,
    revokeAt: null,
  }, {
    $set: {
      revokeAt: new Date(),
    }
  }).exec();
};

const refreshTokenService = async refreshToken => {
  if (!refreshToken) throw new AppError("Không tìm thấy Refresh Token", 401);
  const decoded = verifyToken(refreshToken, env.SECRET_REFRESH_TOKEN);
  const result = await RefreshSession.findOne({
    userId: decoded.sub,
    tokenHash: hashData(refreshToken),
  }).select("familyId").lean().exec();
  if (!result) throw new AppError("Refresh Token không tồn tại hoặc đã bị thu hồi", 401);
  const currentSession = await RefreshSession.findOneAndUpdate({
    userId: decoded.sub,
    familyId: result.familyId,
    tokenHash: hashData(refreshToken),
    expiresAt: { $gt: new Date() },
    revokeAt: null,
  }, {
    $set: {
      revokeAt: new Date(),
    }
  }).lean().exec();
  if (!currentSession) {
    await RefreshSession.updateMany({
      userId: decoded.sub,
      familyId: result.familyId,
      revokeAt: null,
    }, {
      $set: {
        revokeAt: new Date(),
      }
    }).exec();
    throw new AppError("Refresh Token đã được sử dụng hoặc không hợp lệ. Phiên đăng nhập đã bị thu hồi", 401);
  }
  const user = await User.findById(decoded.sub).lean().exec();
  if (!user || !user.isActive) {
    await RefreshSession.updateMany({
      userId: decoded.sub,
      revokeAt: null,
    }, {
      $set: {
        revokeAt: new Date(),
      }
    }).exec();
    throw new AppError("Tài khoản không hợp lệ hoặc đã bị khóa", 401);
  }
  const newAccessToken = generateToken({ sub: user._id, role: user.role }, env.SECRET_ACCESS_TOKEN, env.EXPIRES_ACCESS_TOKEN);
  const newRefreshToken = generateToken({ sub: user._id }, env.SECRET_REFRESH_TOKEN, env.EXPIRES_REFRESH_TOKEN);
  await RefreshSession.create({
    userId: user._id,
    familyId: result.familyId,
    tokenHash: hashData(newRefreshToken),
    expiresAt: new Date(Date.now() + ms(env.EXPIRES_REFRESH_TOKEN)),
  });
  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  }
};

export {
  loginService,
  logoutService,
  refreshTokenService,
}