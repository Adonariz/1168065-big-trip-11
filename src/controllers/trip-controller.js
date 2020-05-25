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
const renderTripDayItem = (tripDaysListComponent, events, onDataChange, onViewChange, dayTimeStamp = null, count = null) => {
  const tripDayItemComponent = new TripDayItem(dayTimeStamp, count);
  const tripDayItem = tripDayItemComponent.getElement();

  render(tripDaysListComponent.getElement(), tripDayItemComponent, RenderPosition.BEFOREEND);

  const eventsListComponent = new EventsList();
  render(tripDayItem, eventsListComponent, RenderPosition.BEFOREEND);

  const eventsListItemComponent = new EventsListItem();
  render(eventsListComponent.getElement(), eventsListItemComponent, RenderPosition.BEFOREEND);

  renderTripDayEventsItem(eventsListItemComponent.getElement(), events, onDataChange, onViewChange);
};

const renderTripDayEventsItem = (eventsListItem, events, onDataChange, onViewChange) => {
  return events.map((event) => {
    const pointController = new PointController(eventsListItem, onDataChange, onViewChange);
    pointController.render(event);

    return pointController;
  });
};

// Отрисовка событий, сгруппированным по дням
const renderEventsByDays = (tripDaysListComponent, groupedEvents, onDataChange, onViewChange) => {
  Array.from(groupedEvents.entries()).forEach((groupEvent, index) => {
    const [dayTimeStamp, events] = groupEvent;

    renderTripDayItem(tripDaysListComponent, events, onDataChange, onViewChange, dayTimeStamp, ++index);
  });
};

const renderEvents = (component, events, onDataChange, onViewChange) => {
  const sortedEvents = sortEvents(events);
  const groupedEvents = groupEventsByDate(sortedEvents);

  renderEventsByDays(component, groupedEvents, onDataChange, onViewChange);
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._events = [];
    this._showedPointControllers = [];

    this._noEventsComponent = new NoEvents();
    this._tripSortComponent = new TripSort();
    this._tripDaysListComponent = new TripDaysList();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(events) {
    this._events = events;

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
        renderEventsByDays(this._tripDaysListComponent, groupedEvents, this._onDataChange, this._onViewChange);
      } else {
        render(this._container, this._tripDaysListComponent, RenderPosition.BEFOREEND);
        renderTripDayItem(this._tripDaysListComponent, sortedEvents, this._onDataChange, this._onViewChange);
      }
    });

    render(this._container, this._tripDaysListComponent, RenderPosition.BEFOREEND);
    const newEvents = renderEvents(this._tripDaysListComponent, events, this._onDataChange, this._onViewChange);
    this._showedPointControllers = this._showedPointControllers.concat(newEvents);
    console.log(this._showedPointControllers);
  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._events.findIndex((event) => event.id === oldData.id);

    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));

    pointController.render(this._events[index]);
  }

  _onViewChange() {
    this._showedPointControllers.forEach((pointController) => pointController.setDefaultView());
  }
}
