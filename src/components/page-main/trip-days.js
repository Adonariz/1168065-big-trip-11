import {getISOStringDate} from "../../helpers/utils";
import {MONTH_NAMES} from "../../helpers/const";

export const createDayTemplate = (dayTimeStamp, count, eventsList) => {
  const date = new Date(dayTimeStamp);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${count}</span>
        <time class="day__date" datetime="${getISOStringDate(date).slice(0, 10)}">${MONTH_NAMES[date.getMonth()]} ${date.getDate()}</time>
      </div>
      ${eventsList}
    </li>`
  );
};
