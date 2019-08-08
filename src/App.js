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
  state = {
    packingList: [],
    transportationList: [],
    editing: false
    };

  handleAddPackingItem = item => {
    this.setState({
      packingList: [
        ...this.state.packingList,
        item
      ]
    })
  }

  handleAddTransportItem = item => {
    this.setState({
      transportationList: [
          ...this.state.transportationList,
          item
        ]
    })
  }

  handleDeletePackingItem = item => {
    const newList = this.state.packingList.filter(i => i.id !== item.id);
    this.setState({
      packingList: newList
    })
  }

  handleDeleteTransportItem = item => {
    const newList = this.state.transportationList.filter(i => i.id !== item.id);
    this.setState({
      transportationList: newList
    })
  }

  handleUpdatePackingItem = item => {
    this.setState({
      packingList: this.state.packingList.map(i => 
        (i.id !== item.id) ? i: item
      )
    })
  }

  handleUpdateTransportItem = item => {
    this.setState({
      transportationList: this.state.transportationList.map(i => 
        (i.id !== item.id) ? i: item
        )
    })
  }

  handleIsEditing = () => {
    console.log('made it');
    this.setState({
      editing: !this.state.editing
    })
  }

  setPackingList = packingList => {
    this.setState({ packingList });
  }

  setTranpsortList = transportationList => {
    this.setState({ transportationList });
  }

  render() {
    console.log('editing equals', this.state.editing)
    const contextValue = {
      packingList: this.state.packingList,
      transportationList: this.state.transportationList,
      addPackingItem: this.handleAddPackingItem,
      addTransportItem: this.handleAddTransportItem,
      deletePackingItem: this.handleDeletePackingItem,
      deleteTransportItem: this.handleDeleteTransportItem,
      updatePackingItem: this.handleUpdatePackingItem,
      updateTransportItem: this.handleUpdateTransportItem,
      setPackingList: this.setPackingList,
      setTransportList: this.setTransportList,
      isEditing: this.handleIsEditing,
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