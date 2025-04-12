import mongoose from "mongoose";
import { match } from "node:assert";
const bcrypt = require("bcrypt");
import { Schema, Types } from 'mongoose';

interface IHotel{
    hotel_name:string;
    hotel_full_address: string;
    hotel_contactNo: string;
    ratings: string;
    description: string;
    location: string;
    amenties: Types.ObjectId;
    hotel_image: Types.ObjectId;
    rooms: Types.ObjectId
}

const hotelSchema = new mongoose.Schema(
  {
    hotel_name: { type: String, required: true },
    hotel_full_address: { type: String, required: true },
    hotel_contactNo: {
      type: String,
      required: true,
      unique: true,
      pattern: [
        "^(+91[-s]?)?[0]?(91)?[789]d{9}$",
        "Please put your valid Phone number",
      ],
    },
    ratings: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    amenties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Amenities",
      },
    ],
    hotel_image: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
      },
    ],
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
  },
  { timestamps: true }
);

const Hotel = mongoose.models.Hotel || mongoose.model("Hotel", hotelSchema);
export default Hotel;
// {
//     "hotel_name" : "vsshotels",
//     "hotel_full_address" : "chinchwad pune",
//     "hotel_contactNo" : "1234569875",
//     "ratings" : "4",
//     "description" : "Its very nice!!",
//     "location" : "pune"
// }