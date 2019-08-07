import React from 'react';
import AppContext from './AppContext';

export default class PackingItem extends React.Component {
  static contextType = AppContext;

  state = {
    checked: false
  }

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
        this.context.deleteItem(item)
    })
    .catch(error => {
      console.error({error});
    })
  }

  handleEdit = event => {
    event.preventDefault();
    console.log('this works');
    this.context.editing = !this.context.editing;
    console.log(this.context.editing);
  }

  handleSave = event => {
    event.preventDefault();
    const item = {
      name: event.target['edit-item'].value
    };

    fetch('http://localhost:8000/api/list', {
      method: 'PATCH',
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
      this.context.updateItem(item);
    })
    .catch(error => {
      console.error({error});
    })
  }

  handleChecked = event => {
    this.setState({ checked: event.target.checked })
  }

  render() {
    console.log(this.props);
    return(
      <AppContext.Consumer>
        {(context) => (
          <li className='item'>
            {/* <><input type='text' defaultValue={this.props.name} id='edit-item' onSubmit={this.handleSave} /><button type='submit'>Save</button></> */}
            {this.context.editing ? (<><input type='text' defaultValue={this.props.item} id='edit-item' onSubmit={this.handleSave} /><button type='submit'>Save</button></>) : (<><input type="checkbox" checked={this.state.checked} onChange={this.handleChecked} /><p>{this.props.item}</p> <button onClick={this.handleEdit}>Edit</button>
            <button onClick={this.handleDelete}>Delete</button></>)}
          </li>
        )}
      </AppContext.Consumer>
    )
  }
}



