import React from 'react';
import ReactDOM from 'react-dom';
import PackingItem from '../components/PackingItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PackingItem />, div);
  ReactDOM.unmountComponentAtNode(div);
})