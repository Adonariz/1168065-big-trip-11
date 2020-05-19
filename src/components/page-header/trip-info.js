import AbstractComponent from "../abstract-component";

const createTripInfoTemplate = (cost) => {
  const totalCost = `${cost ? cost : 0}`;

  return (
    `<section class="trip-main__trip-info  trip-info">
        <p class="trip-info__cost">Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span></p>\
    </section>`
  );
};

export default class TripInfo extends AbstractComponent {
  getTemplate() {
    return createTripInfoTemplate();
  }
}
