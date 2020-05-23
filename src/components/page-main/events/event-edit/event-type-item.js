import {capFirstLetter} from "../../../../utils/common";

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

export {createEventTypeItemTemplate};
