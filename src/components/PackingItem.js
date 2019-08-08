import React from 'react';
import AppContext from './AppContext';

export default class PackingItem extends React.Component {
  static contextType = AppContext;

  state = {
    checked: false
  };

  handleDelete = event => {
    event.preventDefault();
    const item = {
      id: this.props.id,
      item: this.props.name
    };
    fetch(`http://localhost:8000/api/list/${item.id}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' }
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

    fetch(`http://localhost:8000/api/list/${this.props.id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
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

  renderEditView = () => {
    return (
      <form action='/packing-list' onSubmit={this.handleSave}>
        <input type='text' defaultValue={this.props.item} id='edit-item'  />
        <button onClick={this.handleEdit}>X</button>
        <button type='submit'>Save</button>
      </form>
    )
  }

  renderDefaultView = () => {
    return (
      <>
        <input type="checkbox" checked={this.state.checked} onChange={this.handleChecked} />
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
