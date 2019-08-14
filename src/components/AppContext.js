import React from 'react';

const AppContext = React.createContext({
  packingList: [],
  transportationList: [],
  addPackingItem: () => {},
  addTransportItem: () => {},
  deletePackingItem: () => {},
  deleteTransportItem: () => {},
  updatePackingItem: () => {},
  updateTransportItem: () => {},
  setPackingList: () => {},
  setTransportList: () => {},
  isEditing: () => {},
  editing: false,
  toggleHiddenProperty: () => {}
});

export default AppContext;