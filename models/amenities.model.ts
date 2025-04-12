// checkInDate, checkOutDate , location

const mongoose = require("mongoose");

const amenitiesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["room", "hotel", "common"],
      default: "hotel",
    },
    description: {
      type: String,
      required: true,
    },
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
  },
  { timestamps: true }
);

const Amenities =
  mongoose.models.Amenities || mongoose.model("Amenities", amenitiesSchema);
export default Amenities;