import {createTripInfoTemplate} from "./components/page-header/trip-info";
import {createTripRouteTemplate} from "./components/page-header/trip-route";
import {createTripCostTemplate} from "./components/page-header/trip-cost";
import {createTripControlsTemplate} from "./components/page-header/trip-controls";
import {createTripFiltersTemplate} from "./components/page-header/trip-filters";
import {createTripSortTemplate} from "./components/page-main/trip-sort";
import {createEventFormTemplate} from "./components/page-main/events/trip-event-form";
import {createDaysContainer} from "./components/page-main/days/trip-days-list";
import {createDayTemplate} from "./components/page-main/days/trip-day";
import {createEventsContainer} from "./components/page-main/events/trip-events-container";
import {createEventTemplate} from "./components/page-main/events/trip-events";
import {getRandomTripEvents} from "./mocks/events";
import {groupEvents} from "./helpers/utils";
import {getSortingEvents} from "./helpers/utils";
import {renderComponent} from "./helpers/utils";

// Количество моков для рендера
const POINTS_COUNT = 15;
const FORM_ID = 1;

// Получаем отсортированные эвенты
const randomEvents = getSortingEvents(getRandomTripEvents(POINTS_COUNT));

const tripMain = document.querySelector(`.trip-main`);
const tripEventsContainer = document.querySelector(`.trip-events`);
const tripControls = tripMain.querySelector(`.trip-controls`);

// Информация о поездке
const renderTripInfo = () => {
  const tripInfoContainer = tripMain.querySelector(`.trip-info`);
  renderComponent(tripInfoContainer, createTripRouteTemplate());
  renderComponent(tripInfoContainer, createTripCostTemplate());
};
// Рендеринг хэдера
const renderHeader = () => {
  renderComponent(tripMain, createTripInfoTemplate(), `afterbegin`);
  renderTripInfo();
  renderComponent(tripControls.querySelector(`h2`), createTripControlsTemplate());
  renderComponent(tripControls, createTripFiltersTemplate());
};

// Отрисовка контейнера для дней (событий)
const renderTripDaysContainer = () => {
  renderComponent(tripEventsContainer.querySelector(`h2`), createTripSortTemplate(), `afterend`);
  renderComponent(tripEventsContainer, createDaysContainer());
};

// Отрисовка контейнера для группировки по дням
const renderTripDayItem = (container, dayTimeStamp, count, eventsList) => {
  renderComponent(container, createDayTemplate(dayTimeStamp, count, eventsList));
};

// Форма редактирования события
const renderEventEditForm = (event) => {
  renderComponent(tripEventsContainer.querySelector(`h2`), createEventFormTemplate(event), `afterend`);
};

// Отрисовка событий, сгруппированным по дням
const renderDays = (container, groupedEvents) => {
  Array.from(groupedEvents.entries()).forEach((groupEvent, index) => {
    const [dayTimeStamp, events] = groupEvent;

    const eventsTemplate = events.map((event) => createEventTemplate(event)).join(`\n`);
    const eventsContainer = createEventsContainer(eventsTemplate);

    renderTripDayItem(container, dayTimeStamp, ++index, eventsContainer);
  });
};

// Отрисовка событий
const renderEvents = (container, events) => {
  const sortedEvents = getSortingEvents(events);
  const groupedEvents = groupEvents(sortedEvents);

  renderDays(container, groupedEvents);
};

renderHeader();
renderEventEditForm(randomEvents[0], FORM_ID);
renderTripDaysContainer();

const tripDaysContainer = tripEventsContainer.querySelector(`.trip-days`);

renderEvents(tripDaysContainer, randomEvents);
