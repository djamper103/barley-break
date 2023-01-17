import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {PuzzleGame} from './components';
import {Provider} from 'react-redux';
import {setupStore} from './redux/store/store';

const store = setupStore();

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <StatusBar backgroundColor={'red'} />
        <PuzzleGame />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
