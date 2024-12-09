import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { SignedIn, SignedOut } from "@clerk/nextjs";
export default function CMSPage() {
  return (
    <div>
      <SignedIn>
        <Link
          href="/"
          className="absolute left-4 top-4 text-sm font-medium text-primary hover:text-primary/80"
        >
          <div className="flex items-center gap-2">
            <ArrowLeftIcon className="h-4 w-4" />
            <div>HOME</div>
          </div>
        </Link>
        <div className="pt-4 text-center text-2xl font-bold">CMS</div>
        <div className="flex flex-col items-center justify-center gap-4 p-8">
          <div className="flex flex-col gap-4">
            <Link href="/cms/artists">Artists</Link>
          </div>
          <div className="flex flex-col gap-4">
            <Link href="/cms/eventsPlan">Events</Link>
          </div>
          <div className="flex flex-col gap-4">
            <Link href="/cms/photos">Photos</Link>
          </div>
          <div className="flex flex-col gap-4">
            <Link href="/cms/team">Team</Link>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <div>Please sign in to access the CMS</div>
      </SignedOut>
    </div>
  );
}
