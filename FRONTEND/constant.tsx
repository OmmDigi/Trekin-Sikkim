import { CiYoutube } from "react-icons/ci";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { ImLocation } from "react-icons/im";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail, MdInfoOutline, MdTour } from "react-icons/md";
import { RiPhoneFill } from "react-icons/ri";
import { NavOptions } from "./types";
import { GoHome } from "react-icons/go";
import { TbTrekking } from "react-icons/tb";
import { TiContacts } from "react-icons/ti";
import { LogIn, Rss, Star, Telescope } from "lucide-react";

export const NAV_OPTIONS: NavOptions[] = [
  { id: 1, icon: <GoHome />, text: "Home", pathname: "/" },
  {
    id: 9,
    icon: <Star size={13} />,
    text: "Upcoming Trek",
    pathname: "#",
  },
  {
    id: 2,
    icon: <TbTrekking />,
    text: "Trekking",
    pathname: "#",
    submenu: [
      {
        id: "1-1",
        pathname: "/trekking-in-sikkim",
        text: "Trekking in Sikkim",
      },
      {
        id: "1-2",
        pathname: "/trekking-in-ladakh",
        text: "Trekking in Ladakh",
      },
    ],
  },
  { id: 3, icon: <MdTour />, text: "Tours", pathname: "#" },
  {
    id: 4,
    icon: <Telescope strokeWidth={1.5} size={14} />,
    text: "Expedition",
    pathname: "#",
  },
  {
    id: 5,
    icon: <MdInfoOutline />,
    text: "About",
    pathname: "#",
    submenu: [
      {
        id: "5-1",
        text: "About Glacier Treks & Adventure",
        pathname: "/about-us",
      },
      {
        id: "5-2",
        text: "Why To Choose Us",
        pathname: "/about-us/#why_choose_us",
      },
      {
        id: "5-3",
        text: "Mission & Vission",
        pathname: "/about-us/#mission_vision",
      },
      {
        id: "5-4",
        text: "Terms And Conditions",
        pathname: "/about-us/terms-and-conditions",
      },
    ],
  },
  { id: 6, icon: <TiContacts />, text: "Contact Us", pathname: "/contact-us" },
  { id: 7, icon: <Rss size={14} />, text: "Articles", pathname: "/articles" },
  {
    id: 8,
    icon: <LogIn size={14} />,
    text: "Sign In",
    pathname: "/auth/login",
  },
];

