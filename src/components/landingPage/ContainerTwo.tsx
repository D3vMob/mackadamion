"use client";

import { Parallax } from "react-parallax";
import EventList from "~/app/_components/eventList";
import Banner02 from "~/assets/parallaxImages/depositphotos_27603927-stock-photo-grunge-music-background-vintage-piano.jpg";
import { ScrollArea } from "../ui/scroll-area";

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
            transform: `translate3d(0, ${percentage * 30}px, 0)`,
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
    >
      <div className="flex justify-center p-4 pt-16">
        <ScrollArea className="h-screen [mask-image:linear-gradient(to_bottom,transparent_0%,black_3%,black_98%,transparent_100%)]">
          <div className="p-4">
            <EventList />
          </div>
        </ScrollArea>
      </div>
    </Parallax>
  );
};
