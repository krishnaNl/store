import {Store} from 'redux';
let store: Store<any>;

class StoreProviderService {

  public init(configureStore: any) {
    store = configureStore();
  }

  public getStore(): Store<any> {
    return store;
  }

  public isNetworkConnected = (): boolean => {
    return store.getState().network.isConnected;
  }
}

const storeProviderService = new StoreProviderService();
export { storeProviderService as StoreProviderService};
