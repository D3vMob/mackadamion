import Image from "next/image";
import logo from "../assets/images/logo.jpg";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-black text-white">
      <h1 className="text-4xl md:text-6xl font-bold pt-4">MACKADAMION</h1>
      <div className="relative w-full px-2 py-2 md:max-w-lg">
        <Image
          src={logo}
          alt="Logo"
          layout="responsive"
          loading="lazy"
          className="object-cover"
          sizes="(max-width: 648px) 100vw, 648px"
        />
      </div>
    </main>
  );
}
