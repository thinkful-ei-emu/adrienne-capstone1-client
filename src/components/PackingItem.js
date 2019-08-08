import React from 'react';
import AppContext from './AppContext';

export default class PackingItem extends React.Component {
  static contextType = AppContext;

  state = {
    checked: false,
    value: ''
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

  handleEdit = () => {
    console.log(this.state.text);
    this.context.isEditing();
  }


  // var MyCom = React.createClass({
  //   getInitialState: function() {
  //     return {
  //       editing: false,
  //       // ** Initialize "text" property with empty string here
  //       text: ''
  //     }
  //   },
  //   edit: function() {
  //     this.setState({
  //       editing: true
  //     })
  //   },
  //   save: function() {
  //     var val = this.refs.newText.value;
  //     alert(val)
  //     this.setState({
  //       // ** Update "text" property with new value (this fires render() again)
  //       text: val,
  //       editing: false
  //     })
  //   },
  //   renderNormal: function() {
  //     // ** Render "state.text" inside your <p> whether its empty or not...
  //     return (
  //       <div>
  //         <p>{this.state.text}</p>
  //         <button onClick={this.edit}>Edit</button>
  //     </div>
  //     )
  //   },
  //   renderForm: function() {
  //     return (
  //       <div>
  //          <textarea ref="newText" defaultValue="Edit me"></textarea>
  //         <button onClick={this.save}>Save</button>
  //     </div>
  //     )
  //   },
  //   render: function() {
  //     if (this.state.editing) {
  //       return this.renderForm()
// } else {
  // return this.renderNormal()
// }
// }
// })


  handleSave = event => {
    event.preventDefault();
    console.log('this works');
    // const item = {
    //   item: event.target['edit-item'].value
    // };
    // console.log(item);

    // this.setState({
    //   value: this.refs.newInput
    // })
    // this.context.isEditing();

    // fetch('http://localhost:8000/api/list', {
    //   method: 'PATCH',
    //   headers: {'content-type': 'application/json'},
    //   body: JSON.stringify(item)
    // })
    // .then(res => {
    //   if(!res.ok) {
    //     return Promise.reject();
    //   }
    //   return res.json();
    // })
    // .then(item => {
    //   this.context.updateItem(item);
    // })
    // .catch(error => {
    //   console.error({error});
    // })
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
        <button onClick={this.handleEdit}>Edit</button>
        <button onClick={this.handleDelete}>Delete</button>
      </>
    )
  }

  render() {
    return(
      <AppContext.Consumer>
        {(context) => (
          <li className='item'>
            {this.context.editing ? 
              this.renderEditView() : 
              this.renderDefaultView() }
          </li>
        )}
      </AppContext.Consumer>
    )
  }
}
