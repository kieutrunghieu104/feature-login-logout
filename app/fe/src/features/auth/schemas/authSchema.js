import { z } from 'zod';

const loginSchema = z.object({
  email: z
    .string({ error: 'Email phải là chuỗi ký tự' })
    .trim()
    .min(1, { error: 'Email là bắt buộc' })
    .max(150, { error: 'Email không được vượt quá 150' })
    .email({ error: 'Email không hợp lệ' }),
  password: z
    .string({ error: 'Password phải là chuỗi ký tự' })
    .min(6, { error: 'Mật khẩu phải có ít nhất 6 ký tự' })
    .regex(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).+$/,
      { error: "Mật khẩu phải chứa ít nhất một chữ cái, một chữ số và một ký tự đặc biệt", }
    ),
}).strict();

export {
  loginSchema,
};