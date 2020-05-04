import {createTripInfoTemplate} from "./components/page-header/trip-info";
import {createTripRouteTemplate} from "./components/page-header/trip-route";
import {createTripCostTemplate} from "./components/page-header/trip-cost";
import {createPageNavigationTemplate} from "./components/page-header/page-navigation";
import {createTripFiltersTemplate} from "./components/page-header/trip-filter";
import {createTripSortingTemplate} from "./components/page-main/trip-sort";
import {createEventFormTemplate} from "./components/page-main/trip-event-form";
import {createDaysContainer} from "./components/page-main/trip-days-container";
import {createDayTemplate} from "./components/page-main/trip-days";
import {createEventsContainer} from "./components/page-main/trip-events-container";
import {createEventTemplate} from "./components/page-main/trip-events";
import {getRandomTripEvents} from "./mocks/events";
import {groupEvents} from "./helpers/utils";

const POINTS_COUNT = 15;
const FORM_COUNT = 1;

const getSortingEvents = (events) => {
  return (
    events.slice().sort((a, b) => a.date.start - b.date.start)
  );
};

const randomEvents = getSortingEvents(getRandomTripEvents(POINTS_COUNT));

const renderComponent = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const tripMain = document.querySelector(`.trip-main`);
const tripEventsContainer = document.querySelector(`.trip-events`);
const tripControls = tripMain.querySelector(`.trip-controls`);

const renderTripInfo = () => {
  const tripInfoContainer = tripMain.querySelector(`.trip-info`);
  renderComponent(tripInfoContainer, createTripRouteTemplate());
  renderComponent(tripInfoContainer, createTripCostTemplate());
};

const renderHeader = () => {
  renderComponent(tripMain, createTripInfoTemplate(), `afterbegin`);
  renderTripInfo();
  renderComponent(tripControls.querySelector(`h2`), createPageNavigationTemplate());
  renderComponent(tripControls, createTripFiltersTemplate());
};

const renderTripDaysContainer = () => {
  renderComponent(tripEventsContainer.querySelector(`h2`), createTripSortingTemplate(), `afterend`);
  renderComponent(tripEventsContainer, createDaysContainer());
};

const renderTripDayItem = (container, dayTimeStamp, count, eventsList) => {
  renderComponent(container, createDayTemplate(dayTimeStamp, count, eventsList));
};

const renderTripEventForm = (event) => {
  renderComponent(tripEventsContainer.querySelector(`h2`), createEventFormTemplate(event), `afterend`);
};

const renderDays = (container, groupedEvents) => {
  Array.from(groupedEvents.entries()).forEach((groupEvent, index) => {
    const [dayTimeStamp, events] = groupEvent;

    const eventsTemplate = events.map((event) => createEventTemplate(event)).join(`\n`);
    const eventsContainer = createEventsContainer(eventsTemplate);

    renderTripDayItem(container, dayTimeStamp, ++index, eventsContainer);
  });
};

const renderMain = (events) => {
  const sortedEvents = getSortingEvents(events);
  const groupedEvents = groupEvents(sortedEvents);

  renderTripEventForm(events[0], FORM_COUNT);
  renderTripDaysContainer();

  const tripDaysContainer = tripEventsContainer.querySelector(`.trip-days`);

  renderDays(tripDaysContainer, groupedEvents);
};

renderHeader();
renderMain(randomEvents);
