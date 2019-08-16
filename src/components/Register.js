import React from 'react';
import AuthApiService from '../services/auth_service';
import {NavLink} from 'react-router-dom';
import '../css/register.css';
import PropTypes from 'prop-types';
 
export default class Register extends React.Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  state = { error: null };

  handleRegistrationSuccess = user => {
    const { history } = this.props;
    history.push('/');
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ error: null });
    const { username, password } = event.target;
    AuthApiService.postUser({
      username: username.value,
      password: password.value
    })
    .then(user => {
      username.value = '';
      password.value = '';
      this.handleRegistrationSuccess()
    })
    .catch(res => {
      this.setState({ error: res.error });
    })
  }

  handleErrorClose = () => {
    this.setState({ error: null });
  }

  render() {
    const { error } = this.state;
    return (
      <>
        <nav className='register-nav'>
          <NavLink to='/' className='navLink'>Existing Users</NavLink>
        </nav>
        <div>
        {error && <span className='error'>{error}<button className='errorButton' onClick={() => this.handleErrorClose()} aria-label='close'>X</button></span>}
        </div>
        <form className='registerForm' onSubmit={this.handleSubmit}>
          <div className='username'>
            <label htmlFor='username'>Username: </label>
            <input type='text' id='username' aria-label='Username' aria-required='true' required/>
          </div>
          <div className='password'>
            <label htmlFor='password'>Password: </label>
            <input type='password' id='password' aria-label='Password' aria-required='true' required/>
          </div>
          <button type='submit'>Create Account</button>
        </form>
      </>
    )
  }
}

Register.propTypes = {
  history: PropTypes.object
}