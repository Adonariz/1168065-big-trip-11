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

const getSortingEvents = (events) => {
  return (
    events.slice().sort((a, b) => a.date.start - b.date.start)
  );
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
          startTimestampDay <= event.date.start.getTime() && event.date.start.getTime() <= endTimestampDay
        );
      });

      eventsGroup.set(startTimestampDay, dayEvents);
    }
  });

  return eventsGroup;
};

const capFirstLetter = (word) => word[0].toUpperCase() + word.slice(1);

const renderComponent = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`
};

const render = (container, element, position) => {
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export {castTimeFormat, formatTime24H, getStringDate, getISOStringDate, calcDuration, getSortingEvents, groupEvents, capFirstLetter, renderComponent, createElement, RenderPosition, render};
