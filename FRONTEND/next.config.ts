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
      {
        source: "/articles",
        destination: "/article",
        permanent: true,
      },
      {
        source: "/articles/:slug*",
        destination: "/article/:slug*",
        permanent: true,
      },
      {
        source: "/trek-in-sikim",
        destination: "/trek-in-sikkim",
        permanent: true,
      },
      {
        source: "/trekking-in-sikkim",
        destination: "/trek-in-sikkim",
        permanent: true,
      },
      {
        source: "/tour/Trek-in-Sikkim",
        destination: "/trek-in-sikkim",
        permanent: true,
      },
      {
        source: "/tour/Tour-in-Sikkim",
        destination: "/trek-in-sikkim",
        permanent: true,
      },
      {
        source: "/tour/Tour-in-Sikkkim",
        destination: "/sikkim-tour",
        permanent: true,
      },
      {
        source: "/tour/Ladakh-Tour",
        destination: "/ladakh-package-tour/ladakh-package-tours",
        permanent: true,
      },
      {
        source: "/sikkim-package-tour",
        destination: "/sikkim-tour",
        permanent: true,
      },
      {
        source: "/tour-package/sikkim-package-tour",
        destination: "/sikkim-tour",
        permanent: true,
      },
      {
        source: "/tour/expedition",
        destination: "/expedition-in-sikkim-himalaya",
        permanent: true,
      },
      {
        source: "/tour/expedition-in-sikkim",
        destination: "/expedition-in-sikkim-himalaya",
        permanent: true,
      },
      {
        source: "/tour-type/Tour",
        destination: "/",
        permanent: true,
      },

      // new redirections 01-07-2025
      // Dafey Bhir Trek
      {
        source: "/tour-package/dafey-bhir-trek",
        destination: "/trek-in-sikkim/dafey-bhir-trek",
        permanent: true,
      },

      // Sikkim Tour Package
      {
        source: "/tour-package/sikkim-tour-package",
        destination: "/sikkim-tour/sikkim-tour-package",
        permanent: true,
      },

      // Phoktey Dara Trek
      {
        source: "/tour-package/phoktey-dara-trek",
        destination: "/trek-in-sikkim/phoktey-dara-trek",
        permanent: true,
      },
      {
        source: "/tour-package/singalila-phoktey-dara-trek",
        destination: "/trek-in-sikkim/phoktey-dara-trek",
        permanent: true,
      },

      // Sikkim Darjeeling Package Tour
      {
        source: "/tour-package/sikkim-darjeeling-package-tour",
        destination: "/sikkim-tour/sikkim-darjeeling-package-tour",
        permanent: true,
      },

      // Exclusive Sikkim Darjeeling Tour
      {
        source: "/tour-package/exclusive-sikkim-darjeeling-tour",
        destination: "/sikkim-tour/exclusive-sikkim-darjeeling-tour",
        permanent: true,
      },

      // Sikkim Darjeeling Tour
      {
        source: "/tour-package/sikkim-darjeeling-tour",
        destination: "/sikkim-tour/sikkim-darjeeling-tour",
        permanent: true,
      },

      // Green Lake Trek
      {
        source: "/tour-package/green-lake-trek",
        destination: "/trek-in-sikkim/green-lake-trek",
        permanent: true,
      },

      // Bajre Dara Trek
      {
        source: "/tour-package/bajre-dara-trek",
        destination: "/trek-in-sikkim/bajre-dara-trek",
        permanent: true,
      },

      // North Sikkim Tour
      {
        source: "/tour-package/north-sikkim-tour",
        destination: "/sikkim-tour/north-sikkim-tour",
        permanent: true,
      },

      // Sandakphu Tour
      {
        source: "/tour-package/sandakphu-tour-by-land-rover",
        destination: "/darjeeling-trip/sandakphu-phalut-tour",
        permanent: true,
      },
      {
        source: "/null/sandakphu-tour-by-land-rover",
        destination: "/darjeeling-trip/sandakphu-phalut-tour",
        permanent: true,
      },

      // Markha Valley Trek
      {
        source: "/tour-package/markha-valley-trek",
        destination: "/trekking-in-ladakh/markha-valley-trek",
        permanent: true,
      },

      // Assam Meghalaya Tour
      {
        source: "/tour-package/assam-megalaya-tour",
        destination: "/sikkim-tour/assam-megalaya-tour",
        permanent: true,
      },

      // Kang Yatse Expedition
      {
        source: "/tour-package/kang-yatse-expedition",
        destination: "/expedition-in-ladakh/kang-yatse-expedition",
        permanent: true,
      },

      // Nun Peak
      {
        source: "/tour-package/nun-peak",
        destination: "/expedition-in-ladakh/nun-peak",
        permanent: true,
      },

      // Frey Peak
      {
        source: "/tour-package/frey-peak-expedition-5830m",
        destination:
          "/expedition-in-sikkim-himalaya/frey-peak-expedition-5830m",
        permanent: true,
      },

      // Tenzing Khang
      {
        source: "/tour-package/tenzing-khang",
        destination: "/expedition-in-sikkim-himalaya/mt.tenchenkhang",
        permanent: true,
      },

      // Mentok Kangri
      {
        source: "/tour-package/mentok-kangri-expedition",
        destination: "/expedition-in-ladakh/mentok-kangri-expedition",
        permanent: true,
      },

      // Dzongri Trek (Handle casing)
      {
        source: "/tour-package/Dzongri-trek",
        destination: "/trek-in-sikkim/dzongri-trek",
        permanent: true,
      },
      {
        source: "/tour-package/dzongri-trek",
        destination: "/trek-in-sikkim/dzongri-trek",
        permanent: true,
      },

      // Singalila Goechala Circuit
      {
        source: "/tour-package/singalila-goechala-circuit-round-trek",
        destination: "/trek-in-sikkim/singalila-goechala-circuit-round-trek",
        permanent: true,
      },

      // Winter Treks
      {
        source: "/tour/winter-treks-in-india",
        destination: "/article/winter-treks-in-india",
        permanent: true,
      },

      // Best Sikkim Darjeeling Article
      {
        source: "/tour-package/best-sikkim-darjeeling",
        destination: "/article/best-sikkim-darjeeling",
        permanent: true,
      },

      // Booking and Cancellation
      {
        source: "/page/booking-and-cancellation",
        destination: "/booking-and-cancellation",
        permanent: true,
      },

      // FAQ
      {
        source: "/faq.php",
        destination: "/faq",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
