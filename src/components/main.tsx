"use client"

import Image from "next/image";
import logo from "../assets/images/logo.svg";
import { useAnimationFrame } from "motion/react"
import { useRef } from "react";

export default function Main() {
  const ref = useRef<HTMLDivElement>(null)
  useAnimationFrame((t) => {
    const rotate = Math.sin(t / 10000) * 200;
    const y = (1 + Math.sin(t / 1000)) * 50;
    if (ref.current) {
      ref.current.style.transform = `translateY(${y}px) rotateY(${rotate}deg)`;
    }
  })
  return (<div ref={ref}>
    <Image
          src={logo as string}
          alt="Logo" 
          width={300}
          height={50}
          loading="lazy"
          className="object-cover"
          sizes="(max-width: 648px) 100vw, 648px"
          unoptimized
        />
  </div>);
}

