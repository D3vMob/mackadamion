"use client";

import { Parallax } from "react-parallax";
import Banner02 from "~/assets/parallaxImages/depositphotos_27603927-stock-photo-grunge-music-background-vintage-piano.jpg";

export const ContainerTwo = () => {
  return (
    <Parallax
      className="relative min-h-screen w-full"
      blur={0}
      bgImage={Banner02.src}
      strength={600}
      renderLayer={(percentage) => (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            transform: `translate3d(0, ${percentage * 50}px, 0)`,
          }}
        >
          <div className="flex items-center justify-center text-4xl font-extrabold text-white">
            EVENTS
          </div>
        </div>
      )}
      bgImageStyle={{
        minHeight: "100vh",
        objectFit: "cover",
        transform: "translate3d(0, 0, 0)",
      }}
    ></Parallax>
  );
};
