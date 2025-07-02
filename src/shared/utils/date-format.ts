function formatDateForTour(tour_date: any) {
  const [datePart, timePart, modifier] = (
    tour_date || "2024-01-28 10:00 AM"
  )?.split(" ");
  let temphours = parseInt(timePart.split(":")[0], 10);

  // Adjust hours for 12-hour AM/PM format
  if (modifier === "PM" && temphours < 12) {
    temphours += 12;
  } else if (modifier === "AM" && temphours === 12) {
    temphours = 0;
  }

  // Zero-pad the hours if it becomes single digit after conversion
  const formattedHours = String(temphours).padStart(2, "0");
  const tempminutes = timePart?.split(":")[1];
  const ISODateString = `${datePart}T${formattedHours}:${tempminutes}:00`;

  const date = new Date(ISODateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function convertToISO8601(dateString: string) {
  // Parse date and time from the string
  const [date, time] = dateString.split(" ");
  const [year, month, day] = date.split("-");
  const [hour, minute, second] = time.split(":");

  let dateInUTC = new Date(
    Date.UTC(
      parseInt(year),
      parseInt(month) - 1, // Month is 0-based in JavaScript
      parseInt(day),
      parseInt(hour),
      parseInt(minute),
      parseInt(second)
    )
  );

  let isoDate = dateInUTC.toISOString().split(".000Z")[0];
  return isoDate;
}

export { convertToISO8601, formatDateForTour };
