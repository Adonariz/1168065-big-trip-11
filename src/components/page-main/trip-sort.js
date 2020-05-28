import {SortType} from "../../utils/sort";
import AbstractSmartComponent from "../abstract-smart-component";

const createTripSortTemplate = () => {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>

      <div class="trip-sort__item  trip-sort__item--event">
        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${SortType.DEFAULT}" checked>
        <label class="trip-sort__btn" for="sort-event">Event</label>
      </div>

      <div class="trip-sort__item  trip-sort__item--time">
        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${SortType.TIME}">
        <label class="trip-sort__btn" for="sort-time">
          Time
          <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
            <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
          </svg>
        </label>
      </div>

      <div class="trip-sort__item  trip-sort__item--price">
        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${SortType.PRICE}">
        <label class="trip-sort__btn" for="sort-price">
          Price
          <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
            <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
          </svg>
        </label>
      </div>

      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};

export default class TripSort extends AbstractSmartComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createTripSortTemplate();
  }

  rerender() {
    super.rerender();
  }

  recoverListeners() {
    this.setSortTypeChangeHandler(this._sortTypeChangeHandler);
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement()
      .addEventListener(`change`, (evt) => {
        evt.preventDefault();

        if (evt.target.tagName !== `INPUT`) {
          return;
        }

        const sortType = evt.target.value;

        if (this._currentSortType === sortType) {
          return;
        }

        this._currentSortType = sortType;

        const daySortItem = this.getElement().querySelector(`.trip-sort__item--day`);

        if (this._currentSortType !== SortType.DEFAULT) {
          daySortItem.textContent = ``;
        } else {
          daySortItem.textContent = `Day`;
        }

        handler(this._currentSortType);
        this._sortTypeChangeHandler = handler;
      });
  }
}
