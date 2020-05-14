import {getISOStringDate, createElement} from "../../../helpers/utils";
import {MONTH_NAMES} from "../../../helpers/const";

const createDayTemplate = (event, count) => {
  const {date} = event;
  const isoDate = getISOStringDate(date.start).slice(0, 10);
  const monthAndDate = `${MONTH_NAMES[date.start.getMonth()]} ${date.start.getDate()}`;

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
  constructor(event, count) {
    this._event = event;
    this._count = count;
    this._element = null;
  }

  getTemplate() {
    return createDayTemplate(this._event, this._count);
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
