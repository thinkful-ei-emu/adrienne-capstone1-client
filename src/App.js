import React from 'react';
import {Route} from 'react-router-dom';
// ------ Components
import PackingList from './components/PackingList';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import AppContext from './components/AppContext';
import TransportationList from './components/TransportationList';
// ------ CSS
import './App.css';


export default class App extends React.Component {
  // all of these are specifically for packing list, but will need to be more universally used methods for other components
  handleAddItem = item => {
    this.setState({
      packingList: [
        ...this.state.packingList,
        item
      ]
      // transportationList: [
      //   ...this.state.transportationList,
      //   item
      // ]
    })
  }

  handleDeleteItem = item => {
    const newList = this.state.packingList.filter(i => i.id !== item.id);
    this.setState({
      packingList: newList
    })
    // const newList = this.state.transportationList.filter(i => i.id !== item.id);
    // this.setState({
    //   transportationList: newList
    // })
  }

  handleUpdateItem = item => {
    this.setState({
      packingList: this.state.packingList.map(i => 
        (i.id !== item.id) ? i: item
      )
      // transportationList: this.state.transportationList.map(i => 
      //   (i.id !== item.id) ? i: item
      //   )
    })
  }

  state = {
    packingList: [],
    transportationList: [],
    addItem: this.handleAddItem,
    deleteItem: this.handleDeleteItem,
    updateItem: this.handleUpdateItem,
    editing: false
  };

  render() {
    const contextValue = {
      packingList: this.state.packingList,
      transportationList: this.state.transportationList,
      addItem: this.state.addItem,
      deleteItem: this.state.deleteItem,
      updateItem: this.state.updateItem,
      editing: this.state.editing
    }
    return (
      <div className="App">
        <header className="App-header">
          <AppContext.Provider value={contextValue}>
            <Route path='/' component={Navigation} {...this.props} />
            <Route exact path='/' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/packing-list' component={PackingList} {...this.props} />
            <Route path='/transportation' component={TransportationList} />
          </AppContext.Provider>
        </header>
      </div>
    );
  }
}