"use client";

import { Parallax } from "react-parallax";
import ArtistPublic from "~/app/_components/artistPublic";
import Banner03 from "~/assets/parallaxImages/depositphotos_19998309-stock-photo-musical-grunge-background.jpg";

export const ContainerOne = () => {
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
            transform: `translate3d(0, ${percentage * 30}px, 0)`,
          }}
        >
          <div className="flex items-center justify-center text-4xl font-extrabold text-white">
            ROASTER AREA
          </div>
        </div>
      )}
      bgImageStyle={{
        minHeight: "100vh",
        objectFit: "cover",
        transform: "translate3d(0, 0, 0)",
      }}
    >
      <div className="flex items-center justify-center h-screen">
        <ArtistPublic />
      </div>
    </Parallax>
  );
};
