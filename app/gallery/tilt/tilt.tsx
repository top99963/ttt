"use client";

import React, { ReactNode, useRef } from "react";

export const TiltCard = ({ children }: { children?: ReactNode }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // คำนวณตำแหน่งเมาส์เทียบกับกึ่งกลาง card (normalize เป็น -1 ถึง 1)
    const mouseX = (e.clientX - centerX) / (rect.width / 2);
    const mouseY = (e.clientY - centerY) / (rect.height / 2);

    // คำนวณมุมเอียง (max 15 องศา)
    const maxAngle = 15;
    const rotateY = mouseX * maxAngle; // หมุนรอบแกน Y
    const rotateX = -mouseY * maxAngle; // หมุนรอบแกน X (ลบเพื่อให้ทิศทางถูกต้อง)

    // ใช้ transform เพื่อหมุน card
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    // รีเซ็ตการหมุนและขนาดเมื่อเมาส์ออก
    cardRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      className={`w-[450px] h-[600px] bg-gray-500 rounded-3xl overflow-hidden`}
      style={{
        transition: "transform 0.2s ease",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default TiltCard;