export const POPULER_PACKAGES = [
  {
    id: 1,
    images: [
      "/traking-places/GoechalaTrek.jpg",
      "/traking-places/LachungtoYumthangTrek.jpg",
    ],
    name: "Frey Peak Sikkim",
    link: "/trekking-in-sikkim/packages/test-trek",
  },
  {
    id: 2,
    images: [
      "/traking-places/DzongriTrek.jpg",
      "/traking-places/SingalilaRidgeTrek.jpg",
    ],
    name: "Frey Peak Sikkim",
    link: "/trekking-in-sikkim/packages/test-trek",
  },
  {
    id: 3,
    images: [
      "/traking-places/YumthangValley.jpg",
      "/traking-places/GoechalaTrek.jpg",
    ],
    name: "Frey Peak Sikkim",
    link: "/trekking-in-sikkim/packages/test-trek",
  },
  {
    id: 4,
    images: [
      "/traking-places/SingalilaRidgeTrek.jpg",
      "/traking-places/DzongriTrek.jpg",
    ],
    name: "Frey Peak Sikkim",
    link: "/trekking-in-sikkim/packages/test-trek",
  },
  {
    id: 5,
    images: [
      "/traking-places/LachungtoYumthangTrek.jpg",
      "/traking-places/GoechalaTrek.jpg",
    ],
    name: "Frey Peak Sikkim",
    link: "/trekking-in-sikkim/packages/test-trek",
  },
  {
    id: 6,
    images: [
      "/traking-places/LachungtoYumthangTrek.jpg",
      "/traking-places/GoechalaTrek.jpg",
    ],
    name: "Frey Peak Sikkim",
    link: "/trekking-in-sikkim/packages/test-trek",
  },
  {
    id: 7,
    images: [
      "/traking-places/LachungtoYumthangTrek.jpg",
      "/traking-places/GoechalaTrek.jpg",
    ],
    name: "Frey Peak Sikkim",
    link: "/trekking-in-sikkim/packages/test-trek",
  },
  {
    id: 8,
    images: [
      "/traking-places/LachungtoYumthangTrek.jpg",
      "/traking-places/GoechalaTrek.jpg",
    ],
    name: "Frey Peak Sikkim",
    link: "/trekking-in-sikkim/packages/test-trek",
  },
  {
    id: 9,
    images: [
      "/traking-places/LachungtoYumthangTrek.jpg",
      "/traking-places/GoechalaTrek.jpg",
    ],
    name: "Frey Peak Sikkim",
    link: "/trekking-in-sikkim/packages/test-trek",
  },
  {
    id: 10,
    images: [
      "/traking-places/GoechalaTrek.jpg",
      "/traking-places/LachungtoYumthangTrek.jpg",
    ],
    name: "Frey Peak Sikkim",
    link: "/trekking-in-sikkim/packages/test-trek",
  },
  {
    id: 11,
    images: [
      "/traking-places/DzongriTrek.jpg",
      "/traking-places/SingalilaRidgeTrek.jpg",
    ],
    name: "Frey Peak Sikkim",
    link: "/trekking-in-sikkim/packages/test-trek",
  },
  {
    id: 12,
    images: [
      "/traking-places/YumthangValley.jpg",
      "/traking-places/GoechalaTrek.jpg",
    ],
    name: "Frey Peak Sikkim",
    link: "/trekking-in-sikkim/packages/test-trek",
  },
  // {
  //   id: 13,
  //   images: [
  //     "/traking-places/SingalilaRidgeTrek.jpg",
  //     "/traking-places/DzongriTrek.jpg",
  //   ],
  //   name: "Frey Peak Sikkim",
  //   link: "/",
  // },
  // {
  //   id: 14,
  //   images: [
  //     "/traking-places/LachungtoYumthangTrek.jpg",
  //     "/traking-places/GoechalaTrek.jpg",
  //   ],
  //   name: "Frey Peak Sikkim",
  //   link: "/",
  // },
  // {
  //   id: 15,
  //   images: [
  //     "/traking-places/LachungtoYumthangTrek.jpg",
  //     "/traking-places/GoechalaTrek.jpg",
  //   ],
  //   name: "Frey Peak Sikkim",
  //   link: "/",
  // },
  // {
  //   id: 16,
  //   images: [
  //     "/traking-places/LachungtoYumthangTrek.jpg",
  //     "/traking-places/GoechalaTrek.jpg",
  //   ],
  //   name: "Frey Peak Sikkim",
  //   link: "/",
  // },
];

export const TOP_VALUES = [
  {
    id: 1,
    icon: "/icons/send.svg",
    name: "Airpot pickup",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: 2,
    icon: "/icons/wallet.svg",
    name: "Easy booking",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: 3,
    icon: "/icons/people.svg",
    name: "Best tour guide",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: 4,
    icon: "/icons/promos.svg",
    name: "Lots of promos",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
  },
];

export const POLICY_LIST: NavOptions[] = [
  {
    id: "tc1",
    text: "Terms & Conditions",
    pathname: "/",
  },
  {
    id: "dic1",
    text: "Disclaimer",
    pathname: "/",
  },
  {
    id: "pp1",
    text: "Privacy Policy",
    pathname: "/",
  },
  {
    id: "rp1",
    text: "Refund Policy",
    pathname: "/",
  },
];

