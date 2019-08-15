import React from 'react';
import ReactDOM from 'react-dom';
import PrivateOnlyRoute from '../components/Utils/PrivateOnlyRoute';
import {MemoryRouter} from 'react-router-dom';
import PackingList from '../components/PackingList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><PrivateOnlyRoute exact path={'/packing-list'} component={PackingList} /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
})