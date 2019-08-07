import React from 'react';

const AppContext = React.createContext({
  packingList: [],
  transportationList: [],
  addPackingItem: () => {},
  addTransportItem: () => {},
  deletePackingItem: () => {},
  deleteTransportItem: () => {},
  updatePackingItem: () => {},
  updateTransportItem: () => {}
});

export default AppContext;