import React from 'react';

export default function Register(props) {
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