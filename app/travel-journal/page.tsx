import React from "react";
import ArticleCard from "./article-card";
import items from "@/public/contents/travel-journal.json";

const TravelJournal = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Travel Journal
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <ArticleCard
              key={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
              category={item.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelJournal;
