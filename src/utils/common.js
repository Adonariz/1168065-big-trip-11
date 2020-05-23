const castTimeFormat = (value) => {
  return String(value).padStart(2, `0`);
};

const formatTime24H = (date) => `${castTimeFormat(date.getHours())}:${castTimeFormat(date.getMinutes())}`;

const getStringDate = (date) => `${castTimeFormat(date.getDate())}/${castTimeFormat(date.getMonth())}/${date.getFullYear() % 100}`;

const getISOStringDate = (date) => {
  const isoDate = new Date(date);
  isoDate.setHours(isoDate.getHours());

  return isoDate.toISOString();
};

const calcDuration = (start, end) => {
  const MINUTE_IN_MS = 60000;
  const DAY_IN_MINUTES = 1440;
  const HOUR_IN_MINUTES = 60;

  let duration = (end - start) / MINUTE_IN_MS;
  let days = ``;
  let hours = ``;

  if (duration >= DAY_IN_MINUTES) {
    days = `${castTimeFormat(Math.floor(duration / DAY_IN_MINUTES))}D `;
    duration = duration - parseInt(days, 10) * DAY_IN_MINUTES;
    hours = `00H `;
  }

  if (duration >= HOUR_IN_MINUTES) {
    hours = `${castTimeFormat(Math.floor(duration / HOUR_IN_MINUTES))}H `;
    duration = duration - parseInt(hours, 10) * HOUR_IN_MINUTES;
  }

  const minutes = `${castTimeFormat(duration)}M`;

  return (
    `${days}${hours}${minutes}`
  );
};

const capFirstLetter = (word) => word[0].toUpperCase() + word.slice(1);

export {castTimeFormat, formatTime24H, getStringDate, getISOStringDate, calcDuration, capFirstLetter};
