"use client";

import React, { useState } from "react";
import provinces from "@/public/contents/provinces.json";
import ProvinceCard from "./card";

interface Province {
  id: string;
  name: string;
  description: string;
  image: string;
}

const Directory: React.FC = () => {
  const [filter, setFilter] = useState<string>("");

  // Filter provinces based on search input
  const filteredProvinces = provinces.filter((province) =>
    province.name.toLowerCase().includes(filter.toLowerCase())
  ) as Province[];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Directory of Provinces</h1>
          <input
            type="text"
            placeholder="Search provinces..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 "
          />
        </div>
        <div className="space-y-6">
          {filteredProvinces.map((province) => (
            <ProvinceCard
              key={province.id}
              name={province.name}
              description={province.description}
              image={province.image}
              id={province.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Directory;
