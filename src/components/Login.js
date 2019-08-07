import React from 'react';
import {Link} from 'react-router-dom';

export default function Login(props) {
  return (
    <>
      <nav className='login-nav'>
        <Link to='/register'>Create Account</Link>
      </nav>
      <form className='loginForm'>
        <div className='username'>
          <label htmlFor='username'>Username:</label>
          <input type='text' id='username' />
          <label htmlFor='password'>Password:</label>
          <input type='password' />
          <button type='submit'>Login</button>
        </div>
      </form>
    </>
  )
}