const castTimeFormat = (value) => {
  return String(value).padStart(2, `0`);
};

const formatTime24H = (date) => `${castTimeFormat(date.getHours())}:${castTimeFormat(date.getMinutes())}`;

const getStringDate = (date) => `${castTimeFormat(date.getDate())}/${castTimeFormat(date.getMonth())}/${date.getFullYear() % 100}`;


const getISOStringDate = (date) => {
  const isoDate = new Date(date);
  isoDate.setHours(isoDate.getHours() - isoDate.getTimezoneOffset() / 60);
  return isoDate.toISOString();
};

const getPassedDays = (start, end) => (new Date(new Date(end) - new Date(start))).getDate();

const capFirstLetter = (word) => word[0].toUpperCase() + word.slice(1);

export {castTimeFormat, formatTime24H, getStringDate, getISOStringDate, capFirstLetter, getPassedDays};
