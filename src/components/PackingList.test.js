import React from 'react';
import ReactDOM from 'react-dom';
import PackingList from './PackingList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PackingList />, div);
  ReactDOM.unmountComponentAtNode(div);
})