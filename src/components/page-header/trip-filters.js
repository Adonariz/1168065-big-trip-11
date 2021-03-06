import AbstractComponent from "../abstract-component";

const FILTER_NAMES = [`everything`, `future`, `past`];

const createTripFiltersMarkup = (name, isChecked) => {
  const checked = `${isChecked ? `checked` : ``}`;

  return (
    `<div class="trip-filters__filter">
        <input
          id="filter-${name}"
          class="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="${name}"
          ${checked}
        />
        <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
      </div>`
  );
};

const createTripFiltersTemplate = () => {
  const filtersMarkup = FILTER_NAMES
    .map((it, i) => createTripFiltersMarkup(it, i === 0))
    .join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersMarkup}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class TripFilters extends AbstractComponent {
  getTemplate() {
    return createTripFiltersTemplate();
  }
}
