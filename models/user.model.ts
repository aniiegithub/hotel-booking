import mongoose from "mongoose";
const bcrypt = require("bcrypt");
import { Schema, Types } from 'mongoose';


interface IUser{
  first_name: string;
  last_name: string;
  age: number;
  phoneNumber: string;
  password: string;
  adhaarCard: string;
  email: string;
  address: string;
  zip_code: number;
  role: string;
  booking: Types.ObjectId
}


const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      minLength: 3,
    },
    last_name: {
      type: String,
      required: true,
      minLength: 3,
    },
    age: {
      type: Number,
    },
    phoneNumber: {
      type:String,
      required: true,
      unique: true,
      pattern: [
        "^(+91[-s]?)?[0]?(91)?[789]d{9}$",
        "Please put your valid phoen number",
      ],
    },
    password:{
        type:String,
        required:true,
        minLength: [6, "Kindly give a strong password"]
    },
    adhaarCard: {
      type: String,
    //   required: false,
    //   unique: true,
      pattern: [
        "^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$",
        "Please put your valid adhaar card",
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      pattern: [
        "/^w+([.-]?w+)@w+([.-]?w+)(.w{2,3})+$/",
        "Please fill a valid email address",
      ],
    },
    address: {
      type: String,
      required: true,
      minLength: 5,
    },
    zip_code: {
      type: Number,
      pattern: ["^[1-9][0-9]{5}$", "Please input the correct zipcode"],
    },
    role: {
      type: String,
      enum: ["SUPER ADMIN", "ADMIN", "USER"],
      default: "USER",
    },
    booking: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


const User = mongoose.models.user || mongoose.model("User", userSchema);
export default User;

// {
//   "first_name" : "abc",
//   "last_name" : "xyz",
//   "phoneNumber" : "1234567894",
//   "password" : "abc@123",
//   "email" : "abc123@gmail.com"
// }