"use client";

import Image from "next/image";
import logo from "../assets/images/logo.svg";
import { motion, scroll } from "motion/react";
import { useRef } from "react";
import { NodeNextRequest } from "next/dist/server/base-http/node";

export default function Main() {
  const scrollRef = useRef<HTMLDivElement>(null);
  // useAnimationFrame((t) => {
  //   const rotate = Math.sin(t / 10000) * 200;
  //   const y = (1 + Math.sin(t / 1000)) * 50;
  //   if (ref.current) {
  //     ref.current.style.transform = `translateY(${y}px) rotateY(${rotate}deg)`;
  //   }
  // })
  return (
    <div className="flex flex-col min-h-screen">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
          ease: "linear",
          repeat: 0,
        }}
        className="flex h-full w-full items-center justify-center"
      >
        <Image
          src={logo as string}
          alt="Logo"
          width={600}
          height={50}
          loading="lazy"
          className="object-cover"
          sizes="(max-width: 648px) 100vw, 648px"
          unoptimized
        />
      </motion.div>
      <motion.div
      initial={{
        rotateX: 90,
        opacity: 0,
      }}
      animate={{
        rotateX: 0,
        opacity: 1,
      }}
      transition={{
        delay: 0.8,
        duration: 0.2,
        ease: "linear",
        repeat: 0,
      }}
      className="pt-1 text-center text-2xl md:text-4xl text-white/50">Creating legacies...</motion.div>
    </div>
  );
}
