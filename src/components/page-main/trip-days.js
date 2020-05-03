import {getISOStringDate} from "../../helpers/utils";
import {MONTH_NAMES} from "../../helpers/const";

export const createDayTemplate = (event, count, eventsList) => {
  const {date} = event;

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${count}</span>
        <time class="day__date" datetime="${getISOStringDate(date.start).slice(0, 10)}">${MONTH_NAMES[date.start.getMonth()]} ${date.start.getDate()}</time>
      </div>
      ${eventsList}
    </li>`
  );
};
