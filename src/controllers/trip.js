import {render, RenderPosition, replace} from "../helpers/render";
import TripDayItem from "../components/page-main/days/trip-day-item";
import EventsList from "../components/page-main/events/events-list";
import EventsListItem from "../components/page-main/events/events-list-item";
import EventItem from "../components/page-main/events/event-item";
import EventEdit from "../components/page-main/events/event-edit/event-edit";
import {ESC_KEY, SortType} from "../helpers/const";
import {groupEventsByDate} from "../helpers/utils";
import NoEvents from "../components/page-main/events/no-events";
import TripSort from "../components/page-main/trip-sort";
import TripDaysList from "../components/page-main/days/trip-days-list";

const FORM_ID = 1;

const getSortedEvents = (events, sortType) => {
  let sortedEvents = [];
  const showingEvents = events.slice();

  switch (sortType) {
    case SortType.DEFAULT:
      sortedEvents = showingEvents.sort((a, b) => a.date.start - b.date.start);
      break;

    default:
      sortedEvents = showingEvents.sort((a, b) => a.date.start - b.date.start);
      break;
  }

  return sortedEvents;
};

// Отрисовка контейнера для группировки по дням
const renderTripDayItem = (tripDaysList, events, dayTimeStamp = null, count = null) => {
  const tripDayItemComponent = new TripDayItem(dayTimeStamp, count);
  const tripDayItem = tripDayItemComponent.getElement();

  render(tripDaysList, tripDayItemComponent, RenderPosition.BEFOREEND);

  const eventsListComponent = new EventsList();
  render(tripDayItem, eventsListComponent, RenderPosition.BEFOREEND);

  const eventsListItemComponent = new EventsListItem();
  render(eventsListComponent.getElement(), eventsListItemComponent, RenderPosition.BEFOREEND);

  const eventComponents = events.map((event) => new EventItem(event));

  renderTripDayEventsItem(eventsListItemComponent.getElement(), eventComponents);
};

const renderTripDayEventsItem = (eventsListItem, eventComponents) => {
  eventComponents.forEach((eventComponent) => {
    const eventEditComponent = new EventEdit(eventComponent.getData(), FORM_ID);

    const replaceEventToEdit = () => {
      replace(eventEditComponent, eventComponent);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === ESC_KEY) {
        replaceEditToEvent();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const replaceEditToEvent = () => {
      replace(eventComponent, eventEditComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    eventComponent.setEditButtonClickHandler(replaceEventToEdit);
    eventEditComponent.setSubmitHandler(replaceEditToEvent);

    render(eventsListItem, eventComponent, RenderPosition.BEFOREEND);
  });
};

// Отрисовка событий, сгруппированным по дням
const renderDays = (tripDaysList, groupedEvents) => {
  Array.from(groupedEvents.entries()).forEach((groupEvent, index) => {
    const [dayTimeStamp, events] = groupEvent;

    renderTripDayItem(tripDaysList, events, dayTimeStamp, ++index);
  });
};

const renderEvents = (container, events) => {
  const sortedEvents = getSortedEvents(events);
  const groupedEvents = groupEventsByDate(sortedEvents);

  renderDays(container, groupedEvents);
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._noEventsComponent = new NoEvents();
    this._tripSortComponent = new TripSort();
    this._tripDaysListComponent = new TripDaysList();
  }

  render(events) {
    if (events.length === 0) {
      render(this._container.querySelector(`h2`), this._noEventsComponent, RenderPosition.AFTEREND);
      return;
    }

    this._tripSortComponent.setSortTypeChangeHandler();
    render(this._container.querySelector(`h2`), this._tripSortComponent, RenderPosition.AFTEREND);
    render(this._container, this._tripDaysListComponent, RenderPosition.BEFOREEND);
    renderEvents(this._tripDaysListComponent.getElement(), events);
  }
}
