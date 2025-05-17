import Image from "next/image";
import React from "react";

export default function loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col mt-16">
      <Image src={"/loading-image.png"} alt="Hiking" className="animate-bounce" width={100} height={100} />
      <h2 className="font-semibold text-accent">Finding...</h2>
    </div>
  );
}
