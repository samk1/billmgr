/**
 * Created by samk on 16/04/2017.
 */
import React from 'react';
import { Container } from 'flux/utils';
import { GoogleApiLoader, GoogleSigninStatusDisplay } from './gmail/Components';
import { Button } from 'react-bootstrap';
import GmailStores from './gmail/Stores';

function getStores() {
  return [
    GmailStores.GoogleSigninStatusStore,
    GmailStores.GoogleApiStatusStore
  ];
}

function calculateState() {
  return {
    isSignedIn: GmailStores.GoogleSigninStatusStore.getState(),
    apiStatus: GmailStores.GoogleApiStatusStore.getState()
  }
}

function view(props) {
  return (
    <div>
      <div className="App-header">a</div>
      <div className="App-setup">
        <GoogleSigninStatusDisplay {...props} />
        <Button
          onClick={() => window.gapi.auth2.getAuthInstance().signIn()}
          disabled={props.apiStatus !== 'ready'}
        >
          Authorise
        </Button>
        <GoogleApiLoader clientId="481284105426-5scltvefbt5k7mk2q858tisun5dl3j55.apps.googleusercontent.com" />
      </div>
    </div>
  )
}

export default Container.createFunctional(view, getStores, calculateState);