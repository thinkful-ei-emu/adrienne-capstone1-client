import React from 'react';
import AppContext from './AppContext';
import config from '../config';
import TokenService from '../services/token_service';
import '../css/packing.css';
import PropTypes from 'prop-types';

export default class PackingItem extends React.Component {
  static contextType = AppContext;

  state = {
    error: null
  }

  handleDelete = event => {
    event.preventDefault();
    const item = {
      id: this.props.id,
      item: this.props.name
    };
    fetch(`${config.API_ENDPOINT}/list/${item.id}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json' 
      }
    })
    .then(res => {
      if (!res.ok) 
        return Promise.reject();
        this.context.deletePackingItem(item)
    })
    .catch(error => {
      console.error({error});
    })
  }

  handleEdit = id => {
    this.context.isEditing(id);
  }

  handleToggle = id => {
    this.context.toggleHiddenProperty(id);
  }

  handleSave = event => {
    event.preventDefault();
    
    const item = {
      id: this.props.id,
      item: event.target['edit-item'].value
    };

    if(item.item === ' ') {
      return this.setState({ error: 'Invalid input' });
    }

    fetch(`${config.API_ENDPOINT}/list/${this.props.id}`, {
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
      this.context.updatePackingItem(item);
      this.context.isEditing();
    })
    .catch(error => {
      console.error({error});
    })
  }
  
  renderEditView = () => {
    return (
      <form action='/packing-list' onSubmit={this.handleSave}>
        <input type='text' defaultValue={this.props.item} id='edit-item'  />
        <button type='submit'>Save</button>
        <button onClick={this.handleEdit} aria-label='close'>X</button>
      </form>
    )
  }

  handleCheckboxAccessibility = e => {
    if(e.keyCode === 13) {
      this.handleToggle(this.props.id);
    }
  }
  
  renderDefaultView = () => {
    if(this.props.hidden === true) {
      return null
    } else {
      return (
        <li className='item'>
          <input type="checkbox" onKeyDown={(e) => this.handleCheckboxAccessibility(e)} onChange={() => this.handleToggle(this.props.id)} />
          <span>{this.props.item}</span>
          <button onClick={() => this.handleEdit(this.props.id)}>Edit</button>
          <button onClick={this.handleDelete}>Delete</button>
        </li>
      )
   }
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
            <div>
              {error && <span role='alertdialog' className='error'>{error}<button className='errorButton' onClick={() => this.handleErrorClose()} aria-label='close'>X</button></span>}
             </div>
            {this.context.editing === this.props.id ? 
              this.renderEditView() : 
              this.renderDefaultView() }
          </>
        )}
      </AppContext.Consumer>
    )
  }
}

PackingItem.propTypes = {
  id: PropTypes.number,
  item: PropTypes.string,
  hidden: PropTypes.bool
}