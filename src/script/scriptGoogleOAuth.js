//s1.src = 'https://apis.google.com/js/platform.js';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { loginWithGoogleUserAction } from '../auth/actions/authenticationActions';

class GoogleOAuth extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    // TODO: Add google script in the component
    // (function() {
    //   var s1 = document.createElement('script'),
    //     s0 = document.getElementsByTagName('script')[0];
    //   // s1.async = true;
    //   s1.src = 'https://apis.google.com/js/platform.js';
    //   s1.charset = 'UTF-8';
    //   s1.setAttribute('crossorigin', '*');
    //   s0.parentNode.insertBefore(s1, s0);
    // })();
  }
  state = { isLoggedin: false };

  signOutFromGoogle = () => {
    var auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {});
    // auth2.disconnect();
    this.setState({ isLoggedin: false });
  };

  onFailure = () => {
    this.setState({ isLoggedin: false });
    alert('Error on logging with Google');
  };

  onSuccess = googleUser => {
    // Useful data for your client-side scripts:

    var profile = googleUser.getBasicProfile();
    const id = profile.getId();
    const fullName = profile.getName();
    const imageUrl = profile.getImageUrl();
    const Email_Id = profile.getEmail();
    const isGoogle = true;

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;

    const request = {
      id_token,
      Email_Id,
      fullName,
      imageUrl,
      isGoogle
    };
    this.props.loginWithGoogleUserAction(request);
  };

  componentDidMount() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2
        .init({
          client_id:
            '485611124501-i2qh275pt6kht0o00s2kpqkumbbu0rq6.apps.googleusercontent.com'
        })
        .then(() => {
          window.gapi.signin2.render('g-signin2', {
            scope: 'profile email',
            width: 250,
            height: 40,
            longtitle: false,
            theme: 'dark',
            onsuccess: this.onSuccess,
            onfailure: this.onFailure
          });
        });
    });
  }

  render() {
    const { login } = this.props;
    if (login.isLoggedIn) {
      return <Redirect to="dashboard/" />;
    }

    return (
      <>
        <div
          style={{
            marginTop: 40,
            marginLeft: '15%',
            marginRight: '15%'
          }}
          id="g-signin2"
        >
          {' '}
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginWithGoogleUserAction: request => {
      dispatch(loginWithGoogleUserAction(request));
    }
  };
};

const mapStateToProps = state => {
  const {
    authState: { login }
  } = state;
  return {
    login
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleOAuth);