export const FOOTER_INFO: {
  id: number;
  heading: string;
  info: NavOptions[];
}[] = [
  {
    id: 1,
    heading: "Contact",
    info: [
      {
        id: "1-1",
        icon: <ImLocation />,
        text: "Yuksom Bazar Main Road Near Hotel Yangri Gang, West Sikkim, Pin no - 737113",
        pathname: "/",
      },
      {
        id: "1-2",
        icon: <RiPhoneFill />,
        text: "+917407248200",
        pathname: "tel:+917407248200",
      },
      {
        id: "1-3",
        icon: <IoLogoWhatsapp />,
        text: "+917407248200",
        pathname: "https://api.whatsapp.com/send?phone=7407248200",
      },
      {
        id: "1-4",
        icon: <MdEmail />,
        text: "kiran.yuksom@gmail.com",
        pathname: "mailto:kiran.yuksom@gmail.com",
      },
    ],
  },

  {
    id: 2,
    heading: "Explore",
    info: NAV_OPTIONS,
  },

  {
    id: 3,
    heading: "Policies",
    info: POLICY_LIST,
  },

  // {
  //   id: 4,
  //   heading: "Information",
  //   info: [
  //     {
  //       id: "4-1",
  //       text: "About Us",
  //       pathname: "/about",
  //     },
  //     {
  //       id: "4-2",
  //       text: "Contact Us",
  //       pathname: "/contact",
  //     },
  //     {
  //       id: "4-3",
  //       text: "Terms & Conditions",
  //       pathname: "/terms",
  //     },
  //   ],
  // },
];

export const FOOTERSOCIALLINKS = [
  {
    icon: FaFacebookF,
    link: "https://www.facebook.com/trekinsikkim.in/",
    name: "Facebook",
  },
  {
    icon: FaXTwitter,
    link: "https://twitter.com/letsgotrek",
    name: "Twitter",
  },
  {
    icon: FaLinkedinIn,
    link: "https://www.linkedin.com/in/kiran-gurung-30937968/",
    name: "Linkedin",
  },
  {
    icon: CiYoutube,
    link: "https://youtu.be/39GILMVPoFw",
    name: "Youtube",
  },
];

export const TRAKE_FILTERS = [
  {
    id: "1",
    heading: "Category",
    options: [
      { id: "1-1", text: "Tours" },
      { id: "1-2", text: "Nature & Outdoor" },
      { id: "1-3", text: "Entertainment" },
      { id: "1-4", text: "Food & Drinks" },
      { id: "1-5", text: "Museum, Arts & Culture" },
      { id: "1-6", text: "Workshop & Classes" },
    ],
  },
  {
    id: "2",
    heading: "Location",
    options: [
      { id: "2-1", text: "Australia" },
      { id: "2-2", text: "England" },
      { id: "2-3", text: "Switzerland" },
      { id: "2-4", text: "Spain" },
      { id: "2-5", text: "Bangladesh" },
      { id: "2-6", text: "Brazil" },
    ],
  },
  {
    id: "3",
    heading: "Reviews",
    options: [
      { id: "3-1", text: "4.5 & up" },
      { id: "3-2", text: "4.0 & up" },
      { id: "3-3", text: "3.5 & up" },
      { id: "3-4", text: "3.0 & up" },
    ],
  },
  // {
  //   id: "4",
  //   heading: "Languages",
  //   options: [
  //     { id: "4-1", text: "English" },
  //     { id: "4-2", text: "Spanish" },
  //     { id: "4-3", text: "French" },
  //     { id: "4-4", text: "Japanese" },
  //     { id: "4-5", text: "Chinese" },
  //     { id: "4-6", text: "Italian" },
  //     { id: "4-7", text: "Russian" },
  //     { id: "4-8", text: "Korean" },
  //   ],
  // },
];

