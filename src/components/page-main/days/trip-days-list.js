import AbstractComponent from "../../abstract-component";

const createDaysList = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class TripDaysList extends AbstractComponent {
  getTemplate() {
    return createDaysList();
  }

  destroy() {
    this.getElement().innerHTML = ``;
  }
}
