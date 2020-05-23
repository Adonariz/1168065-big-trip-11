import {remove, render, RenderPosition, replace} from "../utils/render";
import {SortType, groupEventsByDate, sortEvents} from "../utils/sort";
import {ESC_KEY} from "../utils/const";
import TripDayItem from "../components/page-main/days/trip-day-item";
import EventsList from "../components/page-main/events/events-list";
import EventsListItem from "../components/page-main/events/events-list-item";
import EventItem from "../components/page-main/events/event-item";
import EventEdit from "../components/page-main/events/event-edit/event-edit";
import NoEvents from "../components/page-main/events/no-events";
import TripSort from "../components/page-main/trip-sort";
import TripDaysList from "../components/page-main/days/trip-days-list";

const FORM_ID = 1;

// Отрисовка контейнера для группировки по дням
const renderTripDayItem = (tripDaysListComponent, events, dayTimeStamp = null, count = null) => {
  const tripDayItemComponent = new TripDayItem(dayTimeStamp, count);
  const tripDayItem = tripDayItemComponent.getElement();

  render(tripDaysListComponent.getElement(), tripDayItemComponent, RenderPosition.BEFOREEND);

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
