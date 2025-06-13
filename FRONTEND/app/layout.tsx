import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Constant from "@/constant";
import ReduxProvider from "@/redux/ReduxProvider";
import HeaderHolder from "@/components/HeaderHolder";
import FooterHolder from "@/components/FooterHolder";
// import AuthProvider from "@/components/AuthProvider";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import AiHeader from "@/components/AiComponents/AiHeader";
import ChildrenHolder from "@/components/ChildrenHolder";
import { cn } from "@/lib/utils";

import React from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";
import ScrollProgress from "@/components/ScrollProgress";
import BottomNavWrapper from "@/components/Wrappers/BottomNavWrapper";
// import ShimmerLoading from "@/components/ShimmerLoading";
import Head from "next/head";

const DialogWrapper = dynamic(
  () => import("@/components/Dialogs/DialogWrapper")
);
const EnquireDialog = dynamic(
  () => import("@/components/Dialogs/EnquireDialog")
);

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"], // Regular, Medium, Semi-Bold, Bold
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"], // Regular, Medium, Semi-Bold, Bold
});

export const metadata: Metadata = {
  title: "Glacier Treks and Adventure | Himalayan Trekking & Guided Tours",
  description:
    "Discover unforgettable trekking experiences with Glacier Treks and Adventure – your trusted guide for exploring the majestic Himalayas and breathtaking mountain trails with safety, expertise, and passion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="preload"
          as="image"
          href="/images/banner_1.jpg"
          type="image/jpeg"
          fetchPriority="high"
        />
        {/* <link
          rel="preload"
          as="image"
          href="/images/banner_2.jpg"
          type="image/jpeg"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/images/banner_3.jpg"
          type="image/jpeg"
          fetchPriority="high"
        /> */}
      </Head>
      <body
        className={cn(poppins.variable, montserrat.variable, "antialiased")}
      >
        <div id="top-layout" className="bg-amber-300"></div>
        <ScrollProgress />
        <Constant />
        <Link
          aria-label="Link To Go To Top"
          href={"#top-layout"}
          className="size-10 border border-white flex items-center justify-center rounded-full fixed z-[100] bg-accent right-4 bottom-4 max-sm:bottom-20"
        >
          <ArrowUp size={18} color="#fff" />
        </Link>

        <ReduxProvider>
          <HeaderHolder>
            <AiHeader />
          </HeaderHolder>
          <DialogWrapper
            id="enquiry-form"
            className="flex justify-center items-start"
          >
            <EnquireDialog />
          </DialogWrapper>
          <ChildrenHolder>{children}</ChildrenHolder>
          <BottomNavWrapper />
        </ReduxProvider>

        <React.Suspense fallback={<Loading />}>
          <FooterHolder>
            <Footer />
          </FooterHolder>
        </React.Suspense>
      </body>
    </html>
  );
}
