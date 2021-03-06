import React from 'react';
import AppContext from './AppContext';
import TransportationItem from './TransportationItem';
import config from '../config';
import TokenService from '../services/token_service';
import '../css/transportation.css';
import PropTypes from 'prop-types';

export default class TransportationList extends React.Component {
  static contextType = AppContext;

  state = {
    isHidden: true,
    error: null
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/travel`, {
      headers: { "Authorization": `bearer ${TokenService.getAuthToken()}` }
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
    this.setState({ error: null });
    const item = {
      transport_date: event.target['date'].value,
      transport_time: event.target['time'].value,
      transport_location: event.target['city-from'].value,
      destination: event.target['city-to'].value,
      transport_type: event.target['transport-type'].value,
      transport_number: event.target['travel-number'].value
    };
    fetch(`${config.API_ENDPOINT}/travel`, {
      method: "POST",
      headers: {
        "Authorization": `bearer ${TokenService.getAuthToken()}`,
        "content-type": "application/json"
      },
      body: JSON.stringify(item)
    })
    .then(res => {
      if(!res.ok) {
        return res.json().then((e) => Promise.reject(e));
      }
      return res.json();
    })
    .then(item => {
      this.context.addTransportItem(item);
      document.getElementById('travelForm').reset();
    })
    .catch(res => {
      this.setState({ error: res.error });
    })
  }

  handleFormVisibility = () => {
    this.setState({ isHidden: !this.state.isHidden });
  }

  renderForm = () => {
    return(
      <form action="/transportation" onSubmit={this.handleSubmit} className="add-travel-form" id="travelForm">
        <div>
          <label htmlFor="date" id="date-label">Date: </label>
          <input type="date" id="date" aria-labelledby="date-label" aria-required="true" required />
        </div>
        <div>
          <label htmlFor="time" id="time-label">Time: </label>
          <input type="time" id="time" aria-labelledby="time-label" aria-required="true" required />
        </div>
        <div>
          <label htmlFor="city-from" id="from">From: </label>
          <input type="text" id="city-from" aria-labelledby="from" aria-required="true" required/>
        </div>
        <div>
          <label htmlFor="city-to" id="to">To: </label>
          <input type="text" id="city-to" aria-labelledby="to" aria-required="true" required/>
        </div>
        <div>
          <label htmlFor="transport-type">Type of Transportation: </label>
          <select id="transport-type" name="select">
            <option value="Plane">Plane</option>
            <option value="Train">Train</option>
            <option value="Bus">Bus</option>
            <option value="Car">Car</option>
            <option value="Boat">Boat</option>
          </select>
        </div>
        <div>
        <label htmlFor="travel-number" id="trans_num">Transportation Number: </label>
        <input type="text" id="travel-number" aria-labelledby="trans_num" aria-required="true" required/>
        </div>
        <button className="add-button" type="submit">Add Transportation</button>
        <button className="close-button" onClick={() => this.handleFormVisibility()}>Close</button>
      </form>
    )
  }

  renderButton = () => {
    return (
      <button className="new-transportation" onClick={() => this.handleFormVisibility()}>New Transportation</button>
    )
  }

  handleErrorClose = () => {
    this.setState({ error: null });
  }

  render() {
    const { error } = this.state;
    const { transportationList } = this.context;
    const listItems = transportationList.map((item, index) => {
      return (<TransportationItem key={index} id={item.id} transport_date={item.transport_date} transport_time={item.transport_time} transport_location={item.transport_location} destination={item.destination} transport_type={item.transport_type} transport_number={item.transport_number} />);
    });
    return(
      <>
      <h2>Transportation</h2>
      <div>
        {error && <span className="error">{error}<button className="error-button" onClick={() => this.handleErrorClose()} aria-label="close">X</button></span>}
      </div>
      <>{this.state.isHidden ? this.renderButton() : this.renderForm()}</>
      <ul className="transportList">
        {listItems}
      </ul>
    </>
    )
  }
}

TransportationList.propTypes = {
  history: PropTypes.object
}