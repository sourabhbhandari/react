import React, { Component } from 'react';

class ChatBot extends Component {
  componentDidMount() {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    // let Tawk_API = Tawk_API || {};
    // Tawk_LoadStart = new Date();
    (function() {
      var s1 = document.createElement('script'),
        s0 = document.getElementsByTagName('script')[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/5de7e1ba43be710e1d208fd3/default';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
    // s.innerHTML = "document.write('This is output by document.write()!')";
    // this.instance.appendChild(s);
    document.body.appendChild(s);
  }

  render() {
    return null;
  }
}

export default ChatBot;
