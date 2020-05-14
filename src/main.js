import {groupEventsByDate, sortEventsByDate, render, RenderPosition} from "./helpers/utils";
import TripInfo from "./components/page-header/trip-info";
import TripRoute from "./components/page-header/trip-route";
import TripControls from "./components/page-header/trip-controls";
import TripFilters from "./components/page-header/trip-filters";
import Sort from "./components/page-main/trip-sort";
import DaysList from "./components/page-main/days/trip-days-list";
import DayItem from "./components/page-main/days/trip-day";
import EventsList from "./components/page-main/events/events-list";
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

  render(tripEventsContainer.querySelector(`h2`), tripSortComponent.getElement(), RenderPosition.AFTEREND);
  render(tripEventsContainer, daysListComponent.getElement(), RenderPosition.BEFOREEND);
};

// Отрисовка контейнера для группировки по дням
const renderTripDayItem = (daysListComponent, dayTimeStamp, count, eventItems) => {
  const tripDayItemComponent = new DayItem(dayTimeStamp, count);
  const tripDayItem = tripDayItemComponent.getElement();

  render(daysListComponent, tripDayItem, RenderPosition.BEFOREEND);

  const eventsListComponent = new EventsList();
  const eventsList = eventsListComponent.getElement();
  render(tripDayItem, eventsListComponent.getElement(), RenderPosition.BEFOREEND);

  eventItems.forEach((event) => {
    render(eventsList, event.getElement(), RenderPosition.BEFOREEND);
  });
};

// Форма редактирования события
const renderEventEditForm = (event) => {
  const eventEditComponent = new EventEdit(event, FORM_ID);
  render(tripEventsContainer.querySelector(`h2`), eventEditComponent.getElement(), RenderPosition.AFTEREND);
};

// Отрисовка событий, сгруппированным по дням
const renderDays = (container, groupedEvents) => {
  Array.from(groupedEvents.entries()).forEach((groupEvent, index) => {
    const [dayTimeStamp, events] = groupEvent;

    const eventItems = events.map((event) => new Event(event));

    renderTripDayItem(container, dayTimeStamp, ++index, eventItems);
  });
};

// Отрисовка событий
const renderEvents = (container, events) => {
  const sortedEvents = sortEventsByDate(events);
  const groupedEvents = groupEventsByDate(sortedEvents);

  renderDays(container, groupedEvents);
};

renderHeader();
renderEventEditForm(randomEvents[0], FORM_ID);
renderTripDaysList();

const tripDaysList = tripEventsContainer.querySelector(`.trip-days`);

renderEvents(tripDaysList, randomEvents);
