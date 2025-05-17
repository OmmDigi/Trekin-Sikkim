import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NewPackageListItem() {
  return (
    <Link href={"/"} className="space-y-3">
      <Image
        className="max-h-40 min-h-40 object-cover rounded-3xl"
        src={"/packages/new-package-image.jpg"}
        alt="Images"
        height={1200}
        width={1200}
      />
      <div>
        <h2 className="font-semibold text-xl">Venice, Rome & Milan</h2>
      </div>
    </Link>
  );
}
