import React from 'react';
import ReactDOM from 'react-dom';
import TransportationList from '../components/TransportationList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TransportationList />, div);
  ReactDOM.unmountComponentAtNode(div);
})