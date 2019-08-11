import React from 'react';
import AppContext from './AppContext';
import config from '../config';
import TokenService from '../services/token_service';

export default class AccommodationItem extends React.Component {
  static contextType = AppContext;

  handleDelete = event => {
    event.preventDefault();
    const item = {
      id: this.props.id,
      location_name: this.props.location_name,
      address: this.props.address,
      start_date: this.props.start_date,
      end_date: this.props.end_date,
      conf_number : this.props.conf_number,
      rewards: this.props.rewards
    };
    fetch(`${config.API_ENDPOINT}/sleep/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if(!res.ok) 
      return Promise.reject();
      this.context.deleteAccommodationItem(item)
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
      location_name: event.target['edit-name'].value,
      address: event.target['edit-address'].value,
      start_date: event.target['edit-start'].value,
      end_date: event.target['edit-end'].value,
      conf_number: event.target['edit-conf-num'].value,
      rewards: event.target['edit-rewards'].value
    };

    fetch(`${config.API_ENDPOINT}/sleep/${this.props.id}`, {
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
      this.context.updateAccommodationItem(item);
      this.context.isEditing();
    })
    .catch(error => {
      console.error({error});
    })
  }

  renderEditView = () => {
    return (
      <form action='/accommodations' onSubmit={this.handleSave} className='addAccommodationsForm' id='accommodationForm'>
        <label htmlFor='edit-name'>Location Name:</label>
          <input type='text' id='edit-name' defaultValue={this.props.location_name} />
        <label htmlFor='edit-address'>Address:</label>
          <input type='text' id='edit-address' defaultValue={this.props.address} />
        <label htmlFor='edit-start'>Start Date:</label>
          <input type='date' id='edit-start' defaultValue={this.props.start_date} />
        <label htmlFor='edit-end'>End Date:</label>
          <input type='date' id='edit-end' defaultValue={this.props.end_date} />
        <label htmlFor='edit-conf-num'>Confirmation Number:</label>
          <input type='text' id='edit-conf-num' defaultValue={this.props.conf_number} />
        <label htmlFor='edit-rewards'>Rewards Number:</label>
          <input type='text' id='edit-rewards' defaultValue={this.props.rewards} />
        <button type='submit'>Save</button>
        <button onClick={this.handleEdit} className='close-button'>X</button>
      </form> 
    )
  }

  renderDefaultView = () => {
    return (
      <>
        <p>Location Name: {this.props.location_name}</p>
        <p>Address: {this.props.address}</p>
        <p>Start Date: {this.props.start_date}</p>
        <p>End Date: {this.props.end_date}</p>
        <p>Confirmation Number: {this.props.conf_number}</p>
        <p>Rewards: {this.props.rewards}</p>
        <button onClick={() => this.handleEdit(this.props.id)}>Edit</button>
        <button onClick={this.handleDelete}>Delete</button>
      </>
    )
  }

  render() {
    return (
      <AppContext.Consumer>
        {(context) => (
          <li className='accommodation-item'>
            {this.context.editing === this.props.id ?
              this.renderEditView() : 
              this.renderDefaultView() }
          </li>
        )}
      </AppContext.Consumer>
    )
  }
}


