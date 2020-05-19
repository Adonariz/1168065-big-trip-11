// Отрисовка контейнера для дней (событий)
import Sort from "../components/page-main/trip-sort";
import DaysList from "../components/page-main/days/trip-days-list";
import {render, RenderPosition, replace} from "../helpers/render";
import DayItem from "../components/page-main/days/trip-day";
import EventsList from "../components/page-main/events/events-list";
import EventsListItem from "../components/page-main/events/events-list-item";
import Event from "../components/page-main/events/event-item";
import EventEdit from "../components/page-main/events/event-edit/event-edit";
import {ESC_KEY} from "../helpers/const";
import {groupEventsByDate, sortEventsByDate} from "../helpers/utils";

const FORM_ID = 1;

const tripEventsContainer = document.querySelector(`.trip-events`);
const tripEventsContainerChild = tripEventsContainer.querySelector(`h2`);

const renderTripDaysList = () => {
  const tripSortComponent = new Sort();
  const daysListComponent = new DaysList();

  render(tripEventsContainerChild, tripSortComponent, RenderPosition.AFTEREND);
  render(tripEventsContainer, daysListComponent, RenderPosition.BEFOREEND);
};

// Отрисовка контейнера для группировки по дням
const renderTripDayItem = (tripDaysList, dayTimeStamp, count, events) => {
  const tripDayItemComponent = new DayItem(dayTimeStamp, count);
  const tripDayItem = tripDayItemComponent.getElement();

  render(tripDaysList, tripDayItemComponent, RenderPosition.BEFOREEND);

  const eventsListComponent = new EventsList();
  render(tripDayItem, eventsListComponent, RenderPosition.BEFOREEND);

  const eventsListItemComponent = new EventsListItem();
  render(eventsListComponent.getElement(), eventsListItemComponent, RenderPosition.BEFOREEND);

  const eventComponents = events.map((event) => new Event(event));

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

// Форма редактирования события
// const renderNewEventForm = (event) => {
//   const eventEditComponent = new EventEdit(event, FORM_ID);
//   render(tripEventsContainerChild, eventEditComponent, RenderPosition.AFTEREND);
// };

// Отрисовка событий, сгруппированным по дням
const renderDays = (tripDaysList, groupedEvents) => {
  Array.from(groupedEvents.entries()).forEach((groupEvent, index) => {
    const [dayTimeStamp, events] = groupEvent;

    renderTripDayItem(tripDaysList, dayTimeStamp, ++index, events);
  });
};

const renderEvents = (container, events) => {
  const sortedEvents = sortEventsByDate(events);
  const groupedEvents = groupEventsByDate(sortedEvents);

  renderDays(container, groupedEvents);
};

export default class TripController {
  render(events) {
    renderTripDaysList();
    const tripDaysList = tripEventsContainer.querySelector(`.trip-days`);
    renderEvents(tripDaysList, events);
  }
}
