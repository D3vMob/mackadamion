"use client";

import { Parallax } from "react-parallax";
import Banner03 from "~/assets/parallaxImages/devices.jpg";

export const ContainerThree = () => {
  return (
    <Parallax
      className="relative min-h-screen w-full"
      blur={0}
      bgImage={Banner03.src}
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
            TEAM
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
