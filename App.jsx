import * as React from 'react';
import Main from './src/Main';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {persistor, store} from './src/stores/store';
import {PersistGate} from 'redux-persist/integration/react';
import {useLinkTo} from '@react-navigation/native';

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Main />
          <Toast />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
