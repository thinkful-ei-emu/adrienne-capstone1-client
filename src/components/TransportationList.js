import React from 'react';
import AppContext from './AppContext';
import TransportationItem from './TransportationItem';
import config from '../config';
import TokenService from '../services/token_service';

export default class TransportationList extends React.Component {
  static contextType = AppContext;

  state = {
    isHidden: true,
    error: null
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/travel`, {
      headers: { 'Authorization': `bearer ${TokenService.getAuthToken()}` }
    })
    .then(res =>
      (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json()
    )
      .then(this.context.setTransportList)
      .catch(error => {
        console.error({error});
      })
  }

  handleSubmit = event => {
    event.preventDefault();
    const item = {
      transport_date: event.target['date'].value,
      transport_time: event.target['time'].value,
      transport_location: event.target['city-from'].value,
      destination: event.target['city-to'].value,
      transport_type: event.target['transport-type'].value,
      transport_number: event.target['travel-number'].value
    };
    fetch(`${config.API_ENDPOINT}/travel`, {
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
      this.context.addTransportItem(item);
      document.getElementById('travelForm').reset();
    })
    .catch(error => {
      console.error({error});
    })
    // .catch(res => {
    //   this.setState({ error: res.error });
    // })
  }

  handleFormVisibility = () => {
    this.setState({ isHidden: !this.state.isHidden });
  }

  renderForm = () => {
    return(
      <form action='/transportation' onSubmit={this.handleSubmit} className='addTravelForm' id='travelForm'>
        <label htmlFor='date'>Date:</label>
        <input type='date' id='date' placeholder='MM/DD/YYYY' pattern='^\d{1,2}\/\d{1,2}\/\d{4}$' />
        <label htmlFor='time'>Time:</label>
        <input type='text' id='time' placeholder='--:--AM/PM' pattern='^(1[0-2]|0?[1-9]):([0-5]?[0-9])(●?[AP]M)?$' />
        <label htmlFor='city-from'>From: </label>
        <input type='text' id='city-from' />
        <label htmlFor='city-to'>To: </label>
        <input type='text' id='city-to' />
        <label htmlFor='transport-type'>Type of Transportation:</label>
        <select id='transport-type' name='select'>
          <option value='Plane'>Plane</option>
          <option value='Train'>Train</option>
          <option value='Bus'>Bus</option>
          <option value='Car'>Car</option>
          <option value='Boat'>Boat</option>
        </select>
        <label htmlFor='travel-number'>Transportation Number:</label>
        <input type='text' id='travel-number' />
        <button type='submit'>Add Transportation</button>
        <button className='close-button' onClick={() => this.handleFormVisibility()}>Close</button>
      </form>
    )
  }

  renderButton = () => {
    return (
      <button onClick={() => this.handleFormVisibility()}>New Transportation</button>
    )
  }

  render() {
    const { transportationList } = this.context;
    const listItems = transportationList.map((item, index) => {
      return (<TransportationItem key={index} id={item.id} transport_date={item.transport_date} transport_time={item.transport_time} transport_location={item.transport_location} destination={item.destination} transport_type={item.transport_type} transport_number={item.transport_number} />);
    });
    return(
      <>
        <h2>Transportation</h2>
        {this.state.isHidden ? this.renderButton() : this.renderForm()}
        <ul className='transportList'>
          {listItems}
        </ul>
      </>
    )
  }
}