import React from 'react';
import AppContext from './AppContext';

export default class TransportationItem extends React.Component {
  static contextType = AppContext;

  handleDelete = event => {
    event.preventDefault();
    const item = {
      id: this.props.id,
      transport_date: this.props.transport_date,
      transport_time: this.props.transport_time,
      transport_location: this.props.location,
      destination: this.props.destination,
      transport_type: this.props.type,
      transport_number: this.props.number
    };
    fetch(`http://localhost:8000/api/travel/${item.id}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' }
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

  handleEdit = () => {
    console.log(this.state.text);
    this.context.isEditing();
  }

  renderEditView = () => {
    return (
      <form action='/transportation' onSubmit={this.handleSave}>
        <input type='text' defaultValue={this.props.transport_date} id='edit-date' />
        <input type='text' defaultValue={this.props.transport_time} id='edit-time' />
        <input type='text' defaultValue={this.props.transport_location} id='edit-location' />
        <input type='text' defaultValue={this.props.destination} id='edit-destination' />
        <input type='text' defaultValue={this.props.transport_type} id='edit-type' />
        <input type='text' defaultValue={this.props.transport_number} id='edit-number' />
        <button onClick={this.handleEdit}>X</button>
        <button type='submit'>Save</button>
      </form>
    )
  }

  renderDefaultView = () => {
    return (
      <>
        <p>Date: {this.props.tranpsort_date}</p>
        <p>Time: {this.props.transport_time}</p>
        <p>Location: {this.props.tranpsort_location}</p>
        <p>Destination: {this.props.destination}</p>
        {/* need to figure out how to get this to work again, maybe look at bookmarks app */}
        <p>Type: {this.props.transport_type}</p>
        <p>Number: {this.props.transport_number}</p>
        <button>Edit</button>
        <button>Delete</button>
      </>
    )
  }

  render() {
    return(
      <AppContext.Consumer>
        {(context) => (
          <li className='transportation-item'>
            {this.context.editing ? 
              this.renderEditView() : 
              this.renderDefaultView() }
          </li>
        )}
      </AppContext.Consumer>
    )
  }
}