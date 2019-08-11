import React from 'react';
import {Route} from 'react-router-dom';
// ------ Components
import PackingList from './components/PackingList';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import AccommodationList from './components/AccommodationsList';
import AppContext from './components/AppContext';
import TransportationList from './components/TransportationList';
import PrivateOnlyRoute from './components/Utils/PrivateOnlyRoute';
import PublicOnlyRoute from './components/Utils/PublicOnlyRoute';
// ------ CSS
import './App.css';


export default class App extends React.Component {
  state = {
    packingList: [],
    transportationList: [],
    accommodationList: [],
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

  handleAddAccommodationItem = item => {
    this.setState({
      accommodationList: [
        ...this.state.accommodationList,
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

  handleDeleteAccommodationItem = item => {
    const newList = this.state.accommodationList.filter(i => i.id !== item.id);
    this.setState({
      accommodationList: newList
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

  handleUpdateAccommodationItem = item => {
    this.setState({
      accommodationList: this.state.accommodationList.map(i => 
        (i.i !== item.id) ? i: item
      )
    })
  }

  handleIsEditing = id => {
    this.setState({
      editing: id
    })
  }

  setPackingList = packingList => {
    this.setState({ packingList });
  }

  setTransportList = transportationList => {
    this.setState({ transportationList });
  }

  setAccommodationList = accommodationList => {
    this.setState({ accommodationList });
  }

  render() {
    const contextValue = {
      packingList: this.state.packingList,
      transportationList: this.state.transportationList,
      accommodationList: this.state.accommodationList,
      addPackingItem: this.handleAddPackingItem,
      addTransportItem: this.handleAddTransportItem,
      addAccommodationItem: this.handleAddAccommodationItem,
      deletePackingItem: this.handleDeletePackingItem,
      deleteTransportItem: this.handleDeleteTransportItem,
      deleteAccommodationItem: this.handleDeleteAccommodationItem,
      updatePackingItem: this.handleUpdatePackingItem,
      updateTransportItem: this.handleUpdateTransportItem,
      updateAccommodationItem: this.handleUpdateAccommodationItem,
      setPackingList: this.setPackingList,
      setTransportList: this.setTransportList,
      setAccommodationList: this.setAccommodationList,
      isEditing: this.handleIsEditing,
      editing: this.state.editing
    }
    return (
      <div className="App">
          <AppContext.Provider value={contextValue}>
            <header className="App-header">
              <Route path='/' component={Navigation} />
            </header>
            <main className='App_main'>
              <PublicOnlyRoute exact path={'/'} component={Login}/>
              <PublicOnlyRoute path={'/register'} component={Register} />
              <PrivateOnlyRoute path={'/packing-list'} component={PackingList} />
              <PrivateOnlyRoute path={'/transportation'} component={TransportationList} />
              <PrivateOnlyRoute path={'/accommodations'} component={AccommodationList} />
            </main>
          </AppContext.Provider>
      </div>
    );
  }
}