"use client";

import { useGSAP } from "@gsap/react";
import {
  Children,
  isValidElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltItem from "./tilt-item";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function Carousel({ children }: { children?: ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const container = useRef(null);
  const scroller = useRef<ScrollTrigger>(null);
  const wrapper = useRef<gsap.core.Timeline>(null);
  const pointer = useRef<gsap.core.Tween>(null);

  const items: ReactNode[] = [];
  const notItems: ReactNode[] = [];

  Children.toArray(children).forEach((child) => {
    if (isValidElement<ItemProps>(child) && child.type === TiltItem) {
      items.push(child);
    } else {
      notItems.push(child);
    }
  });

  // const itemCount = items.length;
  const itemCount = 5;
  const spacing = 0.1;

  useEffect(() => {
    console.log(currentIndex);
  }, [currentIndex]);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLLIElement>(".items .item");
      const rawAnimate = gsap.timeline({ paused: true });
      const _wrapper = gsap.timeline({
        paused: true,
        repeat: -1,
      });

      gsap.set(items, { xPercent: -50 });

      items.forEach((item, index) => {
        const startTime = index * spacing;
        rawAnimate
          .fromTo(
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
            startTime
          )
          .fromTo(
            item,
            { xPercent: -50 },
            {
              keyframes: {
                "0%": { xPercent: -50 },
                "20%": { xPercent: 25 },
                "30%": { xPercent: 50 },
                "33.33%": { xPercent: 25 },
                "66.66%": { xPercent: -125 },
                "70%": { xPercent: -150 },
                "80%": { xPercent: -125 },
                "100%": { xPercent: -50 },
              },
              duration: 1,
              ease: "none",
              immediateRender: false,
            },
            startTime
          );
      });

      const startTime = 0.5;
      const animateTime = (itemCount - 1) * spacing + 1 - 0.5;

      rawAnimate.time(startTime);
      _wrapper.to(rawAnimate, {
        time: animateTime,
        duration: (animateTime - startTime).toPrecision(1),
        ease: "none",
      });

      const _pointer = gsap.to(_wrapper, {
        totalTime: 0,
        duration: 0.5,
        ease: "power3",
        paused: true,
      });

      const _scroller = ScrollTrigger.create({
        scroller: container.current,
        start: 0,
        end: `+=` + itemCount * 150,
        pin: ".items",
        onUpdate: (self) => {
          _pointer.vars.totalTime = self.progress * _wrapper.duration();
          _pointer.invalidate().restart();
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

      pointer.current = _pointer;
      wrapper.current = _wrapper;
      scroller.current = _scroller;
    },
    { scope: container }
  );

  const pointTo = (totalTime: number) => {
    const progress = totalTime / wrapper.current!.duration();
    scroller.current?.scroll(
      scroller.current.start +
        progress * (scroller.current.end - scroller.current.start)
    );
  };

  const handleNext = useCallback(() => {
    const totalTime = pointer.current?.vars.totalTime + spacing;
    pointTo(totalTime);
  }, []);

  const handlePrev = useCallback(() => {
    const totalTime = pointer.current?.vars.totalTime - spacing;
    pointTo(totalTime);
  }, []);

  const handleItemClick = useCallback(
    (index: number) => {
      const diff = index - currentIndex;
      const totalTime = pointer.current?.vars.totalTime + diff * spacing;
      pointTo(totalTime);
    },
    [currentIndex]
  );

  return (
    <div className="flex items-center justify-center">
      <div className="absolute">{notItems}</div>
      <button
        className="border rounded-full p-2 cursor-pointer hover:brightness-90"
        onClick={handlePrev}
      >
        Prev
      </button>
      <div
        className="relative max-h-[900px] overflow-y-scroll overflow-x-hidden no-scrollbar"
        ref={container}
      >
        <div className="items relative h-[900px] w-[1300px]">
          <TiltItem onClick={() => handleItemClick(0)}>
            <img
              className="w-full h-full object-cover"
              src="/images/item1.png"
            />
          </TiltItem>
          <TiltItem onClick={() => handleItemClick(1)}>
            <img
              className="w-full h-full object-cover"
              src="/images/item2.png"
            />
          </TiltItem>
          <TiltItem onClick={() => handleItemClick(2)}>
            <img
              className="w-full h-full object-cover"
              src="/images/item3.png"
            />
          </TiltItem>
          <TiltItem onClick={() => handleItemClick(3)}>
            <img
              className="w-full h-full object-cover"
              src="/images/item4.png"
            />
          </TiltItem>
          <TiltItem onClick={() => handleItemClick(4)}>
            <img
              className="w-full h-full object-cover"
              src="/images/item5.png"
            />
          </TiltItem>
        </div>
      </div>
      <button
        className="border rounded-full p-2 cursor-pointer hover:brightness-90"
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
}

type ItemProps = {
  children: ReactNode;
  className?: string;
};

Carousel.Item = TiltItem;

export default Carousel;
