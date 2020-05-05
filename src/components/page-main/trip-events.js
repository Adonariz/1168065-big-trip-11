import {calcDuration, formatTime24H, getISOStringDate} from "../../helpers/utils";
import {EVENT_TYPE_PREFIX} from "../../helpers/const";
import {createOfferItemTemplate} from "./event-offer";

export const createEventTemplate = (event) => {
  const {date, type, city, price, offers} = event;
  const isoDateTime = getISOStringDate(date.start).slice(0, 16);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${EVENT_TYPE_PREFIX[type]}${city}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${isoDateTime}">${formatTime24H(date.start)}</time>
            &mdash;
            <time class="event__end-time" datetime="${isoDateTime}">${formatTime24H(date.end)}</time>
          </p>
          <p class="event__duration">${calcDuration(date.start, date.end)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offers.map((offer) => createOfferItemTemplate(offer)).join(`\n`)}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
