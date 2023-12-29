"use client";
import { RiRestartLine } from "react-icons/ri";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full h-[200px] text-center flex items-center justify-center flex-col gap-4">
      <h2 className="text-2xl font-semibold">Something went wrong!</h2>
      <button onClick={() => reset()} className="flex items-center gap-1 bg-emerald-500 text-white px-3 py-1 rounded-md">
        <RiRestartLine /> Try again
      </button>
    </div>
  );
}
