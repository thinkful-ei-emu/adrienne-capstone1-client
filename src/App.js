import React from 'react';
import {Route, Link} from 'react-router-dom';
// ------ Components
import PackingList from './components/PackingList';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  return (
    <div className="App">
      <header className="App-header">
       <Route path='/' component={Navigation} />
       <Route exact path='/' component={Login} />
       <Route path='/register' component={Register} />
       <Route path='/packing-list' component={PackingList} />
      </header>
    </div>
  );
}

export default App;
