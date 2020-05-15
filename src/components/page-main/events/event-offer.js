import {OFFER_NAME, OFFER_PRICE} from "../../../helpers/const";

const createOfferCheckboxTemplate = (offer, formCount) => {
  const checked = `${offer.isChecked ? `checked` : ``}`;
  const offerTitle = OFFER_NAME[offer.name];
  const offerPrice = OFFER_PRICE[offer.name];

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${offer.name}-${formCount}" type="checkbox" name="${offer}" ${checked}>
      <label class="event__offer-label" for="${offer.name}-${formCount}">
        <span class="event__offer-title">${offerTitle}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
      </label>
    </div>`
  );
};

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

export {createOfferCheckboxTemplate, createOfferItemTemplate};
