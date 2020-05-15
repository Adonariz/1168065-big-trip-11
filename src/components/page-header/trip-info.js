import {createElement} from "../../helpers/utils";

const createTripInfoTemplate = (cost) => {
  const totalCost = `${cost ? cost : 0}`;

  return (
    `<section class="trip-main__trip-info  trip-info">
        <p class="trip-info__cost">Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span></p>\
    </section>`
  );
};

export default class TripInfo {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate();
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
