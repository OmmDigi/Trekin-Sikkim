"use client"; // Error boundaries must be Client Components

import MainWrapper from "@/components/MainWrapper";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.log(error.message);
  }, [error]);

  return (
    <MainWrapper className="wrapper mx-auto pb-5">
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </MainWrapper>
  );
}
