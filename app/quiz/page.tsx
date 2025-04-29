"use client";

import React, { useState } from "react";
import Link from "next/link";

const questions = [
  {
    question: "Cuisine do you prefer?",
    options: ["Thai", "International", "Street Food"],
  },
  {
    question: "Preferred travel style?",
    options: ["Cultural", "Beach", "Nature"],
  },
  { question: "Favorite activity?", options: ["Hiking", "Diving", "Shopping"] },
  { question: "Weather preference?", options: ["Cool", "Tropical", "Mild"] },
  {
    question: "Accommodation style?",
    options: ["Resort", "Homestay", "Camping"],
  },
  { question: "Transportation preference?", options: ["Car", "Boat", "Walk"] },
  {
    question: "Preferred scenery?",
    options: ["Mountains", "Beaches", "Cityscape"],
  },
  {
    question: "Dining experience?",
    options: ["Fine Dining", "Local Markets", "Cafes"],
  },
  {
    question: "Cultural interest?",
    options: ["Temples", "Festivals", "Museums"],
  },
  {
    question: "Nightlife preference?",
    options: ["Vibrant", "Relaxed", "Quiet"],
  },
];

const provinceScoring = {
  Thai: { ChiangMai: 2, Phuket: 1, Krabi: 1 },
  International: { Phuket: 2, Krabi: 1, ChiangMai: 0 },
  "Street Food": { ChiangMai: 1, Phuket: 1, Krabi: 2 },
  Cultural: { ChiangMai: 2, Phuket: 0, Krabi: 1 },
  Beach: { Phuket: 2, Krabi: 2, ChiangMai: 0 },
  Nature: { ChiangMai: 1, Phuket: 1, Krabi: 1 },
  Hiking: { ChiangMai: 2, Phuket: 0, Krabi: 1 },
  Diving: { Phuket: 2, Krabi: 2, ChiangMai: 0 },
  Shopping: { ChiangMai: 1, Phuket: 1, Krabi: 0 },
  Cool: { ChiangMai: 2, Phuket: 0, Krabi: 0 },
  Tropical: { Phuket: 2, Krabi: 2, ChiangMai: 0 },
  Mild: { ChiangMai: 1, Phuket: 1, Krabi: 1 },
  Resort: { Phuket: 2, Krabi: 2, ChiangMai: 0 },
  Homestay: { ChiangMai: 2, Phuket: 0, Krabi: 1 },
  Camping: { ChiangMai: 1, Phuket: 1, Krabi: 1 },
  Car: { ChiangMai: 1, Phuket: 1, Krabi: 1 },
  Boat: { Phuket: 2, Krabi: 2, ChiangMai: 0 },
  Walk: { ChiangMai: 2, Phuket: 0, Krabi: 1 },
  Mountains: { ChiangMai: 2, Phuket: 0, Krabi: 1 },
  Beaches: { Phuket: 2, Krabi: 2, ChiangMai: 0 },
  Cityscape: { ChiangMai: 1, Phuket: 1, Krabi: 0 },
  "Fine Dining": { Phuket: 2, Krabi: 1, ChiangMai: 0 },
  "Local Markets": { ChiangMai: 1, Phuket: 1, Krabi: 2 },
  Cafes: { ChiangMai: 2, Phuket: 0, Krabi: 1 },
  Temples: { ChiangMai: 2, Phuket: 0, Krabi: 1 },
  Festivals: { ChiangMai: 1, Phuket: 1, Krabi: 1 },
  Museums: { ChiangMai: 1, Phuket: 1, Krabi: 0 },
  Vibrant: { Phuket: 2, Krabi: 1, ChiangMai: 0 },
  Relaxed: { ChiangMai: 1, Phuket: 1, Krabi: 2 },
  Quiet: { ChiangMai: 2, Phuket: 0, Krabi: 1 },
};

const provinceDetails = {
  ChiangMai: {
    name: "Chiang Mai",
    description:
      "Discover the cultural heart of Thailand with ancient temples, lush mountains, and vibrant night markets.",
    image:
      "https://i0.wp.com/www.iurban.in.th/wp-content/uploads/2017/09/icover2017-romantic-cm5-1.jpg",
  },
  Phuket: {
    name: "Phuket",
    description:
      "Relax on stunning beaches, dive into crystal-clear waters, and enjoy a lively nightlife.",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/4b/5d/c8/caption.jpg?w=1200&h=-1&s=1&cx=2606&cy=1838&chk=v1_a61182fd4040ed4ecc4e",
  },
  Krabi: {
    name: "Krabi",
    description:
      "Explore dramatic limestone cliffs, hidden lagoons, and some of the best beaches in Thailand.",
    image:
      "https://www.eatchillwander.com/wp-content/uploads/2020/10/krabi-complete-travel-guide.jpg",
  },
};

const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [scores, setScores] = useState<{ [key: string]: number }>({
    ChiangMai: 0,
    Phuket: 0,
    Krabi: 0,
  });
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleNext = () => {
    if (selectedOption) {
      // Update scores based on the selected option
      const scoreUpdate =
        provinceScoring[selectedOption as keyof typeof provinceScoring];
      setScores((prevScores) => ({
        ChiangMai: prevScores.ChiangMai + scoreUpdate.ChiangMai,
        Phuket: prevScores.Phuket + scoreUpdate.Phuket,
        Krabi: prevScores.Krabi + scoreUpdate.Krabi,
      }));

      if (currentQuestionIndex < questions.length - 1) {
        // Move to the next question
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        // Show results
        setShowResults(true);
      }
    }
  };

  // Determine the province with the highest score
  let topProvince = "ChiangMai";
  let maxScore = scores["ChiangMai"] || 0;

  Object.keys(scores).forEach((province) => {
    if (scores[province] > maxScore) {
      maxScore = scores[province];
      topProvince = province;
    } else if (scores[province] === maxScore) {
      // In case of a tie, randomly pick one
      topProvince = Math.random() > 0.5 ? province : topProvince;
    }
  });

  const provinceInfo =
    provinceDetails[topProvince as keyof typeof provinceDetails];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-green-800">
      {showResults ? (
        // Results View
        <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Your Perfect Destination
          </h1>
          <img
            src={provinceInfo.image}
            alt={provinceInfo.name}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {provinceInfo.name}
          </h2>
          <p className="text-gray-600 mb-6">{provinceInfo.description}</p>
          <Link href={`/directory`}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
              Explore {provinceInfo.name}
            </button>
          </Link>
        </div>
      ) : (
        // Quiz View
        <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row items-center max-w-4xl w-full p-6">
          {/* Question Section */}
          <div className="flex-1 p-4">
            <h1 className="text-2xl font-bold mb-6">
              {questions[currentQuestionIndex].question}
            </h1>
            <div className="space-y-4">
              {questions[currentQuestionIndex].options.map((option) => (
                <label key={option} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="option"
                    value={option}
                    checked={selectedOption === option}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-5 h-5 bg-green-800"
                  />
                  <span className="text-lg text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            {/* Progress Dots */}
            <div className="flex space-x-2 my-6">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index <= currentQuestionIndex
                      ? "bg-green-800"
                      : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>
            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={!selectedOption}
              className={`btn w-full`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
