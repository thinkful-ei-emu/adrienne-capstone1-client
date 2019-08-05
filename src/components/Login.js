import React from 'react';
import {Link} from 'react-router-dom';

export default function Login(props) {
  return (
    <>
      <form className='loginForm'>
        <div className='username'>
          <label htmlFor='username'>Username:</label>
          <input type='text' id='username' />
          <label htmlFor='password'>Password:</label>
          <input type='password' />
          <button type='submit'>Login</button>
          {/* <Link to='/register'>Create Account</Link> */}
        </div>
      </form>
    </>
  )
}