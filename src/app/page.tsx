
import ContactDialog from "~/components/contact";
import Main from "~/components/main";
import NewsLetter from "~/components/newsLetter";

export const revalidate = 3600 // revalidate every hour

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-black text-white">
      <div className="relative w-full px-2 py-2 md:max-w-lg pt-12">
        <Main />
      </div>
      <div className="pt-1 text-center text-sm md:text-lg text-white/50">Creating legacies...</div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8">

      <ContactDialog />
      <NewsLetter />
      </div>
    </main>
  );
}
