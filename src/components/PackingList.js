import React from 'react';
import AppContext from './AppContext';
import PackingItem from './PackingItem';
import config from '../config';
import TokenService from '../services/token_service';
import '../css/packing.css';
import PropTypes from 'prop-types';

export default class PackingList extends React.Component {
  static contextType = AppContext;

  state = {
    error: null,
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
    this.setState({ error: null });
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
    .catch(res => {
      this.setState({error: res.error});
    })
  }

  handleErrorClose = () => {
    this.setState({ error: null });
  }

  render() {
    const { error } = this.state;
    const { packingList } = this.context;
    const listItems = packingList.map((item, index) => {
      return (
        <PackingItem key={index} item={item.item} id={item.id} hidden={item.hidden} />
      );
    });
    return (
      <>
        <h2>Packing List</h2>
        <div>
          {error && <span className='error'>{error}<button className='errorButton' onClick={() => this.handleErrorClose()} aria-label='close'>X</button></span>}
        </div>
        <form action='/packing-list' onSubmit={this.handleSubmit} className='addItemForm' id='packingForm'>
          <label htmlFor='add-item' />
          <input type='text' id='add-item' placeholder='e.g. Phone Charger' aria-label='Packing List Item' aria-required='true' required />
          <button type='submit'>Add Item</button>
        </form>
        <ul className='packingList'>
          {/* <input type='checkbox' id='show-all' onClick={this.handleMakeAllVisible()} />
          <label htmlFor='show-all'>Show Completed</label> */}
          {listItems}
        </ul>
      </>
    )
  }
}

PackingList.propTypes = {
  history: PropTypes.object
}