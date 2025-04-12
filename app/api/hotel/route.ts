import dbConfig from "@/lib/dbConfig";
import Booking from "@/models/booking.model";
import Hotel from "@/models/hotel.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    await dbConfig();
    const hotel_detail = await req.json();
    const user = await Hotel.create(hotel_detail);
    return NextResponse.json(
      { Message: "Hotel is created sucessfully!", data: user },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { Message: "Something went Wrong!", error: error },
      { status: 500 }
    );
  }
}

//getting function
export async function GET(req: NextRequest) {
  try {
    await dbConfig();

    const queries = req?.nextUrl?.searchParams;
    const location = queries.get("location");
    let checkInDate = queries.get("checkInDate");
    let checkOutDate = queries.get("checkOutDate");
    if (!(location && checkInDate && checkOutDate)) {
      return NextResponse.json(
        { message: "incomplete details" },
        { status: 401 }
      );
    }
    //all hotels at given location

    let totalHotels_at_location = await Hotel.find({
      location: location,
    }).populate("rooms");
    console.log(totalHotels_at_location);

    //sir's code +++++

    const bookedHotels = await Booking.find({
      location: location,
      $or: [
        {
          checkInDate: { $lte: checkOutDate }, //  if new's checkoutdate is more than old's checkin date
          checkOutDate: { $gte: checkInDate }, //new's checkindate is lesser than old's checkoutdate
        },
      ],
    });
    //gt+++++

    //seperating booked rooms--------
    let bookedRooms = bookedHotels.map((items: any) => items.room.toString());
    // below step just wanted to optimize teh code
    let bookedRoomsId = new Set(bookedRooms);

    // console.log(bookedRoomsId, "booked rooms");
    //

    //finding hotels with only available rooms
    let result = totalHotels_at_location
      .map((hotel: any) => {
        const availableRooms = hotel.rooms.filter(
          (room: any) => !bookedRoomsId.has(room._id.toString())
        );

        return {
          ...hotel.toObject(), //queries return us mongoose docs ,converted into js objects
          rooms: availableRooms,
        };
      })
      .filter((hotel: any) => hotel.rooms.length > 0); //removed hotels with 0 rooms

    // console.log(result, "result");
    //
    if (bookedHotels.length < 1) {
      return NextResponse.json(
        {
          Message: "Hotets are fetched sucessfully!",
          hotels: totalHotels_at_location,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { Message: "Hotets are fetched sucessfully!", hotels: result },
      { status: 200 }
    );
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { message: "server error", error: err.message },
      { status: 500 }
    );
  }
}
