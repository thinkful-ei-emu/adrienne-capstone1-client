import React from 'react';
import {Link} from 'react-router-dom';
import AppContext from './AppContext';
import PackingItem from './PackingItem';

export default class PackingList extends React.Component {
  static contextType = AppContext;

  handleSubmit = event => {
    event.preventDefault();
    const item = {
      item: event.target['add-item'].value
    };
    console.log(item);
    fetch('http://localhost:8000/api/list', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(item)
    })
    .then(res => {
      if(!res.ok) {
        return res.json().then(e => Promise.reject(e));
      }
      return res.json();
    })
    .then(item => {
      this.context.addItem(item);
    })
    .catch(error => {
      console.error({error});
    })
  }

  render() {
    const { packingList } = this.context;
    const listItems = packingList.map((item, index) => {
      console.log(item);
      return (
        <PackingItem key={index} item={item.item} id={item.id} />
      );
    });
    return (
      <>
        <h2>Packing List</h2>
        <nav className='nav-menu'>
          {/* <Link to='/'>Logout</Link> */}
          {/* <Link to='/transportation'>Transportation</Link> */}
        </nav>
        <form action='/packing-list' onSubmit={this.handleSubmit} className='addItemForm'>
          <label htmlFor='add-item' />
          <input type='text' id='add-item' placeholder='e.g. Phone Charger' />
          <button type='submit'>Add Item</button>
        </form>
        <ul className='packingList'>
          {listItems}
        </ul>
      </>
    )
  }
}