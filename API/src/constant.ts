export const MEDIA_TYPES = ["image", "youtube-link"];

export const STEPS = [
  { id: 1, label: "Basic Information", db: "packages" },
  { id: 2, label: "Departure Date", db: "packages_departure_date" },
  { id: 3, label: "Gallery", db: "package_gallery" },
  { id: 4, label: "FAQ", db: "package_faq" },
  { id: 5, label: "Trip Itinerary", db: "package_itinerary" },
  { id: 6, label: "Other Options", db: "package-info" },
];

export const GROUP_TYPES = [
  { label: "Fixed Departure", value: "Fixed Departure" },
  { label: "Private Group", value: "Private Group" },
];
