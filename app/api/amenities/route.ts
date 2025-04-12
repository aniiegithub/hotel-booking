// .env.localimport dbConfig from "@/lib/db.config";
import dbConfig from "@/lib/dbConfig";
import Hotel from "@/models/hotel.model";
import Room from "@/models/room.model";
import Amenities from "@/models/amenities.model";
import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

export async function POST(req: any) {
  try {
    await dbConfig();
    const amenities_details = await req.json();
    if (amenities_details.category === "common") {
      const hotelById = await Hotel.findById(amenities_details.hotel);
      if (hotelById.rooms.indexOf(amenities_details.room) == -1) {
        return NextResponse.json(
          { Message: "Room is not present in hotel" },
          { status: 500 }
        );
      }
    }
    const amentiesDetail = await Amenities.create(amenities_details);
    // console.log("AmenityDetails : ",amentiesDetail)
    if (amentiesDetail.category == "hotel") {
      const hotelById = await Hotel.findOne({ _id: amentiesDetail.hotel });
      hotelById.amenties.push(amentiesDetail._id);
      await hotelById.save();
    } else if (amentiesDetail.category == "room") {
      const roomById = await Room.findOne({ _id: amentiesDetail.room });
      roomById.amenties.push(amentiesDetail._id);
      await roomById.save();
    } else {
      const hotelById = await Hotel.findOne({ _id: amentiesDetail.hotel });
      // console.log(hotelById);
      hotelById.amenties.push(amentiesDetail._id);
      await hotelById.save();
      const roomById = await Room.findOne({ _id: amentiesDetail.room });
      roomById.amenities.push(amentiesDetail._id);
      // console.log("roomById with pushed amenity: ", roomById);
      await roomById.save();
    }
    return NextResponse.json(
      { Message: "Amenity is created sucessfully!", data: amentiesDetail },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { Message: "Something went Wrong!", error: error },
      { status: 500 }
    );
  }
}