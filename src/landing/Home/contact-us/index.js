import React, {Component} from 'react';
import './contact-us.css';
import Contact from './contact';
import Forms from './forms';

export default class ContactUs extends Component {
  render() {
    return (
      <div>
        <Contact />
        <Forms />
      </div>
    );
  }
}
