import {sortEventsByDate} from "./helpers/utils";
import {render, RenderPosition} from "./helpers/render";
import TripInfo from "./components/page-header/trip-info";
import TripRoute from "./components/page-header/trip-route";
import TripControls from "./components/page-header/trip-controls";
import TripFilters from "./components/page-header/trip-filters";
import NoEvents from "./components/page-main/events/no-events";
import {getRandomEvents} from "./mocks/events";
import TripController from "./controllers/trip";
import Sort from "./components/page-main/trip-sort";
import DaysList from "./components/page-main/days/trip-days-list";

// Количество моков для рендера
const POINTS_COUNT = 15;

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

// Отрисовка сообщения при отсутствии событий
const renderNoEventsMessage = () => {
  const noEvents = new NoEvents();

  render(tripEventsContainerChild, noEvents, RenderPosition.AFTEREND);
};

// Форма редактирования события
// const renderNewEventForm = (event) => {
//   const eventEditComponent = new EventEdit(event, FORM_ID);
//   render(tripEventsContainerChild, eventEditComponent, RenderPosition.AFTEREND);
// };

const renderPage = (events) => {
  renderHeader();

  if (events.length === 0) {
    renderNoEventsMessage();
    return;
  }

  const tripSortComponent = new Sort();
  const daysListComponent = new DaysList();

  render(tripEventsContainerChild, tripSortComponent, RenderPosition.AFTEREND);
  render(tripEventsContainer, daysListComponent, RenderPosition.BEFOREEND);

  const tripDaysList = daysListComponent.getElement();

  const tripController = new TripController(tripDaysList);
  tripController.render(events);
};

// const emptyEvents = [];

renderPage(randomEvents);
