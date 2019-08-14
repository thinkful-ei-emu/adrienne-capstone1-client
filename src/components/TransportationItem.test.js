import React from 'react';
import ReactDOM from 'react-dom';
import TransportationItem from './TransportationItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TransportationItem />, div);
  ReactDOM.unmountComponentAtNode(div);
})