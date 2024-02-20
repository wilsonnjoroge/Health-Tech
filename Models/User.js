
import mongoose from "mongoose";
import crypto from "crypto";


const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  idNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },

  passwordResetToken: String,
  passwordResetExpires: Date,

});

// Instance method generating reset token for forgot password
userSchema.methods.generatePasswordResetToken = function(){
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.passwordResetExpires = Date.now() + 300000; 

  return resetToken;
};

export default mongoose.model("User", userSchema);