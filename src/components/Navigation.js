import React from 'react';
import {Link} from 'react-router-dom';
import TokenService from '../services/token_service';

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
        {' '}
        <Link to='/transportation'>Transportation</Link>
        {' '}
        <Link onClick={this.handleLogoutClick} to ='/'>Logout</Link>
      </div>
    )
  }

  render() {
    return (
      <nav className='nav-bar'>
        <h1>Travel Companion</h1>
        {TokenService.hasAuthToken() ? this.renderNavLinks() : this.renderRegisterLink()}
      </nav>
    )
  }
}