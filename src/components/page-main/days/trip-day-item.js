import {getISOStringDate} from "../../../helpers/utils";
import {MONTH_NAMES} from "../../../helpers/const";
import AbstractComponent from "../../abstract-component";

const createDayTemplate = (dayTimeStamp = null, count = null) => {
  if (dayTimeStamp && count) {
    const date = new Date(dayTimeStamp);
    const isoDate = getISOStringDate(date).slice(0, 10);
    const monthAndDate = `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}`;

    return (
      `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${count}</span>
          <time class="day__date" datetime="${isoDate}">${monthAndDate}</time>
        </div>
      </li>`
    );
  } else {
    return (
      `<li class="trip-days__item  day">
        <div class="day__info"></div>
      </li>`
    );
  }
};

export default class TripDayItem extends AbstractComponent {
  constructor(dayTimeStamp, count) {
    super();

    this._dayTimeStamp = dayTimeStamp;
    this._count = count;
  }

  getTemplate() {
    return createDayTemplate(this._dayTimeStamp, this._count);
  }
}
