import React, { Component } from 'react';

export default class Contact extends Component {
  render() {
    return (
      <div className="contact">
        <h1>We'd like to hear from you</h1>
        <p>
          {' '}
          "We're here to help and answer any question you might <br />
          have . We look forward to hear from you."
        </p>
        <div class="wave wave1"></div>
        <div class="wave wave2"></div>
        <div class="wave wave3"></div>
        <div class="wave wave4"></div>
      </div>
    );
  }
}
