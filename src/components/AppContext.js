import React from 'react';

const AppContext = React.createContext({
  packingList: [],
  transportationList: [],
  accommodationList: [],
  addPackingItem: () => {},
  addTransportItem: () => {},
  addAccommodationItem: () => {},
  deletePackingItem: () => {},
  deleteTransportItem: () => {},
  deleteAccommodationItem: () => {},
  updatePackingItem: () => {},
  updateTransportItem: () => {},
  updateAccommodationItem: () => {},
  setPackingList: () => {},
  setTransportList: () => {},
  setAccommodationList: () => {},
  isEditing: () => {},
  editing: false
});

export default AppContext;