export const COUNTRIES = [
  { code: "IN", name: "India", dial_code: "+91" },
  { code: "AF", name: "Afghanistan", dial_code: "+93" },
  { code: "AL", name: "Albania", dial_code: "+355" },
  { code: "DZ", name: "Algeria", dial_code: "+213" },
  { code: "AS", name: "American Samoa", dial_code: "+1-684" },
  { code: "AD", name: "Andorra", dial_code: "+376" },
  { code: "AO", name: "Angola", dial_code: "+244" },
  { code: "AI", name: "Anguilla", dial_code: "+1-264" },
  { code: "AQ", name: "Antarctica", dial_code: "+672" },
  { code: "AG", name: "Antigua and Barbuda", dial_code: "+1-268" },
  { code: "AR", name: "Argentina", dial_code: "+54" },
  { code: "AM", name: "Armenia", dial_code: "+374" },
  { code: "AU", name: "Australia", dial_code: "+61" },
  { code: "AT", name: "Austria", dial_code: "+43" },
  { code: "AZ", name: "Azerbaijan", dial_code: "+994" },
  { code: "BS", name: "Bahamas", dial_code: "+1-242" },
  { code: "BH", name: "Bahrain", dial_code: "+973" },
  { code: "BD", name: "Bangladesh", dial_code: "+880" },
  { code: "BB", name: "Barbados", dial_code: "+1-246" },
  { code: "BY", name: "Belarus", dial_code: "+375" },
  { code: "BE", name: "Belgium", dial_code: "+32" },
  { code: "BZ", name: "Belize", dial_code: "+501" },
  { code: "BJ", name: "Benin", dial_code: "+229" },
  { code: "BM", name: "Bermuda", dial_code: "+1-441" },
  { code: "BT", name: "Bhutan", dial_code: "+975" },
  { code: "BO", name: "Bolivia", dial_code: "+591" },
  { code: "BA", name: "Bosnia and Herzegovina", dial_code: "+387" },
  { code: "BW", name: "Botswana", dial_code: "+267" },
  { code: "BR", name: "Brazil", dial_code: "+55" },
  { code: "BN", name: "Brunei", dial_code: "+673" },
  { code: "BG", name: "Bulgaria", dial_code: "+359" },
  { code: "BF", name: "Burkina Faso", dial_code: "+226" },
  { code: "BI", name: "Burundi", dial_code: "+257" },
  { code: "KH", name: "Cambodia", dial_code: "+855" },
  { code: "CM", name: "Cameroon", dial_code: "+237" },
  { code: "CA", name: "Canada", dial_code: "+1" },
  { code: "CV", name: "Cape Verde", dial_code: "+238" },
  { code: "CF", name: "Central African Republic", dial_code: "+236" },
  { code: "TD", name: "Chad", dial_code: "+235" },
  { code: "CL", name: "Chile", dial_code: "+56" },
  { code: "CN", name: "China", dial_code: "+86" },
  { code: "CO", name: "Colombia", dial_code: "+57" },
  { code: "KM", name: "Comoros", dial_code: "+269" },
  { code: "CG", name: "Congo (Brazzaville)", dial_code: "+242" },
  { code: "CD", name: "Congo (Kinshasa)", dial_code: "+243" },
  { code: "CR", name: "Costa Rica", dial_code: "+506" },
  { code: "HR", name: "Croatia", dial_code: "+385" },
  { code: "CU", name: "Cuba", dial_code: "+53" },
  { code: "CY", name: "Cyprus", dial_code: "+357" },
  { code: "CZ", name: "Czech Republic", dial_code: "+420" },
  { code: "DK", name: "Denmark", dial_code: "+45" },
  { code: "DJ", name: "Djibouti", dial_code: "+253" },
  { code: "DM", name: "Dominica", dial_code: "+1-767" },
  { code: "DO", name: "Dominican Republic", dial_code: "+1-809" },
  { code: "EC", name: "Ecuador", dial_code: "+593" },
  { code: "EG", name: "Egypt", dial_code: "+20" },
  { code: "SV", name: "El Salvador", dial_code: "+503" },
  { code: "GQ", name: "Equatorial Guinea", dial_code: "+240" },
  { code: "ER", name: "Eritrea", dial_code: "+291" },
  { code: "EE", name: "Estonia", dial_code: "+372" },
  { code: "ET", name: "Ethiopia", dial_code: "+251" },
  { code: "FJ", name: "Fiji", dial_code: "+679" },
  { code: "FI", name: "Finland", dial_code: "+358" },
  { code: "FR", name: "France", dial_code: "+33" },
  { code: "GA", name: "Gabon", dial_code: "+241" },
  { code: "GM", name: "Gambia", dial_code: "+220" },
  { code: "GE", name: "Georgia", dial_code: "+995" },
  { code: "DE", name: "Germany", dial_code: "+49" },
  { code: "GH", name: "Ghana", dial_code: "+233" },
  { code: "GR", name: "Greece", dial_code: "+30" },
  { code: "GT", name: "Guatemala", dial_code: "+502" },
  { code: "GN", name: "Guinea", dial_code: "+224" },
  { code: "GY", name: "Guyana", dial_code: "+592" },
  { code: "HT", name: "Haiti", dial_code: "+509" },
  { code: "HN", name: "Honduras", dial_code: "+504" },
  { code: "HK", name: "Hong Kong", dial_code: "+852" },
  { code: "HU", name: "Hungary", dial_code: "+36" },
  { code: "IS", name: "Iceland", dial_code: "+354" },
  { code: "ID", name: "Indonesia", dial_code: "+62" },
  { code: "IR", name: "Iran", dial_code: "+98" },
  { code: "IQ", name: "Iraq", dial_code: "+964" },
  { code: "IE", name: "Ireland", dial_code: "+353" },
  { code: "IL", name: "Israel", dial_code: "+972" },
  { code: "IT", name: "Italy", dial_code: "+39" },
  { code: "JM", name: "Jamaica", dial_code: "+1-876" },
  { code: "JP", name: "Japan", dial_code: "+81" },
  { code: "JO", name: "Jordan", dial_code: "+962" },
  { code: "KZ", name: "Kazakhstan", dial_code: "+7" },
  { code: "KE", name: "Kenya", dial_code: "+254" },
  { code: "KI", name: "Kiribati", dial_code: "+686" },
  { code: "KW", name: "Kuwait", dial_code: "+965" },
  { code: "KG", name: "Kyrgyzstan", dial_code: "+996" },
  { code: "LA", name: "Laos", dial_code: "+856" },
  { code: "LV", name: "Latvia", dial_code: "+371" },
  { code: "LB", name: "Lebanon", dial_code: "+961" },
  { code: "LS", name: "Lesotho", dial_code: "+266" },
  { code: "LR", name: "Liberia", dial_code: "+231" },
  { code: "LY", name: "Libya", dial_code: "+218" },
  { code: "LI", name: "Liechtenstein", dial_code: "+423" },
  { code: "LT", name: "Lithuania", dial_code: "+370" },
  { code: "LU", name: "Luxembourg", dial_code: "+352" },
  { code: "MO", name: "Macau", dial_code: "+853" },
  { code: "MK", name: "North Macedonia", dial_code: "+389" },
  { code: "MG", name: "Madagascar", dial_code: "+261" },
  { code: "MW", name: "Malawi", dial_code: "+265" },
  { code: "MY", name: "Malaysia", dial_code: "+60" },
  { code: "MV", name: "Maldives", dial_code: "+960" },
  { code: "ML", name: "Mali", dial_code: "+223" },
  { code: "MT", name: "Malta", dial_code: "+356" },
  { code: "MH", name: "Marshall Islands", dial_code: "+692" },
  { code: "MR", name: "Mauritania", dial_code: "+222" },
  { code: "MU", name: "Mauritius", dial_code: "+230" },
  { code: "MX", name: "Mexico", dial_code: "+52" },
  { code: "FM", name: "Micronesia", dial_code: "+691" },
  { code: "MD", name: "Moldova", dial_code: "+373" },
  { code: "MC", name: "Monaco", dial_code: "+377" },
  { code: "MN", name: "Mongolia", dial_code: "+976" },
  { code: "ME", name: "Montenegro", dial_code: "+382" },
  { code: "MA", name: "Morocco", dial_code: "+212" },
  { code: "MZ", name: "Mozambique", dial_code: "+258" },
  { code: "MM", name: "Myanmar", dial_code: "+95" },
  { code: "NA", name: "Namibia", dial_code: "+264" },
  { code: "NP", name: "Nepal", dial_code: "+977" },
  { code: "NL", name: "Netherlands", dial_code: "+31" },
  { code: "NZ", name: "New Zealand", dial_code: "+64" },
  { code: "NI", name: "Nicaragua", dial_code: "+505" },
  { code: "NE", name: "Niger", dial_code: "+227" },
  { code: "NG", name: "Nigeria", dial_code: "+234" },
  { code: "NO", name: "Norway", dial_code: "+47" },
  { code: "OM", name: "Oman", dial_code: "+968" },
  { code: "PK", name: "Pakistan", dial_code: "+92" },
  { code: "PA", name: "Panama", dial_code: "+507" },
  { code: "PG", name: "Papua New Guinea", dial_code: "+675" },
  { code: "PY", name: "Paraguay", dial_code: "+595" },
  { code: "PE", name: "Peru", dial_code: "+51" },
  { code: "PH", name: "Philippines", dial_code: "+63" },
  { code: "PL", name: "Poland", dial_code: "+48" },
  { code: "PT", name: "Portugal", dial_code: "+351" },
  { code: "QA", name: "Qatar", dial_code: "+974" },
  { code: "RO", name: "Romania", dial_code: "+40" },
  { code: "RU", name: "Russia", dial_code: "+7" },
  { code: "RW", name: "Rwanda", dial_code: "+250" },
  { code: "SA", name: "Saudi Arabia", dial_code: "+966" },
  { code: "SN", name: "Senegal", dial_code: "+221" },
  { code: "RS", name: "Serbia", dial_code: "+381" },
  { code: "SG", name: "Singapore", dial_code: "+65" },
  { code: "SK", name: "Slovakia", dial_code: "+421" },
  { code: "SI", name: "Slovenia", dial_code: "+386" },
  { code: "ZA", name: "South Africa", dial_code: "+27" },
  { code: "KR", name: "South Korea", dial_code: "+82" },
  { code: "ES", name: "Spain", dial_code: "+34" },
  { code: "LK", name: "Sri Lanka", dial_code: "+94" },
  { code: "SD", name: "Sudan", dial_code: "+249" },
  { code: "SE", name: "Sweden", dial_code: "+46" },
  { code: "CH", name: "Switzerland", dial_code: "+41" },
  { code: "SY", name: "Syria", dial_code: "+963" },
  { code: "TW", name: "Taiwan", dial_code: "+886" },
  { code: "TJ", name: "Tajikistan", dial_code: "+992" },
  { code: "TZ", name: "Tanzania", dial_code: "+255" },
  { code: "TH", name: "Thailand", dial_code: "+66" },
  { code: "TG", name: "Togo", dial_code: "+228" },
  { code: "TO", name: "Tonga", dial_code: "+676" },
  { code: "TT", name: "Trinidad and Tobago", dial_code: "+1-868" },
  { code: "TN", name: "Tunisia", dial_code: "+216" },
  { code: "TR", name: "Turkey", dial_code: "+90" },
  { code: "TM", name: "Turkmenistan", dial_code: "+993" },
  { code: "UG", name: "Uganda", dial_code: "+256" },
  { code: "UA", name: "Ukraine", dial_code: "+380" },
  { code: "AE", name: "United Arab Emirates", dial_code: "+971" },
  { code: "GB", name: "United Kingdom", dial_code: "+44" },
  { code: "US", name: "United States", dial_code: "+1" },
  { code: "UY", name: "Uruguay", dial_code: "+598" },
  { code: "UZ", name: "Uzbekistan", dial_code: "+998" },
  { code: "VE", name: "Venezuela", dial_code: "+58" },
  { code: "VN", name: "Vietnam", dial_code: "+84" },
  { code: "YE", name: "Yemen", dial_code: "+967" },
  { code: "ZM", name: "Zambia", dial_code: "+260" },
  { code: "ZW", name: "Zimbabwe", dial_code: "+263" },
];

