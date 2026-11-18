import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import AppError from "../utils/AppError.js"

const errorHandler = (err, req, res, next) => {
  if (res.headerSent) return next(err);
  let error = err;
  console.log(error);
  // JWT
  if (error instanceof jwt.TokenExpiredError) {
    error = new AppError('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại', 401);
  } else if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.NotBeforeError) {
    error = new AppError('Phiên đăng nhập không hợp lệ', 401);
  }
  // Mongoose schema
  else if (error instanceof mongoose.Error.StrictModeError) {
    error = new AppError(`Field "${error.path}" không được khai báo trong Schema`, 400);
  } else if (error instanceof mongoose.Error.ValidationError) {
    error = new AppError("Dữ liệu không đáp ứng yêu cầu của database", 400);
  } else if (error instanceof mongoose.Error.CastError) {
    error = new AppError("ID hoặc giá trị dữ liệu không hợp lệ", 400);
  } else if (err?.code === 11000) {
    error = new AppError('Dữ liệu đã tồn tại', 409);
  } else if (!(error instanceof AppError)) {
    error = new AppError('Lỗi chưa xác định console để xem', 500);
  }
  const message = error.message;
  const statusCode = error.statusCode;
  const details = error.details ?? [];
  const response = {
    success: false,
    message,
  };
  if (details.length > 0) response.details = details;
  return res.status(statusCode).json(response);
}

export default errorHandler;