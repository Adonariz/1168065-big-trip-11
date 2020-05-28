import {render, RenderPosition} from "./utils/render";
import TripInfo from "./components/page-header/trip-info";
import TripRoute from "./components/page-header/trip-route";
import TripControls from "./components/page-header/trip-controls";
import TripFilters from "./components/page-header/trip-filters";
import TripController from "./controllers/trip-controller";
import PointsModel from "./models/points";
import {getRandomPoints} from "./mocks/points";

// Количество моков для рендера
const POINTS_COUNT = 15;

// Получаем отсортированные эвенты
const randomEvents = getRandomPoints(POINTS_COUNT);

const pointsModel = new PointsModel();
pointsModel.setPoints(randomEvents);

const tripMain = document.querySelector(`.trip-main`);
const tripEventsContainer = document.querySelector(`.trip-events`);
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

const tripController = new TripController(tripEventsContainer, pointsModel);

renderHeader();
tripController.render();

