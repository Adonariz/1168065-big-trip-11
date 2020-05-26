import moment from "moment";

const castTimeFormat = (value) => {
  return String(value).padStart(2, `0`);
};

const formatTime24H = (date) => moment(date).format(`hh:mm`);

const getStringDate = (date) => `${castTimeFormat(date.getDate())}/${castTimeFormat(date.getMonth())}/${date.getFullYear() % 100}`;

const getISOStringDate = (date) => {
  const isoDate = new Date(date);
  isoDate.setHours(isoDate.getHours());

  return isoDate.toISOString();
};

const getDurationString = (start, end) => {
  const duration = (end - start);
  const days = moment.duration(duration).days();
  const hours = moment.duration(duration).hours();
  const minutes = moment.duration(duration).minutes();
  let formattedDuration = ``;

  if (days) {
    formattedDuration += `${days}D `;
  }

  if (days || hours) {
    formattedDuration += `${hours}H `;
  }

  return (formattedDuration += `${minutes}M`);

};

const capFirstLetter = (word) => word[0].toUpperCase() + word.slice(1);

export {castTimeFormat, formatTime24H, getStringDate, getISOStringDate, getDurationString, capFirstLetter};
