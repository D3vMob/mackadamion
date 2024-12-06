"use client";
import ContactDialog from "~/components/contact";
import { BlankSlate } from "~/components/landingPage/BlankSlate";
import { ContainerOne } from "~/components/landingPage/ContainerOne";
import { ContainerThree } from "~/components/landingPage/ContainerThree";
import { ContainerTwo } from "~/components/landingPage/ContainerTwo";
import Main from "~/components/main";
import NewsLetter from "~/components/newsLetter";
import headShot from "~/assets/images/headshot.png";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Main Banner Section */}
      <div className="md:max-w-lgitems-center relative z-10 w-full justify-start bg-black px-2 py-2 pt-12 text-white">
        <Main />
      </div>
      <ContainerOne />
      <BlankSlate className="w-full bg-gradient-to-br from-blue-200 via-blue-950 to-black">
        <div className="flex max-h-[100vh] items-center justify-center">
          <section className="flex flex-col items-center gap-8 px-6 py-16 text-white md:flex-row">
            <Image
              src={headShot}
              alt="Danny Scopelleti"
              width={200}
              height={200}
              className="h-48 rounded-full shadow-xl"
              priority
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <div>
              <div className="text-justify md:mx-auto md:max-w-6xl">
                <h1 className="mb-6 text-4xl font-extrabold">
                  Mackadamion:{" "}
                  <span className="text-shadow-md text-blue-200">
                    Creating Legacies...
                  </span>
                </h1>
                <p className="mb-8 text-lg">
                  Founded by renowned singer-songwriter Danny Scopelleti,
                  Mackadamion is a premier music and placement agency with
                  nearly 20 years of industry expertise. We craft music for
                  artists across New York, Los Angeles, Montreal, and Europe,
                  delivering exceptional sound that resonates worldwide.
                </p>
                <p className="mb-8 text-lg">
                  In 2024, we proudly showcased our global influence by
                  presenting the official ARDN theme song at the United Nations
                  Assembly, blending artistry with advocacy. At Mackadamion,
                  we’re not just creating music—we’re amplifying voices and
                  shaping stories that inspire change.
                </p>
              </div>
            </div>
          </section>
        </div>
      </BlankSlate>
      <ContainerTwo />
      <BlankSlate>
        <div className="flex h-96 items-center justify-center bg-gradient-to-bl from-blue-200 via-blue-950 to-black font-extrabold text-white">
          PICTURES!
          
        </div>
      </BlankSlate>
      <ContainerThree />

      {/* Footer Section */}
      <footer className="bottom-0 flex w-full flex-col items-center justify-center gap-1 bg-black px-4 py-1 text-white md:sticky md:flex-row md:justify-between md:py-2">
        <ContactDialog />
        <NewsLetter />
      </footer>
    </main>
  );
}
