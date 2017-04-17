/**
 * Created by samk on 16/04/2017.
 */
import React from 'react';
import Actions from './Actions';

export class GoogleApiLoader extends React.Component {
  componentDidMount () {

    const props = this.props;
    const script = document.createElement('script');

    function initClient() {
      const gapi = window.gapi;
      gapi.client.init({
        clientId: props.clientId,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"],
        scope: 'https://www.googleapis.com/auth/gmail.readonly'
      }).then(function () {
        gapi.auth2.getAuthInstance().isSignedIn.listen(Actions.changeSigninStatus);

        Actions.changeSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        Actions.changeApiStatus('ready');
      })
    }

    script.src = "https://apis.google.com/js/api.js";
    script.async = 1;
    script.defer = 1;

    script.onload = function () {
      this.onload = function () {};
      window.gapi.load('client:auth2', initClient);
      // scrub global gapi
      // window.gapi = {};
    };

    script.onreadystatechange = function () {
      if (this.readyState === 'complete') {
        this.onload();
      }
    };

    window.document.body.appendChild(script);
  }

  render () {
    return null;
  }
}

export class GoogleSigninStatusDisplay extends  React.Component {
  render () {
    if(this.props.isSignedIn === true) {
      return (
        <p>Google Account is signed in</p>
      );
    }
    else if(this.props.isSignedIn === false) {
      return (
        <p>Google Account is not signed in</p>
      );
    }
    else {
      return (
        <p>Google Account signin status is unknown</p>
      );
    }
  }
}