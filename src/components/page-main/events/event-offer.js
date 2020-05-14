import {OFFER_NAME, OFFER_PRICE} from "../../../helpers/const";

const createOfferCheckboxTemplate = (offer, formCount) => {
  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${offer.name}-${formCount}" type="checkbox" name="${offer}" ${offer.isChecked ? `checked` : ``}>
      <label class="event__offer-label" for="${offer.name}-${formCount}">
        <span class="event__offer-title">${OFFER_NAME[offer.name]}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${OFFER_PRICE[offer.name]}</span>
      </label>
    </div>`
  );
};

const createOfferItemTemplate = (offer) => {
  return (
    `<li class="event__offer">
      <span class="event__offer-title">${OFFER_NAME[offer.name]}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${OFFER_PRICE[offer.name]}</span>
    </li>`
  );
};

export {createOfferCheckboxTemplate, createOfferItemTemplate};
