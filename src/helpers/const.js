const MONTH_NAMES = [
  `JAN`,
  `FEB`,
  `MAR`,
  `APR`,
  `MAY`,
  `JUN`,
  `JUL`,
  `AUG`,
  `SEP`,
  `OCT`,
  `NOV`,
  `DEC`,
];

const CITIES = [`London`, `Berlin`, `Moscow`, `Kiev`, `Paris`, `Amsterdam`, `Oslo`];

const STRINGS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const EventType = {
  TAXI: `taxi`,
  BUS: `bus`,
  TRAIN: `train`,
  SHIP: `ship`,
  TRANSPORT: `transport`,
  DRIVE: `drive`,
  FLIGHT: `flight`,
  CHECK_IN: `check-in`,
  SIGHTSEEING: `sightseeing`,
  RESTAURANT: `restaurant`,
};

const TRANSFER_TYPES = [EventType.TAXI, EventType.BUS, EventType.TRAIN, EventType.SHIP, EventType.TRANSPORT, EventType.DRIVE, EventType.FLIGHT];
const ACTIVITY_TYPES = [EventType.CHECK_IN, EventType.SIGHTSEEING, EventType.RESTAURANT];

const EVENT_TYPE_PREFIX = {
  [EventType.TAXI]: `Taxi to `,
  [EventType.BUS]: `Bus to `,
  [EventType.TRAIN]: `Train to `,
  [EventType.SHIP]: `Ship to `,
  [EventType.TRANSPORT]: `Transport to `,
  [EventType.DRIVE]: `Drive to `,
  [EventType.FLIGHT]: `Flight to `,
  [EventType.CHECK_IN]: `Check-in in `,
  [EventType.SIGHTSEEING]: `Sightseeing in `,
  [EventType.RESTAURANT]: `Restaurant in `
};

const OFFER_NAME = {
  'event-offer-luggage': `Add luggage`,
  'event-offer-comfort': `Switch to comfort class`,
  'event-offer-meal': `Add meal`,
  'event-offer-seats': `Choose seats`,
  'event-offer-train': `Travel by train`
};

const OFFER_PRICE = {
  'event-offer-luggage': 30,
  'event-offer-comfort': 100,
  'event-offer-meal': 15,
  'event-offer-seats': 5,
  'event-offer-train': 40
};

export {MONTH_NAMES, CITIES, STRINGS, TRANSFER_TYPES, ACTIVITY_TYPES, EVENT_TYPE_PREFIX, OFFER_NAME, OFFER_PRICE};
