export const SpaceY = () => {
  return <div className="my-[10px]" />;
};
export const convertLink = (context: string) => {
  try {
    //fix the hyperlink
    const searchStr = "<a";
    const replaceStr = '<a style="text-decoration:underline;color:blue"';
    const newText = context?.replace(new RegExp(searchStr, "g"), replaceStr);

    //fix the list-style for ol
    const searchStrUl = "<ol";
    const replaceStrUl = "<ol style='list-style:decimal'";
    const newTextUl = newText?.replace(
      new RegExp(searchStrUl, "g"),
      replaceStrUl
    );

    //fix the list-style for ul
    const searchStrOl = "<ul";
    const replaceStrOl = "<ul style='list-style:disc'";
    const newTextOl = newTextUl?.replace(
      new RegExp(searchStrOl, "g"),
      replaceStrOl
    );

    return newTextOl;
  } catch (error) {
    console.log("Error in convertLink:", error);
    return context;
  }
};

export const formatTime = (time: string) => {
  let hour = Number(time.substring(0, 2));
  if (hour > 12)
    return (
      (hour - 12).toString().padStart(2, "0") +
      ":" +
      time.substring(3, 5) +
      " PM"
    );
  else if (hour === 12)
    return (
      hour.toString().padStart(2, "0") + ":" + time.substring(3, 5) + " PM"
    );
  else
    return (
      hour.toString().padStart(2, "0") + ":" + time.substring(3, 5) + " AM"
    );
};

export const formatDateTime = (dateTime: string) => {
  let date = dateTime.substring(0, 11);
  let hour = Number(dateTime.substring(11, 13));
  if (hour > 12)
    return (
      date +
      (hour - 12).toString().padStart(2, "0") +
      ":" +
      dateTime.substring(14, 16) +
      " PM"
    );
  else if (hour === 12)
    return (
      date +
      hour.toString().padStart(2, "0") +
      ":" +
      dateTime.substring(14, 16) +
      " PM"
    );
  else
    return (
      date +
      hour.toString().padStart(2, "0") +
      ":" +
      dateTime.substring(14, 16) +
      " AM"
    );
};

export const formatDateTimePMTo00 = (dateTime: string) => {
  console.log(dateTime);
  const noon = dateTime.slice(-2);
  let date = dateTime.substring(0, 11);
  let hour = Number(dateTime.substring(11, 13));

  if (noon === "PM") {
    if (hour !== 12) {
      hour += 12;
    }
  } else if (noon === "AM" && hour === 12) {
    hour = 0;
  }
  const result =
    date +
    hour.toString().padStart(2, "0") +
    ":" +
    dateTime.substring(14, 16) +
    ":00";
    
  console.log(dateTime, result);
  return result;
};
