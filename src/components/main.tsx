"use client";

import Image from "next/image";
import logo from "../assets/images/logo.svg";
import { motion} from "motion/react";

export default function Main() {
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
      className="pt-2 text-center text-2xl md:text-4xl text-white/50">Crafting Legacies...</motion.div>
    </div>
  );
}
