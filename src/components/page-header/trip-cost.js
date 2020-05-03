const createTripCostTemplate = (cost) => {
  return (
    `<p class="trip-info__cost">Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost ? cost : 0}</span></p>`
  );
};

export {createTripCostTemplate};
