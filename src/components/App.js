import React from 'react';
import {Route} from 'react-router-dom';
// ------ Components
import PackingList from './PackingList';
import Navigation from './Navigation';
import Login from './Login';
import Register from './Register';
import AppContext from './AppContext';
import TransportationList from './TransportationList';
import PrivateOnlyRoute from './Utils/PrivateOnlyRoute';
import PublicOnlyRoute from './Utils/PublicOnlyRoute';
import Logo from './logo.png';
// ------ CSS
import '../css/App.css';


export default class App extends React.Component {
  state = {
    packingList: [],
    transportationList: [],
    editing: false,
    error: null
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

  handleIsEditing = id => {
    this.setState({
      editing: id
    })
  }

  setPackingList = packingList => {
    const packingListWithHidden =  packingList.map(item => ({...item, hidden: false}));
    this.setState({ packingList: packingListWithHidden });
  }

  setTransportList = transportationList => {
    this.setState({ transportationList });
  }

  toggleHiddenProperty = id => {
    const newList = [];
    this.state.packingList.forEach((item) => {
      if(item.id === id) {
        item.hidden = !item.hidden;
      }
      return newList.push(item)
    })
    this.setState({packingList: newList})
  }

  render() {
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
      editing: this.state.editing,
      toggleHiddenProperty: this.toggleHiddenProperty,
    }
    return (
      <div className="App">
          <AppContext.Provider value={contextValue}>
            <header className="App-header">
              <h1>
                <img className='nav-logo' src={Logo} alt="Travel Companion Logo" />
                Travel Companion
              </h1>
              <Route path='/' component={Navigation} />
            </header>
            <main className="App_main">
                <PublicOnlyRoute exact path={'/'} component={Login} />
                <PublicOnlyRoute path={'/register'} component={Register} />
                <PrivateOnlyRoute path={'/packing-list'} component={PackingList} />
                <PrivateOnlyRoute path={'/transportation'} component={TransportationList} />
            </main>
          </AppContext.Provider>
      </div>
    );
  }
}