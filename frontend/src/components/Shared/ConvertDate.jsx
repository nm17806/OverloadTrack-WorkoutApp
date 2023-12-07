export default function ConvertDate(date) {
  const originalDateString = date;
  const originalDate = new Date(originalDateString);

  const day = originalDate.getDate();
  const month = originalDate.getMonth() + 1; // Months are zero-indexed, so we add 1
  const year = originalDate.getFullYear();

  // Pad single-digit day and month with leading zeros
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

  return formattedDate;
}
