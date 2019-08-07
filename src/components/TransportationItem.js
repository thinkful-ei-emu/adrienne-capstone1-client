import React from 'react';
import AppContext from './AppContext';

export default class TransportationItem extends React.Component {
  static contextType = AppContext;

  render() {
    return(
      <AppContext.Consumer>
        {(context) => (
          <li className='transportation-item'>
            <p>Date: {this.props.date}</p>
            <p>Time: {this.props.time}</p>
            <p>Location: {this.props.location}</p>
            <p>Destination: {this.props.destination}</p>
            {/* need to figure out how to get this to work again, maybe look at bookmarks app */}
            <p>Type: {this.props.type}</p>
            <p>Number: {this.props.number}</p>
            <button>Edit</button>
            <button>Delete</button>
          </li>
        )}
      </AppContext.Consumer>
    )
  }
}