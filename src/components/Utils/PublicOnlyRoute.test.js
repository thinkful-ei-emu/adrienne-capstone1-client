import React from 'react';
import ReactDOM from 'react-dom';
import PublicOnlyRoute from './PublicOnlyRoute';
import {MemoryRouter} from 'react-router-dom';

it.skip('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><PublicOnlyRoute /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
})