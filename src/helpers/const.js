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

const transferTypes = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];
const activityTypes = [`check-in`, `sightseeing`, `restaurant`];

const eventTypes = {
  'taxi': `Taxi to `,
  'bus': `Bus to `,
  'train': `Train to `,
  'ship': `Ship to `,
  'transport': `Transport to `,
  'drive': `Drive to `,
  'flight': `Flight to `,
  'check-in': `Check-in in `,
  'sightseeing': `Sightseeing in `,
  'restaurant': `Restaurant in `
};

const offerItems = {
  'event-offer-luggage': `Add luggage`,
  'event-offer-comfort': `Switch to comfort class`,
  'event-offer-meal': `Add meal`,
  'event-offer-seats': `Choose seats`,
  'event-offer-train': `Travel by train`
};

const offerPrices = {
  'event-offer-luggage': 30,
  'event-offer-comfort': 100,
  'event-offer-meal': 15,
  'event-offer-seats': 5,
  'event-offer-train': 40
};

export {MONTH_NAMES, transferTypes, activityTypes, eventTypes, offerItems, offerPrices};
