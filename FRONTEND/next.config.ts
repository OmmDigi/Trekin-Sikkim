import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "standalone",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },

      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/tour/trekking-in-sikkim",
        destination: "/trekking-in-sikkim",
        permanent: true,
      },
      {
        source: "/tour/trekking-in-ladakh",
        destination: "/trekking-in-ladakh",
        permanent: true,
      },
      {
        source: "/tour/winter-treks-in-india",
        destination: "/winter-treks-in-india",
        permanent: true,
      },
      {
        source: "/tour/sikkim-tour",
        destination: "/sikkim-tour",
        permanent: true,
      },
      {
        source: "/tour/sikkim-package-tour",
        destination: "/sikkim-package-tour",
        permanent: true,
      },
      {
        source: "/tour/ladakh-package-tour",
        destination: "/ladakh-package-tour",
        permanent: true,
      },
      {
        source: "/tour/expedition-in-sikkim-himalaya",
        destination: "/expedition-in-sikkim-himalaya",
        permanent: true,
      },
      {
        source: "/tour/indian-himalaya",
        destination: "/indian-himalaya",
        permanent: true,
      },
      {
        source: "/page/contact-us",
        destination: "/contact-us",
        permanent: true,
      },
      {
        source: "/article-list.php",
        destination: "/article",
        permanent: true,
      },
      {
        source: "/page/about-us",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/goechala-trek",
        destination: "/trek-in-sikkim/goechala-trek",
        permanent: true,
      },
      {
        source: "/tour-package/goechala-trek",
        destination: "/trek-in-sikkim/goechala",
        permanent: true,
      },
      {
        source: "/tour-package/sandakphu-trek",
        destination: "/trek-in-sikkim/sandakphu-trek",
        permanent: true,
      },
      {
        source: "/sandakphu-trek",
        destination: "/trek-in-sikkim/sandakphu-phalut",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
