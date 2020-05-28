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

  return renderTripDayEventsItem(eventsListItemComponent.getElement(), events, onDataChange, onViewChange);
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
  let controllers = [];

  Array.from(groupedEvents.entries()).forEach((groupEvent, index) => {
    const [dayTimeStamp, events] = groupEvent;

    controllers = controllers.concat(renderTripDayItem(tripDaysListComponent, events, onDataChange, onViewChange, dayTimeStamp, ++index));
  });

  return controllers;
};

const renderEvents = (component, events, onDataChange, onViewChange) => {
  const sortedEvents = sortEvents(events);
  const groupedEvents = groupEventsByDate(sortedEvents);

  return renderEventsByDays(component, groupedEvents, onDataChange, onViewChange);
};

export default class TripController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;

    this._showedPointControllers = [];

    this._noEventsComponent = new NoEvents();
    this._tripSortComponent = new TripSort();
    this._tripDaysListComponent = new TripDaysList();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render() {
    const points = this._pointsModel.getPoints();

    const tripSectionFirstChild = this._container.querySelector(`h2`);

    if (points.length === 0) {
      render(tripSectionFirstChild, this._noEventsComponent, RenderPosition.AFTEREND);
      return;
    }

    render(tripSectionFirstChild, this._tripSortComponent, RenderPosition.AFTEREND);
    this._renderPoints(points);
  }

  _renderPoints(points) {
    this._tripSortComponent.setSortTypeChangeHandler(() => {
      const sortedEvents = sortEvents(points, this._tripSortComponent.getSortType());

      this._destroyControllers();
      remove(this._tripDaysListComponent);

      if (this._tripSortComponent.getSortType() === SortType.DEFAULT) {
        render(this._container, this._tripDaysListComponent, RenderPosition.BEFOREEND);
        this._showedPointControllers = renderEvents(this._tripDaysListComponent, points, this._onDataChange, this._onViewChange);
      } else {
        render(this._container, this._tripDaysListComponent, RenderPosition.BEFOREEND);
        this._showedPointControllers = renderTripDayItem(this._tripDaysListComponent, sortedEvents, this._onDataChange, this._onViewChange);
      }
    });

    render(this._container, this._tripDaysListComponent, RenderPosition.BEFOREEND);
    this._showedPointControllers = renderEvents(this._tripDaysListComponent, points, this._onDataChange, this._onViewChange);
  }

  _destroyControllers() {
    this._showedPointControllers.forEach((pointController) => {
      pointController.destroy();
      pointController = null;
    });

    this._showedPointControllers = [];
  }

  _onDataChange(pointController, oldData, newData) {
    const isSuccess = this._pointsModel.updatePoint(oldData.id, newData);

    if (isSuccess) {
      pointController.render(newData);
    }
  }

  _onViewChange() {
    this._showedPointControllers.forEach((pointController) => pointController.setDefaultView());
  }
}
