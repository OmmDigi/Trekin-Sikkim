export function formatDateToReadable(dateStr: string) {
  if (!dateStr) return;

  const date = new Date(dateStr);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return date.toLocaleDateString("en-GB", options);
}
