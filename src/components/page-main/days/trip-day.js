import {getISOStringDate, createElement} from "../../../helpers/utils";
import {MONTH_NAMES} from "../../../helpers/const";

const createDayTemplate = (dayTimeStamp, count) => {
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
};

export default class DayItem {
  constructor(dayTimeStamp, count) {
    this._dayTimeStamp = dayTimeStamp;
    this._count = count;
    this._element = null;
  }

  getTemplate() {
    return createDayTemplate(this._dayTimeStamp, this._count);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
