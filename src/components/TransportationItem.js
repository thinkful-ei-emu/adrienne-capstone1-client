import React from 'react';
import AppContext from './AppContext';
import config from '../config';
import TokenService from '../services/token_service';
import '../css/transportation.css';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class TransportationItem extends React.Component {
  static contextType = AppContext;

  state = {
    error: null
  }

  handleDelete = event => {
    event.preventDefault();
    const item = {
      id: this.props.id,
      transport_date: this.props.transport_date,
      transport_time: this.props.transport_time,
      transport_location: this.props.transport_location,
      destination: this.props.destination,
      transport_type: this.props.type,
      transport_number: this.props.number
    };
    fetch(`${config.API_ENDPOINT}/travel/${item.id}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json' 
      }
    })
    .then(res => {
      if (!res.ok) 
        return Promise.reject();
        this.context.deleteTransportItem(item)
    })
    .catch(error => {
      console.error({error});
    })
  }

  handleEdit = id => {
    this.context.isEditing(id);
  }

  handleSave = event => {
    event.preventDefault();
    const item = {
      id: this.props.id,
      transport_date: event.target['edit-date'].value,
      transport_time: event.target['edit-time'].value,
      transport_location: event.target['edit-location'].value,
      destination: event.target['edit-destination'].value,
      transport_type: event.target['edit-type'].value,
      transport_number: event.target['edit-transport-number'].value
    };

    if(item.transport_location === ' ') {
      return this.setState({ error: 'Invalid Location' });
    }

    if(item.destination === ' ') {
      return this.setState({ error: 'Invalid Destination' });
    }

    if(item.transport_number === ' ') {
      return this.setState({ error: 'Invalid Number' });
    }

    fetch(`${config.API_ENDPOINT}/travel/${this.props.id}`, {
      method: 'PATCH',
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
      this.context.updateTransportItem(item);
      this.context.isEditing();
    })
    .catch(error => {
      console.error({error});
    })
  }  

  renderEditView = () => {
    return (
      <form action='/transportation' className='edit-form' onSubmit={this.handleSave}>
        <div>
          <label htmlFor='edit-date' />
          <input type='date' defaultValue={this.props.transport_date} id='edit-date' aria-label='Date' />
        </div>
        <div>
          <label htmlFor='edit-time' />
          <input type='time' defaultValue={this.props.transport_time} id='edit-time' aria-label='Time' />
        </div>
        <div>
          <label htmlFor='edit-location' />
          <input type='text' defaultValue={this.props.transport_location} id='edit-location' aria-label='From' />
        </div>
        <div>
          <label htmlFor='edit-destination' />
          <input type='text' defaultValue={this.props.destination} id='edit-destination' aria-label='To' />
        </div>
        <div>
          <label htmlFor='edit-type' />
          <select id='edit-type' name='select' aria-label='Transportation Type'>
            <option value='Plane'>Plane</option>
            <option value='Train'>Train</option>
            <option value='Bus'>Bus</option>
            <option value='Car'>Car</option>
            <option value='Boat'>Boat</option>
          </select>
        </div>
        <div>
          <label htmlFor='edit-transport-number' />
          <input type='text' defaultValue={this.props.transport_number} id='edit-transport-number' aria-label='Transportation Number' />
        </div>
        <button type='submit'>Save</button>
        <button onClick={this.handleEdit} aria-label='close'>X</button>
      </form>
    )
  }

  renderDefaultView = () => {
    return (
      <>
        <p>Date: {moment(this.props.transport_date).format('MM/DD/YYYY')}</p>
        <p>Time: {moment(this.props.transport_time, 'HH:mm').format('h:mmA')}</p>
        <p>Location: {this.props.transport_location}</p>
        <p>Destination: {this.props.destination}</p>
        <p>Type: {this.props.transport_type}</p>
        <p>Number: {this.props.transport_number}</p>
        <button onClick={() => this.handleEdit(this.props.id)}>Edit</button>
        <button onClick={this.handleDelete}>Delete</button>
      </>
    )
  }

  handleErrorClose = () => {
    this.setState({ error: null });
  }

  render() {
    const { error } = this.state;
    return(
      <AppContext.Consumer>
        {(context) => (
          <>
          {error && <span className='error'>{error}<button className='errorButton' onClick={() => this.handleErrorClose()} aria-label='close'>X</button></span>}
          <li className='transportation-item'>
            {this.context.editing === this.props.id ? 
              this.renderEditView() : 
              this.renderDefaultView() }
          </li>
          </>
        )}
      </AppContext.Consumer>
    )
  }
}

TransportationItem.propTypes = {
  id: PropTypes.number,
  transport_date: PropTypes.string,
  transport_time: PropTypes.string,
  transport_location: PropTypes.string,
  destination: PropTypes.string,
  transport_type: PropTypes.oneOf(['Plane', 'Train', 'Bus', 'Car', 'Boat']),
  transport_number: PropTypes.string
}