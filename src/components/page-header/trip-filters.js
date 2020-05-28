import AbstractSmartComponent from "../abstract-smart-component";
import {FilterType} from "../../utils/const";

const FILTER_NAMES = [FilterType.EVERYTHING, FilterType.FUTURE, FilterType.PAST];

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
    .map((it) => createTripFiltersMarkup(it, it.checked))
    .join(`\n`);

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersMarkup}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class TripFilters extends AbstractSmartComponent {
  constructor() {
    super();

    this._currentFilterType = FilterType.EVERYTHING;
    this._setFilterTypeChangeHandler = null;
  }

  getTemplate() {
    return createTripFiltersTemplate();
  }

  getFilterType() {
    return this._currentFilterType;
  }

  recoverListeners() {
    this.setFilterTypeChangeHandler(this._setFilterTypeChangeHandler);
  }

  rerender() {
    super.rerender();

    this._currentFilterType = FilterType.EVERYTHING;
  }

  setFilterTypeChangeHandler(handler) {
    this._setFilterTypeChangeHandler = handler;

    this.getElement().addEventListener(`change`, (evt) => {
      evt.preventDefault();

      const filterType = evt.target.value;

      if (evt.target.tagName !== `INPUT`
        || this._currentFilterType === filterType) {
        return;
      }

      this._currentFilterType = filterType;

      this._setFilterTypeChangeHandler(this._currentFilterType);
    });
  }
}
