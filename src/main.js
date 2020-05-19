import {groupEventsByDate, sortEventsByDate} from "./helpers/utils";
import {render, RenderPosition, replace} from "./helpers/render";
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
import NoEvents from "./components/page-main/events/no-events";
import {getRandomEvents} from "./mocks/events";
import {ESC_KEY} from "./helpers/const";

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

  render(tripMain, tripInfoComponent, RenderPosition.AFTERBEGIN);
  render(tripInfoComponent.getElement(), tripRouteComponent, RenderPosition.AFTERBEGIN);
  render(tripControls.querySelector(`h2`), tripControlsComponent, RenderPosition.AFTEREND);
  render(tripControls, tripFiltersComponent, RenderPosition.BEFOREEND);
};

// Отрисовка контейнера для дней (событий)
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
    // const eventElement = eventComponent.getElement();
    // const rollUpEventButton = eventElement.querySelector(`.event__rollup-btn`);
    const eventEditComponent = new EventEdit(eventComponent.getData(), FORM_ID);
    // const eventEditElement = eventEditComponent.getElement();

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
const renderNewEventForm = (event) => {
  const eventEditComponent = new EventEdit(event, FORM_ID);
  render(tripEventsContainerChild, eventEditComponent, RenderPosition.AFTEREND);
};

// Отрисовка событий, сгруппированным по дням
const renderDays = (tripDaysList, groupedEvents) => {
  Array.from(groupedEvents.entries()).forEach((groupEvent, index) => {
    const [dayTimeStamp, events] = groupEvent;

    renderTripDayItem(tripDaysList, dayTimeStamp, ++index, events);
  });
};

// Отрисовка событий
const renderNoEventsMessage = () => {
  const noEvents = new NoEvents();

  render(tripEventsContainerChild, noEvents, RenderPosition.AFTEREND);
};

const renderEvents = (container, events) => {
  const sortedEvents = sortEventsByDate(events);
  const groupedEvents = groupEventsByDate(sortedEvents);

  renderDays(container, groupedEvents);
};

const renderPage = (events) => {
  renderHeader();

  if (events.length === 0) {
    renderNoEventsMessage();
    return;
  }

  renderNewEventForm(events[0], FORM_ID);
  renderTripDaysList();

  const tripDaysList = tripEventsContainer.querySelector(`.trip-days`);
  renderEvents(tripDaysList, events);
};

// const emptyEvents = [];

renderPage(randomEvents);
