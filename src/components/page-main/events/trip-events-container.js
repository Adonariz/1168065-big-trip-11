export const createEventsContainer = (eventItems = ``) => {
  return (
    `<ul class="trip-events__list">
       ${eventItems}
     </ul>`
  );
};
