import {TRANSFER_TYPES, ACTIVITY_TYPES, EVENT_TYPE_PREFIX} from "../../../helpers/const";
import {formatTime24H, getStringDate} from "../../../helpers/utils";
import {createOfferCheckboxTemplate} from "./event-offer";



export const createEventFormTemplate = (event, formCount) => {
  const {date, destination, type, city, price, isFavorite, offers, photos} = event;

  return (
    `<form class="event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${formCount}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${formCount}" type="checkbox">
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              ${TRANSFER_TYPES.map((typeItem) => createEventTypeItemTemplate(typeItem, typeItem === type, formCount)).join(`\n`)}
            </fieldset>
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${ACTIVITY_TYPES.map((typeItem) => createEventTypeItemTemplate(typeItem, typeItem === type, formCount)).join(`\n`)}
            </fieldset>
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${formCount}">
            ${EVENT_TYPE_PREFIX[type]}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${formCount}" type="text" name="event-destination" value="${city}" list="destination-list-${formCount}">
          <datalist id="destination-list-${formCount}">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${formCount}">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-${formCount}" type="text" name="event-start-time" value="${getStringDate(date.start)} ${formatTime24H(date.start)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-${formCount}">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-${formCount}" type="text" name="event-end-time" value="${getStringDate(date.end)} ${formatTime24H(date.end)}">
        </div>
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${formCount}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-${formCount}" type="text" name="event-price" value="${price}">
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <input id="event-favorite-${formCount}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-${formCount}">
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
            ${offers.map((offer) => createOfferCheckboxTemplate(offer, formCount)).join(`\n`)}
          </div>
        </section>
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${photos.map((photo) => createTripPhotoTemplate(photo)).join(`\n`)}
            </div>
          </div>
        </section>
      </section>
    </form>`
  );
};
