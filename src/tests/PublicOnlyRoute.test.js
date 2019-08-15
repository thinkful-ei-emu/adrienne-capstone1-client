import React from 'react';
import ReactDOM from 'react-dom';
import PublicOnlyRoute from '../components/Utils/PublicOnlyRoute';
import {MemoryRouter} from 'react-router-dom';
import Login from '../components/Login';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><PublicOnlyRoute exact path={'/'} component={Login} /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
})