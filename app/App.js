
// Imports: Dependencies
import React from 'react';
import { Provider } from 'react-redux';

// Imports: Screens
import Home from './screens/home';

// Imports: Redux Persist Persister
import store from './redux/store/store';

// React Native: App
export default App = () => {
  return (
    // Redux: Global Store
    <Provider store={store}>
        <Home />
    </Provider>
  );
};