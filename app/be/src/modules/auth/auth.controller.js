import ms from "ms";
import {
  loginService,
  logoutService,
  refreshTokenService,
} from "./auth.service.js";
import env from "../../config/env.js";

const loginController = async (req, res) => {
  const result = await loginService(req.validated.body);
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: ms(env.EXPIRES_REFRESH_TOKEN),
  })
  return res.status(200).json({
    success: true,
    message: "Đăng nhập thành công",
    data: {
      accessToken: result.accessToken,
    },
  })
};

const logoutController = async (req, res) => {
  await logoutService(req.cookies?.refreshToken);
  res.clearCookie("refreshToken");
  return res.status(200).json({
    success: true,
    message: "Đăng xuất thành công",
  })
};

const refreshTokenController = async (req, res) => {
  const result = await refreshTokenService(req.cookies?.refreshToken);
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: ms(env.EXPIRES_REFRESH_TOKEN),
  });
  return res.status(200).json({
    success: true,
    message: "Làm mới Access Token thành công",
    date: {
      accessToken: result.accessToken,
    },
  });
};

export {
  loginController,
  logoutController,
  refreshTokenController,
}