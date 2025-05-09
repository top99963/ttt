"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const timeGap = 0.1;
const totalItems = 10;
const snapItem = gsap.utils.snap(timeGap);

function Three() {
  const container = useRef(null);
  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLLIElement>(".items .item");
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

      const SPACING = 0.1;
      const OVERLAP = 0;
      const START = 0.5;
      const LOOP_TIME = (items.length - 1 + OVERLAP) * SPACING + 1 - 0.5;

      RAW.time(START);
      LOOP.to(RAW, {
        time: LOOP_TIME,
        duration: LOOP_TIME - START,
        ease: "none",
      });

      const SCRUB = gsap.to(LOOP, {
        totalTime: 0,
        duration: 0.5,
        ease: "power3",
        paused: true,
        scrollTrigger: {},
      });

      // const snap = items.map(
      //   (item, index) => index / items.length + index * 0.011
      // );

      ScrollTrigger.create({
        start: 0,
        end: "+=2000",
        pin: ".gallery",
        onUpdate: (self) => {
          console.log(self);
          SCRUB.vars.totalTime = snapItem(self.progress * LOOP.duration());
          // SCRUB.vars.totalTime = self.progress * LOOP.duration();
          SCRUB.invalidate().restart();
        },
        // snap: {
        //   snapTo: snap,
        //   duration: {
        //     max: 0.3,
        //     min: 0.02,
        //   },
        //   delay: 0.0,
        //   ease: "none",
        //   directional: false,
        // },
      });

      // ScrollSmoother.create({
      //   // wrapper: container,
      //   // content: ".gallery",
      // });
    },
    { scope: container }
  );

  const cardStyle = `w-[450px] h-[600px] bg-gray-500 rounded-3xl flex items-center justify-center item absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2`;

  return (
    <div ref={container} className="">
      <div className="gallery">
        <div className="items flex flex-col items-center justify-center relative w-screen h-screen overflow-x-hidden">
          <div className="absolute w-1 h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white"></div>
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
