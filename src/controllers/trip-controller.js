import {remove, render, RenderPosition} from "../utils/render";
import {SortType, groupPointsByDate, sortPoints} from "../utils/sort";
import TripDayItem from "../components/page-main/days/trip-day-item";
import EventsList from "../components/page-main/events/events-list";
import EventsListItem from "../components/page-main/events/events-list-item";
import NoEvents from "../components/page-main/events/no-events";
import TripSort from "../components/page-main/trip-sort";
import TripDaysList from "../components/page-main/days/trip-days-list";
import PointController, {Mode as PointControllerMode, EmptyPoint} from "./point-controller";

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
    pointController.render(event, PointControllerMode.DEFAULT);

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
  const sortedEvents = sortPoints(events);
  const groupedEvents = groupPointsByDate(sortedEvents);

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
    this._onFilterChange = this._onFilterChange.bind(this);

    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    this._onSortTypeChange();

    const tripSectionFirstChild = this._container.querySelector(`h2`);

    const points = this._pointsModel.getPoints();

    if (points.length === 0) {
      render(tripSectionFirstChild, this._noEventsComponent, RenderPosition.AFTEREND);
      return;
    }

    render(tripSectionFirstChild, this._tripSortComponent, RenderPosition.AFTEREND);
    render(this._container, this._tripDaysListComponent, RenderPosition.BEFOREEND);
    this._renderPoints(points);
  }

  _renderPoints(points) {
    this._showedPointControllers = renderEvents(this._tripDaysListComponent, points, this._onDataChange, this._onViewChange);
  }

  _removePoints() {
    this._showedPointControllers.forEach((pointController) => {
      pointController.destroy();
      pointController = null;
    });

    this._showedPointControllers = [];

    this._tripDaysListComponent.destroy();
  }

  _updatePoints() {
    this._removePoints();
    const filteredPoints = this._pointsModel.getPoints();
    const sortedPoints = sortPoints(filteredPoints, this._tripSortComponent.getSortType());
    this._renderPoints(sortedPoints);
  }

  _onSortTypeChange() {
    this._tripSortComponent.setSortTypeChangeHandler(() => {
      const points = this._pointsModel.getPoints();

      this._removePoints();
      remove(this._tripDaysListComponent);
      render(this._container, this._tripDaysListComponent, RenderPosition.BEFOREEND);

      if (this._tripSortComponent.getSortType() === SortType.DEFAULT) {
        this._renderPoints(points);
      } else {
        const sortedPoints = sortPoints(points, this._tripSortComponent.getSortType());
        this._showedPointControllers = renderTripDayItem(this._tripDaysListComponent, sortedPoints, this._onDataChange, this._onViewChange);
      }
    });
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData === EmptyPoint) {
      this._creatingPoint = null;
      if (newData === null) {
        pointController.destroy();
        this._updatePoints();
      } else {
        this._pointsModel.addPoint(newData);
        pointController.render(newData, PointControllerMode.DEFAULT);

        this._showedPointControllers = [].concat(pointController, this._showedPointControllers);
      }
    } else if (newData === null) {
      this._pointsModel.removePoint(oldData.id);
      this._updatePoints();
    } else {
      const isSuccess = this._pointsModel.updatePoint(oldData.id, newData);

      if (isSuccess) {
        pointController.render(newData);
      }
    }
  }

  _onViewChange() {
    this._showedPointControllers.forEach((pointController) => pointController.setDefaultView());
  }

  _onFilterChange() {
    this._tripSortComponent.rerender();
    this._updatePoints();
  }
}
