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

const groupEvents = (events) => {
  const eventsGroup = new Map();

  events.forEach((it) => {
    const startEventDate = new Date(it.date.start);

    const startDay = new Date(startEventDate.getFullYear(), startEventDate.getMonth(), startEventDate.getDate(), 0, 0, 0, 0);
    const endDay = new Date(startEventDate.getFullYear(), startEventDate.getMonth(), startEventDate.getDate(), 23, 59, 59, 999);

    const startTimestampDay = startDay.getTime();
    const endTimestampDay = endDay.getTime();

    if (!eventsGroup.has(startTimestampDay)) {
      const dayEvents = events.filter((event) => {
        return (
          startTimestampDay <= event.date.start.getTime() && event.date.end.getTime() <= endTimestampDay
        );
      });

      eventsGroup.set(startTimestampDay, dayEvents);
    }
  });

  return eventsGroup;
};

const capFirstLetter = (word) => word[0].toUpperCase() + word.slice(1);

export {castTimeFormat, formatTime24H, getStringDate, getISOStringDate, groupEvents, capFirstLetter};
