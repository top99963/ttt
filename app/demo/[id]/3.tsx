"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import TiltCard from "./2";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const amount = 10;
const spacing = 0.1;
const start = 0.5;
const loopTime = (amount - 1) * spacing + 1 - 0.5;

function Three() {
  const container = useRef(null);
  const trigger = useRef<ScrollTrigger>(null);
  const scrub = useRef<gsap.core.Tween>(null);
  const loop = useRef<gsap.core.Timeline>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
        time = i * spacing;
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

      RAW.time(start);
      LOOP.to(RAW, {
        time: loopTime,
        duration: (loopTime - start).toPrecision(1),
        ease: "none",
      });

      const SCRUB = gsap.to(LOOP, {
        totalTime: 0,
        duration: 0.5,
        ease: "power3",
        paused: true,
      });

      scrub.current = SCRUB;
      loop.current = LOOP;

      trigger.current = ScrollTrigger.create({
        scroller: container.current,
        start: 0,
        end: `+=` + amount * 150,
        pin: ".items",
        onUpdate: (self) => {
          SCRUB.vars.totalTime = self.progress * LOOP.duration();
          SCRUB.invalidate().restart();
          const index = Math.round(self.progress * (items.length - 1));
          setCurrentIndex(index);
        },
        snap: {
          snapTo: items.map((_, index) => index / (items.length - 1)),
          duration: {
            max: 0.3,
            min: 0.02,
          },
          delay: 0.0,
          ease: "none",
          directional: false,
        },
      });
    },
    { scope: container }
  );

  const cardStyle = `item absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`;

  const handleNext = () => {
    const totalTime = scrub.current?.vars.totalTime + spacing;
    const progress = totalTime / loop.current!.duration();
    trigger.current?.scroll(
      trigger.current.start +
        progress * (trigger.current.end - trigger.current.start)
    );
  };
  const handlePrev = () => {
    const totalTime = scrub.current?.vars.totalTime - spacing;
    const progress = totalTime / loop.current!.duration();
    trigger.current?.scroll(
      trigger.current.start +
        progress * (trigger.current.end - trigger.current.start)
    );
  };

  return (
    <div className="relative">
      <div
        ref={container}
        className="max-h-[650px] overflow-y-scroll overflow-x-hidden"
      >
        <div className="items flex flex-col items-center justify-center relative h-[650px] w-[1300px]">
          {Array.from({ length: amount }).map((_, i) => (
            <div key={i} className={cardStyle}>
              <TiltCard key={i}>
                <img
                  className="w-full h-full object-cover"
                  src={
                    "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
                  }
                ></img>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <button className="btn" onClick={handleNext}>
          Next
        </button>
        {currentIndex}
        <button className="btn" onClick={handlePrev}>
          Prev
        </button>
      </div>
    </div>
  );
}

export default Three;
