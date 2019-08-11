import React from 'react';
import AppContext from './AppContext';
import config from '../config';
import TokenService from '../services/token_service';

export default class TransportationItem extends React.Component {
  static contextType = AppContext;

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
      <form action='/transportation' onSubmit={this.handleSave} className='editTransportForm'>
        <label htmlFor='edit-date'>Date:</label>
          <input type='text' defaultValue={this.props.transport_date} id='edit-date' />
        <label htmlFor='edit-time'>Time:</label>
          <input type='text' defaultValue={this.props.transport_time} id='edit-time' />
        <label htmlFor='edit-location'>Location:</label>
          <input type='text' defaultValue={this.props.transport_location} id='edit-location' />
        <label htmlFor='edit-destination'>Destination:</label>
          <input type='text' defaultValue={this.props.destination} id='edit-destination' />
        <label htmlFor='edit-type'>Type:</label>
          <select id='edit-type' name='select'>
            <option value='Plane'>Plane</option>
            <option value='Train'>Train</option>
            <option value='Bus'>Bus</option>
            <option value='Car'>Car</option>
            <option value='Boat'>Boat</option>
          </select>
        <label htmlFor='edit-transport-number'>Number:</label>
          <input type='text' defaultValue={this.props.transport_number} id='edit-transport-number' />
        <button type='submit'>Save</button>
        <button onClick={this.handleEdit}>X</button>
      </form>
    )
  }

  renderDefaultView = () => {
    return (
      <>
        <p>Date: {this.props.transport_date}</p>
        <p>Time: {this.props.transport_time}</p>
        <p>Location: {this.props.transport_location}</p>
        <p>Destination: {this.props.destination}</p>
        <p>Type: {this.props.transport_type}</p>
        <p>Number: {this.props.transport_number}</p>
        <button onClick={() => this.handleEdit(this.props.id)}>Edit</button>
        <button onClick={this.handleDelete}>Delete</button>
      </>
    )
  }

  render() {
    return(
      <AppContext.Consumer>
        {(context) => (
          <li className='transportation-item'>
            {this.context.editing === this.props.id ? 
              this.renderEditView() : 
              this.renderDefaultView() }
          </li>
        )}
      </AppContext.Consumer>
    )
  }
}