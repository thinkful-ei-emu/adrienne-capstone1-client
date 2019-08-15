import React from 'react';
import {Link} from 'react-router-dom';
import AuthApiService from '../services/auth_service';
import TokenService from '../services/token_service';
import '../css/login.css';
import PropTypes from 'prop-types';

export default class Login extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    },
  }

  state = { error: null };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/packing-list';
    history.push(destination);
  }

  handleSubmitJwtAuth = event => {
    event.preventDefault();
    this.setState({ error: null });
    const { username, password } = event.target;
    AuthApiService.postLogin({
      username: username.value,
      password: password.value
    })
      .then(res => {
        username.value = '';
        password.value = '';
        TokenService.saveAuthToken(res.authToken)
        this.handleLoginSuccess();
      })
      .catch(res => {
        console.log(res);
        this.setState({ error: res.error.message });
      })
  }



  render() {
    const { error } = this.state;
    return (
      <>
        <h2>Welcome Traveler!</h2>
        <nav className='login-nav'>
          <Link to='/register' className='navLink'>Create Account</Link>
        </nav>
        <div>
          {error && <p className='error'>{error}</p>}
        </div>
        <form className='loginForm' onSubmit={this.handleSubmitJwtAuth}>
          <div className='username'>
            <label htmlFor='username'>Username: </label>
            <input type='text' id='username' aria-label='Username' aria-required='true' required />
          </div>
          <div className='password'>
            <label htmlFor='password'>Password: </label>
            <input type='password' id='password' aria-label='Password' aria-required='true' required />
          </div>
          <button type='submit'>Login</button>
        </form>
      </>
    )
  }
}

Login.propTypes = {
  history: PropTypes.object
}