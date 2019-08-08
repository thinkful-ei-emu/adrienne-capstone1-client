import React from 'react';
import AuthApiService from '../services/auth_service';
import { Link } from 'react-router-dom';
 
export default class Register extends React.Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  handleRegistrationSuccess = user => {
    // don't like how this works; want to have it either login user directly or have a message saying they made their account and a button to redirect back to the login page
    const { history } = this.props;
    history.push('/');
  }

  handleSubmit = event => {
    event.preventDefault();
    // right now ignoring confirm password, will look into later
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
    .catch(error => {
      console.error({error});
    })
  }

  render() {
    return (
      <>
        <nav className='login-nav'>
          <Link to='/'>Existing Users</Link>
        </nav>
        <form className='loginForm' onSubmit={this.handleSubmit}>
          <div className='username'>
            <label htmlFor='username'>Username:</label>
            <input type='text' id='username' />
            <label htmlFor='password'>Password:</label>
            <input type='password' id='password' />
            {/* <label htmlFor='confirm-pass'>Confirm Password:</label> */}
            {/* <input type='password' id='confirm-pass' /> */}
            <button type='submit'>Create Account</button>
          </div>
        </form>
      </>
    )
  }
}