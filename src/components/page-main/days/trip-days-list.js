import {createElement} from "../../../helpers/utils";

const createDaysList = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class DaysList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createDaysList();
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