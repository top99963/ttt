"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const timeGap = 0.1;
const totalItems = 10;
const snapItem = gsap.utils.snap(timeGap);

function Three() {
  const container = useRef(null);
  const [currentIndex] = useState<number>(0);

  useEffect(() => {
    console.log(currentIndex);
  }, [currentIndex]);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLLIElement>(".items .item");

      const OVERLAP = Math.ceil(1 / timeGap);
      const START = items.length * timeGap;
      const LOOP_TIME = (items.length + OVERLAP) * timeGap + 1;
      const LOOP = gsap.timeline({
        paused: true,
        repeat: -1,
      });

      const RAW = gsap.timeline({ paused: true });
      let time = 0;
      let i;
      let item;
      gsap.set(items, { xPercent: -50 });

      for (i = 0; i < items.length; i++) {
        item = items[i];
        time = i * timeGap;
        RAW.fromTo(
          item,
          { scale: 0.3 },
          {
            scale: 1,
            zIndex: 100,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "none",
            immediateRender: true,
          },
          time
        ).fromTo(
          item,
          //   { xPercent: 250 },
          //   { xPercent: -250, duration: 1, ease: "none", immediateRender: false },
          { xPercent: -50 },
          {
            keyframes: {
              "0%": { xPercent: -50 },
              "20%": { xPercent: -125 },
              "30%": { xPercent: -150 },
              "33.33%": { xPercent: -125 },
              "66.66%": { xPercent: 25 },
              "70%": { xPercent: 50 },
              "80%": { xPercent: 25 },
              "100%": { xPercent: -50 },
            },
            duration: 1,
            ease: "none",
            immediateRender: false,
          },
          time
        );
      }

      // here's where we set up the scrubbing of the playhead to make it appear seamless.
      RAW.time(START);
      LOOP.to(RAW, {
        time: LOOP_TIME,
        duration: LOOP_TIME - START,
        ease: "none",
      }).fromTo(
        RAW,
        { time: OVERLAP * timeGap + 1 },
        {
          time: START,
          duration: START - (OVERLAP * timeGap + 1),
          immediateRender: false,
          ease: "none",
        }
      );

      const SCRUB = gsap.to(RAW, {
        totalTime: 0,
        duration: 0.5,
        ease: "power3",
        paused: true,
      });

      // let iteration = 0;
      // let isWrapping = false;

      // const wrapForward = (trigger: ScrollTrigger) => {
      //   console.log("iteration ", iteration);
      //   iteration++;
      //   isWrapping = true;
      //   trigger.scroll(trigger.start + 1);
      // };

      // const wrapBackward = (trigger: ScrollTrigger) => {
      //   iteration--;
      //   if (iteration < 0) {
      //     iteration = 9;
      //     LOOP.totalTime(LOOP.totalTime() + LOOP.duration() * 10);
      //   }

      //   trigger.scroll(trigger.end - 1);
      // };

      gsap.timeline({
        scrollTrigger: {
          start: 0,
          end: "+=6000",
          pin: ".gallery",
          onUpdate: (self) => {
            SCRUB.vars.totalTime = snapItem(self.progress * LOOP.duration());
            SCRUB.invalidate().restart();
            // isWrapping = false;
          },
        },
      });
    },
    { scope: container }
  );

  const cardStyle = `w-[450px] h-[600px] bg-gray-500 rounded-3xl flex items-center justify-center item absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2`;

  return (
    <div ref={container} className="">
      <div className="gallery">
        <div className="items flex items-center justify-center relative w-screen h-screen overflow-y-hidden">
          {Array.from({ length: totalItems }).map((_, i) => (
            <div key={i} className={cardStyle}>
              {i}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Three;
