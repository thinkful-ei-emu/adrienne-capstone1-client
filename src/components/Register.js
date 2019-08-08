import React from 'react';
import AuthApiService from '../auth_service';

export default class Register extends React.Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  handleRegistrationSuccess = user => {
    const { history } = this.props;
    // this is the path to the login page
    // also right now this pushes the users back to the login page, ideally I would want it to log them in after they have created an account, but minor last minute detail
    history.push('/')
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
      this.props.onRegistrationSuccess()
    })
    .catch(error => {
      console.error({error});
    })
  }

  render() {
    return (
      <>
        <form className='loginForm'>
          <div className='username'>
            <label htmlFor='username'>Username:</label>
            <input type='text' id='username' />
            <label htmlFor='password'>Password:</label>
            <input type='password' id='password' />
            <label htmlFor='confirm-pass'>Confirm Password:</label>
            <input type='password' id='confirm-pass' />
            <button type='submit'>Create Account</button>
          </div>
        </form>
      </>
    )
  }
}