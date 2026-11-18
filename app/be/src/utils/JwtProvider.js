import jwt from "jsonwebtoken";

const generateToken = (payload, secret, expiresIn) => jwt.sign(payload, secret, { expiresIn });
const verifyToken = (token, secret) => jwt.verify(token, secret);

export {
  generateToken,
  verifyToken,
};