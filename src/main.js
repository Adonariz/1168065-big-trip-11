import {groupEventsByDate, sortEventsByDate, render, RenderPosition} from "./helpers/utils";
import TripInfo from "./components/page-header/trip-info";
import TripRoute from "./components/page-header/trip-route";
import TripControls from "./components/page-header/trip-controls";
import TripFilters from "./components/page-header/trip-filters";
import Sort from "./components/page-main/trip-sort";
import DaysList from "./components/page-main/days/trip-days-list";
import DayItem from "./components/page-main/days/trip-day";
import EventsList from "./components/page-main/events/events-list";
import EventsListItem from "./components/page-main/events/events-list-item";
import Event from "./components/page-main/events/event-item";
import EventEdit from "./components/page-main/events/event-edit/event-edit";
import {getRandomEvents} from "./mocks/events";

// Количество моков для рендера
const POINTS_COUNT = 15;
const FORM_ID = 1;

// Получаем отсортированные эвенты
const randomEvents = sortEventsByDate(getRandomEvents(POINTS_COUNT));

const tripMain = document.querySelector(`.trip-main`);
const tripEventsContainer = document.querySelector(`.trip-events`);
const tripEventsContainerChild = tripEventsContainer.querySelector(`h2`);
const tripControls = tripMain.querySelector(`.trip-controls`);

// Рендеринг хэдера
const renderHeader = () => {
  const tripInfoComponent = new TripInfo();
  const tripRouteComponent = new TripRoute();
  const tripControlsComponent = new TripControls();
  const tripFiltersComponent = new TripFilters();

  render(tripMain, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);
  render(tripInfoComponent.getElement(), tripRouteComponent.getElement(), RenderPosition.AFTERBEGIN);
  render(tripControls.querySelector(`h2`), tripControlsComponent.getElement(), RenderPosition.AFTEREND);
  render(tripControls, tripFiltersComponent.getElement(), RenderPosition.BEFOREEND);
};

// Отрисовка контейнера для дней (событий)
const renderTripDaysList = () => {
  const tripSortComponent = new Sort();
  const daysListComponent = new DaysList();

  render(tripEventsContainerChild, tripSortComponent.getElement(), RenderPosition.AFTEREND);
  render(tripEventsContainer, daysListComponent.getElement(), RenderPosition.BEFOREEND);
};

// Отрисовка контейнера для группировки по дням
const renderTripDayItem = (tripDaysList, dayTimeStamp, count, events) => {
  const tripDayItemComponent = new DayItem(dayTimeStamp, count);
  const tripDayItem = tripDayItemComponent.getElement();

  render(tripDaysList, tripDayItem, RenderPosition.BEFOREEND);

  const eventsListElement = new EventsList().getElement();
  render(tripDayItem, eventsListElement, RenderPosition.BEFOREEND);

  const eventsListItemElement = new EventsListItem().getElement();
  render(eventsListElement, eventsListItemElement, RenderPosition.BEFOREEND);

  const eventComponents = events.map((event) => new Event(event));

  renderTripDayEventsItem(eventsListItemElement, eventComponents);
};

const renderTripDayEventsItem = (eventsListItem, eventComponents) => {
  eventComponents.forEach((eventComponent) => {
    const eventElement = eventComponent.getElement();
    const rollUpEventButton = eventElement.querySelector(`.event__rollup-btn`);
    const eventEditElement = new EventEdit(eventComponent.getData(), FORM_ID).getElement();

    const replaceEventToEdit = () => {
      eventsListItem.replaceChild(eventEditElement, eventElement);
    };

    const replaceEditToEvent = () => {
      eventsListItem.replaceChild(eventElement, eventEditElement);
    };

    rollUpEventButton.addEventListener(`click`, replaceEventToEdit);
    eventEditElement.addEventListener(`submit`, replaceEditToEvent);

    render(eventsListItem, eventElement, RenderPosition.BEFOREEND);
  });
};

// Форма редактирования события
// const renderNewEventForm = (event) => {
//   const eventEditComponent = new EventEdit(event, FORM_ID);
//   render(tripEventsContainerChild, eventEditComponent.getElement(), RenderPosition.AFTEREND);
// };

// Отрисовка событий, сгруппированным по дням
const renderDays = (tripDaysList, groupedEvents) => {
  Array.from(groupedEvents.entries()).forEach((groupEvent, index) => {
    const [dayTimeStamp, events] = groupEvent;

    renderTripDayItem(tripDaysList, dayTimeStamp, ++index, events);
  });
};

// Отрисовка событий
const renderEvents = (container, events) => {
  const sortedEvents = sortEventsByDate(events);
  const groupedEvents = groupEventsByDate(sortedEvents);

  renderDays(container, groupedEvents);
};

renderHeader();
// renderNewEventForm(randomEvents[0], FORM_ID);
renderTripDaysList();

const tripDaysList = tripEventsContainer.querySelector(`.trip-days`);

renderEvents(tripDaysList, randomEvents);
