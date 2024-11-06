import Image from "next/image";
import logo from "../assets/images/logo.png";
import ContactDialog from "~/components/contact";
import NewsLetter from "~/components/newsLetter";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-black text-white">
      <div className="relative w-full px-2 py-2 md:max-w-lg pt-12">
        <Image
          src={logo}
          alt="Logo"
          loading="lazy"
          className="object-cover"
          sizes="(max-width: 648px) 100vw, 648px"
        />
      </div>
      <div className="pt-1 text-center text-sm md:text-lg text-white/50">Growing artists , creating legacies and orchestrating success</div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8">

      <ContactDialog />
      <NewsLetter />
      </div>
    </main>
  );
}
