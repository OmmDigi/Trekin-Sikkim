export function formatDateToReadable(dateStr: string) {
  if(dateStr === "") return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid ISO date: "${dateStr}"`);
  }

  const day = date.getDate(); // LOCAL
  const monthIndex = date.getMonth(); // LOCAL
  const year = date.getFullYear(); // LOCAL

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthName = monthNames[monthIndex];

  const dayStr = String(day).padStart(2, "0");

  return `${dayStr} ${monthName}, ${year}`;
}
