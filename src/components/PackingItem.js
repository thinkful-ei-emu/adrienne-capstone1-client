import React from 'react';
import AppContext from './AppContext';
import config from '../config';
import TokenService from '../services/token_service';

export default class PackingItem extends React.Component {
  static contextType = AppContext;

  state = {
    checked: false,
    isHidden: false
  };

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

  handleSave = event => {
    event.preventDefault();
    const item = {
      id: this.props.id,
      item: event.target['edit-item'].value
    };

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

  handleChecked = event => {
    this.setState({ checked: event.target.checked })
  }

  handleChange() {
    this.setState({ checked: !this.state.checked });
  }


  handleItemVisibility = id => {
    this.setState({ isHidden: !this.state.isHidden })
  }

  renderEditView = () => {
    return (
      <form action='/packing-list' onSubmit={this.handleSave}>
        <input type='text' defaultValue={this.props.item} id='edit-item'  />
        <button type='submit'>Save</button>
        <button onClick={this.handleEdit}>X</button>
      </form>
    )
  }

  renderDefaultView = () => {
    return (
      <>
        <input type="checkbox" onChange={() => this.handleItemVisibility()} />
        <p>{this.props.item}</p>
        <button onClick={() => this.handleEdit(this.props.id)}>Edit</button>
        <button onClick={this.handleDelete}>Delete</button>
      </>
    )
  }

  render() {
    return(
      <AppContext.Consumer>
        {(context) => (
          <li className='item'>
            {this.context.editing === this.props.id ? 
              this.renderEditView() : 
              this.renderDefaultView() }
          </li>
        )}
      </AppContext.Consumer>
    )
  }
}
