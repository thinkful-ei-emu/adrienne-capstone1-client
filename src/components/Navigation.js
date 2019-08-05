import React from 'react';
import {Link} from 'react-router-dom';
// ----- Components
import TokenService from '../token_service';

export default class Navigation extends React.Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
  }

  renderRegisterLink() {
    return (
      <div className='logged-out'>
        <Link to='/register'>Create Account</Link>
      </div>
    )
  }

  // navigation menu renders if user is logged in
  renderNavLinks() {
    return (
      <div className='logged-in'>
        <Link to='/packing-list'>Packing List</Link>
      </div>
    )
  }

  render() {
    return (
      <nav className='nav-bar'>
        <h1>
          <Link to='/'>
            <h1>Travel Companion</h1>
          </Link>
        </h1>
        {/* 
            On registration page only want title of app as link and registration create account button to work
            Want to get rid of create account nav link that is there right now
         */}
        {TokenService.hasAuthToken() ? this.renderNavLinks() : this.renderRegisterLink()}
      </nav>
    )
  }
}