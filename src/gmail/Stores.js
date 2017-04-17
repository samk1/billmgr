/**
 * Created by samk on 16/04/2017.
 */
import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';
import BillMetadataDispatcher from './BillMetadataDispatcher'
import ActionTypes from './ActionTypes';
import Utils from './Utils';

class GoogleSigninStatusStore extends ReduceStore {
  constructor() {
    super (Dispatcher);
  }

  getInitialState() {
    return undefined; // true, false or ... FILE_NOT_FOUND ;)
  }

  reduce(state, action) {
    switch(action.type) {
      case ActionTypes.CHANGE_SIGNIN_STATUS: {
        return action.isSignedIn;
      }
      default: {
        return state;
      }
    }
  }
}

class GoogleApiStatusStore extends ReduceStore {
  constructor() {
    super (Dispatcher);
  }

  getInitialState() {
    return 'unknown';
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.CHANGE_API_STATUS: {
        return action.apiStatus;
      }
      default: {
        return state;
      }
    }
  }
}

class BillerListStore extends ReduceStore {
  constructor() {
    super (Dispatcher);
  }

  getInitialState() {
    return new Map();
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.RECEIVE_BILL_METADATA_RESPONSE: {
        const fromAddress = Utils.getHeaderFromMetadataResponse('from', action.metadataResponse);

        if(!state.has(fromAddress)) {
          state.set(fromAddress, new BillerStore(fromAddress));
        }

        return state;
      }
    }
  }
}

class BillerInformationStore extends ReduceStore {
  constructor(fromAddress) {
    super(BillMetadataDispatcher);
    BillMetadataDispatcher.mapDispatch(fromAddress, this.getDispatchToken())
  }

  getInitialState() {
    return {
      fromAddress: null,
      terms: []
    }
  }
}

export default {
  GoogleSigninStatusStore: new GoogleSigninStatusStore(),
  GoogleApiStatusStore: new GoogleApiStatusStore(),
  BillMetadataStore: new BillMetadataStore()
}
