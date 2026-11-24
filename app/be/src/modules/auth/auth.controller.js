import ms from "ms";
import {
  loginService,
  logoutService,
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

export {
  loginController,
  logoutController,
}