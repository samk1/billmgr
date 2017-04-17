/**
 * Created by samk on 17/04/2017.
 */
import { Dispatcher } from 'flux';
import Utils from './Utils';

class BillMetadataDispatcher extends Dispatcher {
  constructor() {
    super();

    this._dispatchMap = new Map();
  }

  mapDispatch(fromAddress, dispatchToken) {
    this._dispatchMap.set(fromAddress, dispatchToken)
  }

  dispatch(metadataResponse) {
    const fromAddress = Utils.getHeaderFromMetadataResponse('from', metadataResponse);
    const dispatchToken = this._dispatchMap.get(fromAddress);
    this._callbacks[dispatchToken](metadataResponse)
  }
}

const dispatcher = new BillMetadataDispatcher();

export default dispatcher;