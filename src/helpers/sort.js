const SortType = {
  DEFAULT: `sort-event`,
  TIME: `sort-time`,
  PRICE: `sort-price`
};

const groupEventsByDate = (events) => {
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

const sortEvents = (events, sortType) => {
  let sortedEvents = [];
  const showingEvents = events.slice();

  switch (sortType) {
    case SortType.DEFAULT:
      sortedEvents = showingEvents.sort((a, b) => a.date.start - b.date.start);
      break;

    case SortType.TIME:
      sortedEvents = showingEvents.sort((a, b) => (b.date.end - b.date.start) - (a.date.end - a.date.start));
      break;

    case SortType.PRICE:
      sortedEvents = showingEvents.sort((a, b) => b.price - a.price);
      break;

    default:
      sortedEvents = showingEvents.sort((a, b) => a.date.start - b.date.start);
      break;
  }

  return sortedEvents;
};

export {SortType, groupEventsByDate, sortEvents};
