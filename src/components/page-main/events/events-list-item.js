import {createElement} from "../../../helpers/utils";

const createEventsListItemTemplate = () => {
  return (
    `<li class="trip-events__item"></li>`
  );
};

export default class EventsListItem {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEventsListItemTemplate();
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
