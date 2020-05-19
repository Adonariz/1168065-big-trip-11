import AbstractComponent from "../../abstract-component";

const createEventsListItemTemplate = () => {
  return (
    `<li class="trip-events__item"></li>`
  );
};

export default class EventsListItem extends AbstractComponent {
  getTemplate() {
    return createEventsListItemTemplate();
  }
}
