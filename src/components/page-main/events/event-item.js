import {calcDuration, formatTime24H, getISOStringDate} from "../../../utils/common";
import {EVENT_TYPE_PREFIX, OFFER_NAME, OFFER_PRICE} from "../../../utils/const";
import AbstractComponent from "../../abstract-component";

const createOfferItemTemplate = (offer) => {
  const offerTitle = OFFER_NAME[offer.name];
  const offerPrice = OFFER_PRICE[offer.name];

  return (
    `<li class="event__offer">
      <span class="event__offer-title">${offerTitle}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
    </li>`
  );
};

const createEventTemplate = (event) => {
  const {date, type, city, price, offers} = event;
  const eventType = EVENT_TYPE_PREFIX[type];
  const duration = calcDuration(date.start, date.end);
  const isoDateTimeStart = getISOStringDate(date.start).slice(0, 16);
  const isoDateTimeEnd = getISOStringDate(date.end).slice(0, 16);
  const dateTimeStart24H = formatTime24H(date.start);
  const dateTimeEnd24H = formatTime24H(date.end);
  const selectedOffers = offers
    .map((offer) => createOfferItemTemplate(offer))
    .join(`\n`);

  return (
    `<div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>

        <h3 class="event__title">${eventType}${city}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${isoDateTimeStart}">${dateTimeStart24H}</time>
            &mdash;
            <time class="event__end-time" datetime="${isoDateTimeEnd}">${dateTimeEnd24H}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${selectedOffers}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>`
  );
};

export default class EventItem extends AbstractComponent {
  constructor(event) {
    super();

    this._event = event;
  }

  getTemplate() {
    return createEventTemplate(this._event);
  }

  getData() {
    return this._event;
  }

  setEditButtonClickHandler(handler) {
    this.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}
