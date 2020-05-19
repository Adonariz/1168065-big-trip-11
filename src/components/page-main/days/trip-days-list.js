import AbstractComponent from "../../abstract-component";

const createDaysList = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class DaysList extends AbstractComponent {
  getTemplate() {
    return createDaysList();
  }
}
