import {FilterType} from "./const";

export const getPointsByFilter = (points, filterType) => {
  const nowDate = new Date();

  switch (filterType) {
    case FilterType.FUTURE:
      return points.filter((point) => point.date.start > nowDate);
    case FilterType.PAST:
      return points.filter((point) => point.date.start < nowDate);
    default:
      return points;
  }
};
