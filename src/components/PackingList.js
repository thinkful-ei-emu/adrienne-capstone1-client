import React from 'react';

export default function PackingList(props) {
  return (
    // might need to change type later, but right now should not need a class on this
    <>
      <h2>Packing List</h2>
      <form action='#'>
        <label htmlFor='add-item' />
        <input type='text' id='add-item' placeholder='Phone Charger' />
        <button type='submit'>Add Item</button>
      </form>
    </>
  )
}