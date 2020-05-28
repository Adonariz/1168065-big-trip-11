import {TRANSFER_TYPES, CITIES, STRINGS, ACTIVITY_TYPES, OFFER_NAME} from "../utils/const";

const eventTypes = TRANSFER_TYPES.concat(ACTIVITY_TYPES);
const eventOffers = Object
  .keys(OFFER_NAME)
  .map((item) => {
    return (item = {
      name: item,
      isChecked: Math.random() > 0.5,
    });
  });

const getRandomIntegerNumber = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

const getRandomArrayItem = (array) => {
  return array[getRandomIntegerNumber(0, array.length - 1)];
};

const getRandomStartDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 8);

  targetDate.setDate(targetDate.getDate() + diffValue);
  targetDate.setHours(targetDate.getHours() + getRandomIntegerNumber(0, 23));
  targetDate.setMinutes(targetDate.getMinutes() + getRandomIntegerNumber(0, 59));

  return targetDate;
};

const getRandomEndDate = (startDate) => {
  const randomEndDate = new Date(startDate);
  randomEndDate.setHours(randomEndDate.getHours() + getRandomIntegerNumber(1, 48));
  randomEndDate.setMinutes(randomEndDate.getMinutes() + getRandomIntegerNumber(0, 59));
  return randomEndDate;
};

const getRandomDestination = (strings) => {
  let destinations = [];
  const length = getRandomIntegerNumber(1, 5);
  for (let i = 0; i < length; i++) {
    destinations.push(getRandomArrayItem(strings));
  }
  return destinations.join(` `);
};

const getRandomOffers = (offers) => {
  return offers.slice(getRandomIntegerNumber(0, 5));
};

getRandomOffers(eventOffers);

const getRandomPhoto = () => {
  return (
    `img/photos/${getRandomIntegerNumber(1, 5)}.jpg`
  );
};

const getRandomPhotos = () => {
  let photos = [];
  const length = getRandomIntegerNumber(1, 5);
  for (let i = 0; i < length; i++) {
    photos.push(getRandomPhoto());
  }
  return photos;
};

const getRandomEvent = (index) => {
  const randomDate = getRandomStartDate();
  const randomEndDate = getRandomEndDate(randomDate);

  return {
    id: index,
    date: {
      start: randomDate,
      end: randomEndDate
    },
    type: getRandomArrayItem(eventTypes),
    city: getRandomArrayItem(CITIES),
    price: getRandomIntegerNumber(5, 160),
    isFavorite: Math.random() > 0.5,
    offers: getRandomOffers(eventOffers),
    destination: getRandomDestination(STRINGS),
    photos: getRandomPhotos(),
  };
};

const getRandomPoints = (count) => {
  return new Array(count)
    .fill(``)
    .map((randomEvent, index) => getRandomEvent(++index));
};

export {eventOffers, getRandomOffers, getRandomDestination, getRandomEvent, getRandomPoints};
