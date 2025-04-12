import dbConfig from "@/lib/dbConfig";
import Hotel from "@/models/hotel.model";
import Room from "@/models/room.model";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConfig();
    const room_details = await req.json();
    const roomDetail = await Room.create(room_details);
    const hotelById = await Hotel.findOne({ _id: roomDetail.hotel });
    hotelById.rooms.push(roomDetail._id);
    await hotelById.save();
    return NextResponse.json(
      { Message: "Room is created sucessfully!", data: roomDetail },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { Message: "Something went Wrong!", error: error },
      { status: 500 }
    );
  }
}