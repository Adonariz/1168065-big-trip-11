import {createTripInfoTemplate} from "./components/page-header/trip-info";
import {createTripRouteTemplate} from "./components/page-header/trip-route";
import {createTripCostTemplate} from "./components/page-header/trip-cost";
import {createPageNavigationTemplate} from "./components/page-header/page-navigation";
import {createTripFiltersTemplate} from "./components/page-header/trip-filter";
import {createTripSortingTemplate} from "./components/sorting";
import {createEventFormTemplate} from "./components/event-form";
import {createDaysContainer} from "./components/days-container";
import {createDayTemplate} from "./components/day";
import {createEventsContainer} from "./components/events-container";
import {createEventTemplate} from "./components/event";

const EVENTS_AMOUNT = 3;

const renderComponent = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const tripMain = document.querySelector(`.trip-main`);
const tripEvents = document.querySelector(`.trip-events`);

renderComponent(tripMain, createTripInfoTemplate(), `afterbegin`);

const tripInfoContainer = tripMain.querySelector(`.trip-info`);
const tripControls = tripMain.querySelector(`.trip-controls`);
const [firstTitle, secondTitle] = tripControls.querySelectorAll(`h2`);

renderComponent(tripInfoContainer, createTripRouteTemplate());
renderComponent(tripInfoContainer, createTripCostTemplate());
renderComponent(firstTitle, createPageNavigationTemplate(), `afterend`);
renderComponent(secondTitle, createTripFiltersTemplate(), `afterend`);
renderComponent(tripEvents, createTripSortingTemplate());
renderComponent(tripEvents, createEventFormTemplate());
renderComponent(tripEvents, createDaysContainer());

const daysContainer = tripEvents.querySelector(`.trip-days`);

renderComponent(daysContainer, createDayTemplate());

const day = daysContainer.querySelector(`.day`);

renderComponent(day, createEventsContainer());

const eventsContainer = day.querySelector(`.trip-events__list`);

for (let i = 0; i < EVENTS_AMOUNT; i++) {
  renderComponent(eventsContainer, createEventTemplate());
}
