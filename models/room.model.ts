import mongoose from "mongoose";
import { match } from "node:assert";
const bcrypt = require("bcrypt");
import { Schema, Types } from 'mongoose';

interface IRoom{
  room_name: string;
  hotel: string;
  amenties: Types.ObjectId;
  room_floor: number;
  room_facing: string;
  room_capacity: number;
  room_price: number;
  room_dimension: string;
  room_images: Types.ObjectId;
  bed_type: string;
  isSmoking: boolean
}


const roomSchema = new mongoose.Schema({
  room_name: {
    type: String,
    required: true,
    minLength: 5,
  },
  hotel: {
    type: String,
    required: true,
  },
  amenities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Amenities",
    },
  ],
  room_floor: {
    type: Number,
    required: true,
  },
  room_facing: {
    type: String,
    required: true,
    enum: [
      "North",
      "North-West",
      "North-East",
      "South",
      "South-West",
      "East",
      "West",
    ],
  },
  room_capacity: {
    type: Number,
    required: true,
  },
  room_price: {
    type: Number,
    required: true,
  },
  room_dimension: {
    type: String,
    required: true,
  },
  room_images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
  bed_type: { type: String, enum: ["twin", "Queen", "King"], required: true },
  isSmoking: { type: Boolean, default: false },
});

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);
export default Room;

  


// api data : 
// {
    
//   "room_name" : "Couple room",
//   "hotel" : "67ed31b1768fe70284864233",
//   "room_floor" : 5,
//   "room_facing" : "North",
//   "room_capacity" : 4,
//   "room_price" : 42000,
//   "room_dimension" : "5672",
//   "bed_type" : "twin",
//   "isSmoking" : false,
//   "hotel_name" : "vsshotels",
//   "hotel_full_address" : "chinchwad pune",
//   "hotel_contactNo" : "1234569875",
//   "ratings" : "4",
//   "description" : "Its very nice!!",
//   "location" : "pune"
   
// }