export const GROUP_TYPES = [
  { label: "Fixed Departure", value: "Fixed Departure" },
  { label: "Private Group", value: "Private Group" },
];

export default function Constant() {
  return <></>;
}

export const HOME_FAQS = [
  {
    id: 1,
    question: "Why do I choose Glacier Treks & Adventure for trekking?",
    answer:
      "Glacier Treks & Adventure is the most reputed company. We will provide you the best destination for trekking. Among all the other companies for trekking we will be going to provide you the best value. At any point of time before our trekking date you will get the booking confirmation. The staffs whoa are providing services to us will take care of your booking plans and will also confirm you about the schedules with the overall information. ",
  },

  {
    id: 2,
    question: "What are the reasons for choosing Glacier Treks & Adventure?",
    answer:
      "Glacier Treks & Adventure has been in this business for many years. We have the experience of making a trekking expedition with our clients. The people who are involved with us are all experienced. They know the routes and will make your route with the most scenic beauties of nature. We at Glacier Treks & Adventure will provide you the experiences of trekking that has been made by other travellers. We will also going to provide you the route map before the expedition.",
  },
  {
    id: 3,
    question: "What is the climatic condition of the place?",
    answer:
      "Our trekking routes mainly follow the steps of the hills. The hilly regions are mainly comfortable for trekking. Besides, our expert guide will be there throughout the coverage. Mainly the hilly regions are not much humid. They are cool all through the season. Therefore you will not feel tired and with ease cover your distances. ",
  },
  {
    id: 4,
    question: "What are the food items that I should take?",
    answer:
      "You do not have to take the food items with you. We will provide you with all the food items that will be required in the road. Besides, Glacier Treks & Adventure have own chefs. They will make all the arrangements for your fooding and lodging in the places that you are going to be trekked. ",
  },
  {
    id: 5,
    question:
      "Does your company provide any type of equipments like the shoes, jackets?",
    answer: `<p><span>Actually we provide equipment’s only for trekking. Other than these we do not provide anything else. But we will be going to make a list of the stuffs that are important in trekking. You must have:</span></p>
<ul>
    <li>A windproof jacket along with the cold resistant trouser</li>
    <li>An Inner sweater is very important to control your body temperature at the night</li>
    <li>Gloves, Scurf, woolen caps to protect your ears from the chilling winds</li>
    <li>Trekking boots with socks</li>
    <li>Torch and medicine&nbsp;</li>
</ul>`,
  },

  {
    id: 6,
    question: "Do you provide any types of medicine during mountain sickness?",
    answer:
      "Yes we provide medicines for mountain sickness. Our team of experts carries all the necessary medicines. A specialist will also be there in the team.",
  },
  {
    id: 7,
    question:
      "Does Glacier Treks & Adventure provide any type of transportation facilities?",
    answer:
      "Yes. We provide the transportation facilities for our clients. If any of our clients gets sick due to any reason our team of specialist will check the health conditions and after that we will provide transport facilities. We also provide transport facilities to our clients to reach the point of trekking and after that to the destination.",
  },
];
