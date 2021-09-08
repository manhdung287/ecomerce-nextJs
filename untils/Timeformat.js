export const DateFormat = (value) => {
  const dt = new Date(value);
  var formatedString =
   ( dt.getDate() + 1)+
    "-" +
    (dt.getMonth() +1) +
    "-" +
    dt.getFullYear()
  return formatedString;
};
export const TimeFormat = (value) => {
  const dt = new Date(value);
  var formatedString =
    dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds()
  return formatedString;
};
export const DateTimeFormat = (value) => {
  const dt = new Date(value);
  var formatedString =
    dt.getHours() +
    ":" +
    dt.getMinutes() +
    ":" +
    dt.getSeconds() +
    "/" +
    (dt.getDate() + 1) +
    "-" +
    (dt.getMonth() + 1) +
    "-" +
    dt.getFullYear();
  return formatedString;
};
