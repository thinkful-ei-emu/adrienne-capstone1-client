import React from 'react';
import ReactDOM from 'react-dom';
import PrivateOnlyRoute from './PrivateOnlyRoute';
import {MemoryRouter} from 'react-router-dom';

it.skip('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><PrivateOnlyRoute /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
})