export function formatDateToReadable(dateStr: string) {
  if(dateStr === "") return;
  
  const date = new Date(dateStr);

  const options: any = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  };
  return date.toLocaleDateString("en-GB", options);
}
