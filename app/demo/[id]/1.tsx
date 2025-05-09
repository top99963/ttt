"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Register ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

const One: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const totalItems = 10; // Match the image's "1/5" indicator

  // Function to update item scales and z-index based on focused index
  const updateItemScales = () => {
    itemRefs.current.forEach((item, index) => {
      if (item) {
        const scale =
          index === focusedIndex
            ? 1
            : Math.abs(index - focusedIndex) === 1
            ? 0.8
            : 0.6;
        const zIndex =
          index === focusedIndex
            ? 10
            : Math.abs(index - focusedIndex) === 1
            ? 5
            : 1;
        gsap.to(item, {
          scale,
          zIndex,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  };

  // Update scales whenever focusedIndex changes
  useEffect(() => {
    updateItemScales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusedIndex]);

  // Function to scroll left
  const scrollLeft = () => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.getBoundingClientRect().width;
      const itemWidth = 128; // Effective width between item centers (256px - 128px overlap)
      const targetIndex = Math.max(0, focusedIndex - 1);
      const targetX = targetIndex * itemWidth - containerWidth / 2 + 128; // Center the item
      const maxScrollLeft = 0; // Prevent overscrolling left
      const adjustedX = Math.max(maxScrollLeft, targetX);

      gsap.to(scrollRef.current, {
        scrollTo: { x: adjustedX },
        duration: 0.5,
        ease: "power2.out",
        onStart: () => setFocusedIndex(targetIndex),
      });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.getBoundingClientRect().width;
      const itemWidth = 128; // Effective width between item centers (256px - 128px overlap)
      const targetIndex = Math.min(totalItems - 1, focusedIndex + 1);
      const targetX = targetIndex * itemWidth - containerWidth / 2 + 128; // Center the item
      const maxScrollRight = (totalItems - 1) * itemWidth; // Prevent overscrolling right
      const adjustedX = Math.min(maxScrollRight, targetX);

      gsap.to(scrollRef.current, {
        scrollTo: { x: adjustedX },
        duration: 0.5,
        ease: "power2.out",
        onStart: () => setFocusedIndex(targetIndex),
      });
    }
  };

  // Handle wheel event for horizontal scrolling with snap
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY;
      const containerWidth = container.getBoundingClientRect().width;
      const itemWidth = 128; // Effective width between item centers (256px - 128px overlap)

      let targetIndex: number;
      if (delta > 0) {
        // Scroll right
        targetIndex = Math.min(totalItems - 1, focusedIndex + 1);
      } else {
        // Scroll left
        targetIndex = Math.max(0, focusedIndex - 1);
      }

      const targetX = targetIndex * itemWidth - containerWidth / 2 + 128; // Center the item
      const maxScrollLeft = 0;
      const maxScrollRight = (totalItems - 1) * itemWidth;
      const adjustedX = Math.max(
        maxScrollLeft,
        Math.min(maxScrollRight, targetX)
      );

      gsap.to(container, {
        scrollTo: { x: adjustedX },
        duration: 0.5,
        ease: "power2.out",
        onStart: () => setFocusedIndex(targetIndex),
      });
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [focusedIndex]);

  return (
    <div className="relative flex flex-col items-center gap-4 p-4 text-white bg-black min-h-screen">
      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="flex w-full max-w-2xl overflow-x-auto overflow-y-hidden scroll-smooth"
      >
        {[...Array(totalItems)].map((_, index) => (
          <div
            key={index}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ref={(el) => (itemRefs.current[index] = el) as any}
            className="flex-shrink-0 w-64 h-[400px] bg-gray-800 rounded-lg shadow-lg flex flex-col"
            style={{ marginRight: "-128px", transformOrigin: "center center" }}
          ></div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollLeft}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 rounded-full p-2 text-white hover:bg-gray-600 z-50"
      >
        &lt;
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 rounded-full p-2 text-white hover:bg-gray-600 z-50"
      >
        &gt;
      </button>

      {/* Navigation Dots */}
      <div className="flex items-center gap-2 text-gray-400">
        <span>
          {focusedIndex + 1}/{totalItems}
        </span>
        <div className="flex gap-1">
          {[...Array(totalItems)].map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === focusedIndex ? "bg-white" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default One;
