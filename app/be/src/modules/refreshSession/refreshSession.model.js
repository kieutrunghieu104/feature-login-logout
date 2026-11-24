import mongoose from "mongoose";

const refreshSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId là bắt buộc"],
  },
  familyId: {
    type: String,
    required: [true, "familyId là bắt buộc"],
  },
  tokenHash: {
    type: String,
    required: [true, "tokenHash là bắt buộc"],
  },
  expiresAt: {
    type: Date,
    required: [true, "expiresAt là bắt buộc"],
  },
  revokeAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
  versionKey: false,
  strict: "throw"
});

refreshSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const RefreshSession = mongoose.model("RefreshSession", refreshSessionSchema);
export default RefreshSession;