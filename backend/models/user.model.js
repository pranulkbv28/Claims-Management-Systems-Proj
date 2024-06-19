import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please enter your fullname"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please enter your mobile number"],
      maxlength: [10, "Mobile number should not exceed more than 10 digits"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Password should be of atleast 6 chars"],
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
