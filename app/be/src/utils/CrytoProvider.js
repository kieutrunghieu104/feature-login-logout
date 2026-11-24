import crypto from "node:crypto";

const hashData = data => crypto.createHash("sha256").update(data).digest("hex");
const generateId = () => crypto.randomUUID();

export {
  hashData,
  generateId,
}