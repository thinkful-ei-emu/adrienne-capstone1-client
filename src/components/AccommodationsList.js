import React from 'react';
import AppContext from './AppContext';
import AccommodationItem from './AccommodationsItem';
import config from '../config';
import TokenService from '../services/token_service';

export default class AccommodationList extends React.Component {
  static contextType = AppContext;

  state = {
    isHidden: true,
    error: null
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/sleep`, {
      headers: { 'Authorization': `bearer ${TokenService.getAuthToken()}` }
    })
    .then(res => 
      (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
    )
      .then(this.context.setAccommodationList)
      .catch(error => {
        console.error({error});
      })
  }

  handleSubmit = event => {
    event.preventDefault();
    const item = {
      location_name: event.target['location_name'].value,
      address: event.target['address'].value,
      start_date: event.target['start_date'].value,
      end_date: event.target['end_date'].value,
      conf_number: event.target['conf_num'].value,
      rewards: event.target['rewards'].value
    };
    fetch(`${config.API_ENDPOINT}/sleep`, {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify(item)
    })
    .then(res => {
      if(!res.ok) {
        return Promise.reject();
      }
      return res.json();
    })
    .then(item => {
      this.context.addAccommodationItem(item);
      document.getElementById('accommodationForm').reset();
    })
    .catch(error => {
      console.error({error});
    })
  }

  handleFormVisibility = () => {
    this.setState({ isHidden: !this.state.isHidden });
  }

  renderForm = () => {
    return (
      <form action='/accommodations' onSubmit={this.handleSubmit} className='addAccommodationsForm' id='accommodationForm'>
          <label htmlFor='location_name'>Location Name:</label>
            <input type='text' id='location_name' />
          <label htmlFor='address'>Address:</label>
            <input type='text' id='address' />
          <label htmlFor='start_date'>Start Date:</label>
            <input type='date' id='start_date' />
          <label htmlFor='end_date'>End Date:</label>
            <input type='date' id='end_date' />
          <label htmlFor='conf_num'>Confirmation Number:</label>
            <input type='text' id='conf_num' />
          <label htmlFor='rewards'>Rewards Number:</label>
            <input type='text' id='rewards' />
          <button type='submit'>Add Accommodation</button>
          <button className='close-button' onClick={() => this.handleFormVisibility()}>Close</button>
        </form>
    )
  }

  renderButton = () => {
    return (
      <button onClick={() => this.handleFormVisibility()}>New Accommodation</button>
    )
  }

  render() {
    const { accommodationList } = this.context;
    const listItems = accommodationList.map((item, index) => {
      return (<AccommodationItem key={index} id={item.id} location_name={item.location_name} address={item.address} start_date={item.start_date} end_date={item.end_date} conf_number={item.conf_number} rewards={item.rewards} />);
    })
    return(
      <>
        <h2>Accommodations</h2>
        {this.state.isHidden ? this.renderButton() : this.renderForm()}
        <ul className='accommodationList'>
          {listItems}
        </ul>
      </>
    )
  }
}