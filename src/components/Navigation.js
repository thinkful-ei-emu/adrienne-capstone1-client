import React from 'react';
import {NavLink} from 'react-router-dom';
import TokenService from '../services/token_service';
import '../css/navigation.css';

export default class Navigation extends React.Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
  }

  // navigation menu renders if user is logged in
  renderNavLinks() {
    return (
      <div className='logged-in'>
        <NavLink to='/packing-list' className='navLink' activeClassName='active'>Packing List</NavLink>
        {' '}
        <NavLink to='/transportation' className='navLink' activeClassName='active'>Transportation</NavLink>
        {' '}
        <NavLink onClick={this.handleLogoutClick} to ='/' className='logoutLink'>Logout</NavLink>
      </div>
    )
  }

  render() {
    return (
      <nav className='nav-bar'>
        <h1>Travel Companion</h1>
        {TokenService.hasAuthToken() ? this.renderNavLinks() : null}
      </nav>
    )
  }
}