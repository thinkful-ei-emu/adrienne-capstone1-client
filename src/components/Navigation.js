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
      <div className="logged-in">
        <NavLink to="/packing-list" className="nav-link" activeClassName="active">Packing List</NavLink>
        <NavLink to="/transportation" className="nav-link" activeClassName="active">Transportation</NavLink>
        <NavLink onClick={this.handleLogoutClick} to ="/" className="logout-link">Logout</NavLink>
      </div>
    )
  }

  render() {
    return (
      <nav className="nav-bar">
        {TokenService.hasAuthToken() ? this.renderNavLinks() : null}
      </nav>
    )
  }
}