import {
  TRANSFER_TYPES,
  ACTIVITY_TYPES,
  EVENT_TYPE_PREFIX,
  CITIES,
  OFFER_NAME,
  OFFER_PRICE,
  STRINGS,
} from "../../../utils/const";
import {getStringDate, formatTime24H, capFirstLetter} from "../../../utils/common";
import AbstractSmartComponent from "../../abstract-smart-component";
import {eventOffers, getRandomDestination, getRandomOffers} from "../../../mocks/points";
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const createEventTypeItemTemplate = (type, isChecked, id) => {
  const eventTypeString = capFirstLetter(type);
  const checked = `${type}" ${isChecked ? `checked` : ``}`;

  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${checked}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${eventTypeString}</label>
    </div>`
  );
};

const createDestinationItemTemplate = (city) => {
  return (
    `<option value="${city}"></option>`
  );
};

const createOfferCheckboxTemplate = (offer, id) => {
  const checked = `${offer.isChecked ? `checked` : ``}`;
  const offerTitle = OFFER_NAME[offer.name];
  const offerPrice = OFFER_PRICE[offer.name];

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${offer.name}-${id}" type="checkbox" name="${offer}" ${checked}>
      <label class="event__offer-label" for="${offer.name}-${id}">
        <span class="event__offer-title">${offerTitle}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
      </label>
    </div>`
  );
};

const createEventPhotoTemplate = (src) => {
  return (
    `<img class="event__photo" src="${src}" alt="Event photo">`
  );
};

const createEventEditTemplate = (event) => {
  const {id, date, destination, type, city, price, isFavorite, offers, photos} = event;
  const transferTypesFieldsetItems = TRANSFER_TYPES
    .map((typeItem) => createEventTypeItemTemplate(typeItem, typeItem === type, id))
    .join(`\n`);
  const activityTypesFieldsetItems = ACTIVITY_TYPES
    .map((activityItem) => createEventTypeItemTemplate(activityItem, activityItem === type, id))
    .join(`\n`);
  const eventType = EVENT_TYPE_PREFIX[type];
  const destinationItems = CITIES
    .map((destinationItem) => createDestinationItemTemplate(destinationItem))
    .join(`\n`);
  const eventStartTime = `${getStringDate(date.start)} ${formatTime24H(date.start)}`;
  const eventEndTime = `${getStringDate(date.end)} ${formatTime24H(date.end)}`;
  const favorite = `${isFavorite ? `checked` : ``}`;
  const offersCheckboxes = offers.map((offer) => createOfferCheckboxTemplate(offer, id)).join(`\n`);
  const eventPhotos = photos
    .map((photo) => createEventPhotoTemplate(photo))
    .join(`\n`);

  return (
    `<form class="trip-events__item event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              ${transferTypesFieldsetItems}
            </fieldset>
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${activityTypesFieldsetItems}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${id}">
            ${eventType}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${city}" list="destination-list-${id}">
          <datalist id="destination-list-${id}">
            ${destinationItems}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${id}">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${eventStartTime}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-${id}">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${eventEndTime}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${id}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${price}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>

        <input id="event-favorite-${id}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${favorite}>
        <label class="event__favorite-btn" for="event-favorite-${id}">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>

      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${offersCheckboxes}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${eventPhotos}
            </div>
          </div>
        </section>
      </section>
    </form>`
  );
};

const parseFormData = (formData) => {
  return {
    date: {
      start: formData.get(`event-start-time`),
      end: formData.get(`event-end-time`),
    },
    city: formData.get(`event-destination`),
    price: formData.get(`event-price`),
  };
};

export default class EventEdit extends AbstractSmartComponent {
  constructor(event) {
    super();

    this._event = event;
    this._type = event.type;
    this._city = event.city;
    this._placeholder = EVENT_TYPE_PREFIX[this._type];
    this._submitHandler = null;
    this._favoriteButtonHandler = null;
    this._deleteButtonClickHandler = null;

    this._flatpickrStart = null;
    this._flatpickrEnd = null;

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createEventEditTemplate(this._event);
  }

  rerender() {
    super.rerender();

    this.applyFlatpickr();
  }

  getData() {
    const form = this.getElement();
    const formData = new FormData(form);

    return parseFormData(formData);
  }

  removeElement() {
    this.removeFlatpickr();

    super.removeElement();
  }

  setSubmitHandler(handler) {
    this._submitHandler = handler;
    this.getElement()
      .addEventListener(`submit`, this._submitHandler);
  }

  setFavoriteButtonHandler(handler) {
    this._favoriteButtonHandler = handler;
    this.getElement()
      .querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, this._favoriteButtonHandler);
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, handler);

    this._deleteButtonClickHandler = handler;
  }

  recoverListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this._subscribeOnEvents();
  }

  removeFlatpickr() {
    if (this._flatpickrStart) {
      this._flatpickrStart.destroy();
      this._flatpickrStart = null;
    }

    if (this._flatpickrEnd) {
      this._flatpickrEnd.destroy();
      this._flatpickrEnd = null;
    }
  }

  applyFlatpickr() {
    const dateStartInput = this.getElement().querySelector(`[name="event-start-time"]`);
    this._flatpickrStart = flatpickr(dateStartInput, {
      enableTime: true,
      altFormat: `d/m/y H:i`,
      altInput: true,
      [`time_24hr`]: true,
      defaultDate: this._event.date.start,
    });

    const dateEndInput = this.getElement().querySelector(`[name="event-end-time"]`);
    this._flatpickrEnd = flatpickr(dateEndInput, {
      enableTime: true,
      altFormat: `d/m/y H:i`,
      altInput: true,
      [`time_24hr`]: true,
      defaultDate: this._event.date.end,
    });
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__type-list`)
      .addEventListener(`change`, (evt) => {
        this._type = evt.target.value;
        this._placeholder = EVENT_TYPE_PREFIX[this._type];

        const newEvent = Object.assign({}, this._event, {
          type: this._type,
          offers: getRandomOffers(eventOffers),
        });

        this._event = newEvent;

        this.rerender();
      });

    element.querySelector(`.event__input--destination`)
      .addEventListener(`change`, (evt) => {
        this._city = evt.target.value;

        const newEvent = Object.assign({}, this._event, {
          city: this._city,
          destination: getRandomDestination(STRINGS),
        });

        this._event = newEvent;

        this.rerender();
      });
  }
}
