import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from './AppContext';
import TransportationItem from './TransportationItem';

export default class TransportationList extends React.Component {
  static contextType = AppContext;

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
    fetch('http://localhost:8000/api/travel', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
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
    })
    .catch(error => {
      console.error({error});
    })
  }

  render() {
    const { transportationList } = this.context;
    console.log(this.context);
    const listItems = transportationList.map((item, index) => {
      console.log(item);
      return (<TransportationItem key={index} id={item.id} transport_date={item.transport_date} transport_time={item.transport_time} transport_location={item.tranpsort_location} destination={item.destination} transport_type={item.transport_type} transport_number={item.transport_number} />);
    });
    return(
      <>
      <h2>Transportation</h2>
      <nav className='nav-menu'>
        <Link to='/'>Logout</Link>
        {' '}
        <Link to='/packing-list'>Packing List</Link>
      </nav>
      <button>New Transportation</button>
      <form action='/transportation' onSubmit={this.handleSubmit} className='addTravelForm'>
        <label htmlFor='date'>Date:</label>
        <input type='text' id='date' placeholder='MM/DD/YYYY' />
        {/* pattern='(?:(?:0[1-9]|1[0-2])[\/\\-. ]?(?:0[1-9]|[12][0-9])|(?:(?:0[13-9]|1[0-2])[\/\\-. ]?30)|(?:(?:0[13578]|1[02])[\/\\-. ]?31))[\/\\-. ]?(?:19|20)[0-9]{2}' */}
        <label htmlFor='time'>Time:</label>
        <input type='text' id='time' placeholder='--:--AM/PM' />
        {/* pattern='^(1[0-2]|0?[1-9]):([0-5]?[0-9])(●?[AP]M)?$' */}
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
        <label htmlFor='travel-number'>Transportation Number</label>
        <input type='text' id='travel-number' />
        <button className='close-button'>Close</button>
        <button type='submit'>Add Transportation</button>
      </form>
      <ul className='transportList'>
        {listItems}
      </ul>
    </>
    )
  }
}