"use client";

import React, { useState } from "react";
import PlaceCard from "./place-card";
import places from "@/public/contents/behind-bottles.json";

const BehindBottles: React.FC = () => {
  const [filter, setFilter] = useState<string>("");

  const filteredPlaces = places.filter((place) =>
    place.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="mx-auto bg-white/10 rounded-3xl p-6">
        <h1 className="text-3xl font-bold mb-6 ">Behind Bottles</h1>
        <div className="lg:col-span-1">
          <input
            type="text"
            placeholder="Filter..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mb-6"
          />
          <div className="grid grid-cols-2 gap-4">
            {filteredPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                title={place.title}
                image={place.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BehindBottles;
