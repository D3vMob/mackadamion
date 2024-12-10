'use client';

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    // Go back without scrolling
    router.back();
  };

  return (
    <button
      onClick={handleBack}
      className="absolute left-4 top-4 flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
    >
      <ArrowLeftIcon className="h-4 w-4" />
      <div>Back</div>
    </button>
  );
}