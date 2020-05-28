const SortType = {
  DEFAULT: `sort-event`,
  TIME: `sort-time`,
  PRICE: `sort-price`
};

const groupPointsByDate = (points) => {
  const pointsGroup = new Map();

  points.forEach((it) => {
    const pointDateStart = new Date(it.date.start);

    const startDay = new Date(pointDateStart.getFullYear(), pointDateStart.getMonth(), pointDateStart.getDate(), 0, 0, 0, 0);
    const endDay = new Date(pointDateStart.getFullYear(), pointDateStart.getMonth(), pointDateStart.getDate(), 23, 59, 59, 999);

    const startTimestampDay = startDay.getTime();
    const endTimestampDay = endDay.getTime();

    if (!pointsGroup.has(startTimestampDay)) {
      const dayPoints = points.filter((point) => {
        return (
          startTimestampDay <= point.date.start.getTime() && point.date.start.getTime() <= endTimestampDay
        );
      });

      pointsGroup.set(startTimestampDay, dayPoints);
    }
  });

  return pointsGroup;
};

const sortPoints = (points, sortType) => {
  let sortedPoints = [];
  const showingEvents = points.slice();

  switch (sortType) {
    case SortType.DEFAULT:
      sortedPoints = showingEvents.sort((a, b) => a.date.start - b.date.start);
      break;

    case SortType.TIME:
      sortedPoints = showingEvents.sort((a, b) => (b.date.end - b.date.start) - (a.date.end - a.date.start));
      break;

    case SortType.PRICE:
      sortedPoints = showingEvents.sort((a, b) => b.price - a.price);
      break;

    default:
      sortedPoints = showingEvents.sort((a, b) => a.date.start - b.date.start);
      break;
  }

  return sortedPoints;
};

export {SortType, groupPointsByDate, sortPoints};
