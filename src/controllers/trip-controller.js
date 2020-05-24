import {remove, render, RenderPosition} from "../utils/render";
import {SortType, groupEventsByDate, sortEvents} from "../utils/sort";
import TripDayItem from "../components/page-main/days/trip-day-item";
import EventsList from "../components/page-main/events/events-list";
import EventsListItem from "../components/page-main/events/events-list-item";
import NoEvents from "../components/page-main/events/no-events";
import TripSort from "../components/page-main/trip-sort";
import TripDaysList from "../components/page-main/days/trip-days-list";
import PointController from "./point-controller";

// Отрисовка контейнера для группировки по дням
const renderTripDayItem = (tripDaysListComponent, events, dayTimeStamp = null, count = null) => {
  const tripDayItemComponent = new TripDayItem(dayTimeStamp, count);
  const tripDayItem = tripDayItemComponent.getElement();

  render(tripDaysListComponent.getElement(), tripDayItemComponent, RenderPosition.BEFOREEND);

  const eventsListComponent = new EventsList();
  render(tripDayItem, eventsListComponent, RenderPosition.BEFOREEND);

  const eventsListItemComponent = new EventsListItem();
  render(eventsListComponent.getElement(), eventsListItemComponent, RenderPosition.BEFOREEND);

  renderTripDayEventsItem(eventsListItemComponent.getElement(), events);
};

const renderTripDayEventsItem = (eventsListItem, events) => {
  events.forEach((event) => {
    const pointController = new PointController(eventsListItem);
    pointController.render(event);
  });
};

// Отрисовка событий, сгруппированным по дням
const renderEventsByDays = (tripDaysListComponent, groupedEvents) => {
  Array.from(groupedEvents.entries()).forEach((groupEvent, index) => {
    const [dayTimeStamp, events] = groupEvent;

    renderTripDayItem(tripDaysListComponent, events, dayTimeStamp, ++index);
  });
};

const renderEvents = (component, events) => {
  const sortedEvents = sortEvents(events);
  const groupedEvents = groupEventsByDate(sortedEvents);

  renderEventsByDays(component, groupedEvents);
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._noEventsComponent = new NoEvents();
    this._tripSortComponent = new TripSort();
    this._tripDaysListComponent = new TripDaysList();
  }

  render(events) {
    const tripSectionFirstChild = this._container.querySelector(`h2`);

    if (events.length === 0) {
      render(tripSectionFirstChild, this._noEventsComponent, RenderPosition.AFTEREND);
      return;
    }

    render(tripSectionFirstChild, this._tripSortComponent, RenderPosition.AFTEREND);

    this._tripSortComponent.setSortTypeChangeHandler(() => {
      const sortedEvents = sortEvents(events, this._tripSortComponent.getSortType());
      remove(this._tripDaysListComponent);

      if (this._tripSortComponent.getSortType() === SortType.DEFAULT) {
        const groupedEvents = groupEventsByDate(sortedEvents);
        render(this._container, this._tripDaysListComponent, RenderPosition.BEFOREEND);
        renderEventsByDays(this._tripDaysListComponent, groupedEvents);
      } else {
        render(this._container, this._tripDaysListComponent, RenderPosition.BEFOREEND);
        renderTripDayItem(this._tripDaysListComponent, sortedEvents);
      }
    });

    render(this._container, this._tripDaysListComponent, RenderPosition.BEFOREEND);
    renderEvents(this._tripDaysListComponent, events);
  }
}
