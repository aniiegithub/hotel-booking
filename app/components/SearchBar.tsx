"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

export default function SearchBar() {
  const [location, setLocation] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!location || !dateRange?.from || !dateRange?.to) {
      alert("Please provide a location and select a date range");
      return;
    }

    // Convert date range to ISO format
    const checkinDate = dateRange.from.toISOString().split("T")[0];
    const checkoutDate = dateRange.to.toISOString().split("T")[0];
    console.log(checkinDate, checkoutDate);
    // Send request to the backend API
    const res = await fetch(
      `/api/hotel?location=${location}&checkInDate=${checkinDate}&checkOutDate=${checkoutDate}`
    );
    const data = await res.json();
    setResults(data.hotels);
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-4xl mx-auto mt-12 space-y-8">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        Find Your Perfect Stay
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Location input */}
        <Input
          placeholder="Where are you going?"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full"
        />

        {/* Date Range Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant="outline"
              className={`w-full justify-start text-left font-normal ${
                !dateRange?.from && "text-muted-foreground"
              }`}
            >
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              className="flex flex-col md:flex-row gap-4 p-4"
            />
          </PopoverContent>
        </Popover>

        {/* Search button */}
        <Button onClick={handleSearch} className="w-full">
          Search
        </Button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {results.map((hotel) => (
            <div
              key={hotel._id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all overflow-hidden"
            >
              {/* Hotel Image */}
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                {/* Hotel Name */}
                <h3 className="text-lg font-semibold text-gray-800">
                  {hotel.name}
                </h3>
                {/* Hotel Location */}
                <p className="text-sm text-gray-500">{hotel.location}</p>

                {/* Price */}
                <p className="text-xl text-blue-600 font-semibold mt-2">
                  ${hotel.price}/night
                </p>

                {/* Button or Link */}
                <Button variant="outline" className="w-full mt-4">
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
