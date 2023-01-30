import React from 'react';
import {Provider} from 'react-redux';
import {setupStore} from './redux/store/store';
import 'react-native-gesture-handler';
import {NavigationContainerFC} from './navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const store = setupStore();

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainerFC />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
