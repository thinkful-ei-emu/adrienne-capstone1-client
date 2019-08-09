import React from 'react';
import AuthApiService from '../services/auth_service';
import TokenService from '../services/token_service';

export default class Login extends React.Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/packing-list';
    history.push(destination);
  }

  handleSubmitJwtAuth = event => {
    event.preventDefault();
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
      .catch(error => {
        console.error({ error });
      })
  }
  render() {
    return (
      <>
        <h2>Welcome Traveler!</h2>
        <form className='loginForm' onSubmit={this.handleSubmitJwtAuth}>
          <div className='username'>
            <label htmlFor='username'>Username:</label>
            <input type='text' id='username' required />
            <label htmlFor='password'>Password:</label>
            <input type='password' id='password' required />
            <button type='submit'>Login</button>
          </div>
        </form>
      </>
    )
  }
}