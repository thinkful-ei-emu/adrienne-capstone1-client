import React from 'react';
import AppContext from './AppContext';
import PackingItem from './PackingItem';
import config from '../config';
import TokenService from '../services/token_service';

export default class PackingList extends React.Component {
  static contextType = AppContext;

  state = {
    isHidden: false
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/list`, {
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res =>
      (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
    )
      .then(this.context.setPackingList)
      .catch(error => {
        console.error({error});
      })
  }

  handleSubmit = event => {
    event.preventDefault();
    const item = {
      item: event.target['add-item'].value
    };
    fetch(`${config.API_ENDPOINT}/list`, {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(item)
    })
    .then(res => {
      if(!res.ok) {
        return res.json().then(e => Promise.reject(e));
      }
      return res.json();
    })
    .then(item => {
      this.context.addPackingItem(item);
      document.getElementById("packingForm").reset();
    })
    .catch(error => {
      console.error({error});
    })
  }

  handleMakeAllVisible = () => {
    // don't want to toggle, just want to remove hidden property from all items that are currently hidden
    // if toggle, will hide the visible ones instead of keeping them visible
    if(this.state.isHidden === true) {
      this.setState({ isHidden: false });
    }
  }

  render() {
    const { packingList } = this.context;
    const listItems = packingList.map((item, index) => {
      return (
        <PackingItem key={index} item={item.item} id={item.id} />
      );
    });
    return (
      <>
        <h2>Packing List</h2>
        <form action='/packing-list' onSubmit={this.handleSubmit} className='addItemForm' id='packingForm'>
          <label htmlFor='add-item' />
          <input type='text' id='add-item' placeholder='e.g. Phone Charger' />
          <button type='submit'>Add Item</button>
        </form>
        <ul className='packingList'>
          <input type='checkbox' id='show-all' />
          <label htmlFor='show-all'>Show Completed</label>
          {listItems}
        </ul>
      </>
    )
  }
}