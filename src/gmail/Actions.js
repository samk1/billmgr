/**
 * Created by samk on 16/04/2017.
 */
import Dispatcher from '../Dispatcher';
import BillMetadataDispatcher from './BillMetadataDispatcher';
import ActionTypes from './ActionTypes';

export default {
  changeSigninStatus: function (isSignedIn) {
    Dispatcher.dispatch({
      type: ActionTypes.CHANGE_SIGNIN_STATUS,
      isSignedIn
    })
  },

  changeApiStatus: function (apiStatus) {
    Dispatcher.dispatch({
      type: ActionTypes.CHANGE_API_STATUS,
      apiStatus
    })
  },

  searchForBills: function () {
    const gapi = window.gapi;

    const req = gapi.client.gmail.users.messages.list({
      userId: 'me',
      q: 'newer_than:3m subject:account OR subject:invoice'
    });

    req.execute(this.retrieveBills)
  },

  retrieveBills: function (searchResponse) {
    const gapi = window.gapi;

    searchResponse.messages.forEach(function (message) {
      const req = gapi.client.gmail.users.messages.get({
        id: message.id,
        userId: 'me',
        format: 'metadata'
      });

      req.execute(this.receiveBillMetadata);
    });
  },

  storeBillMetadata: function (metadataResponse) {
    // Global dispatch will create a new BillInformationStore if it doesn't exist
    Dispatcher.dispatch({
      type: ActionTypes.RECEIVE_BILL_METADATA_RESPONSE,
      metadataResponse
    });

    // local metadata dispatch will dispatch to the correct BillInformationStore
    BillMetadataDispatcher.dispatch({
      type: ActionTypes.RECEIVE_BILL_METADATA_RESPONSE,
      metadataResponse
    });
  }
}