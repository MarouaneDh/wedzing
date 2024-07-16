import { NavigationContainer } from '@react-navigation/native';

import { ToastProvider } from 'react-native-toast-notifications'

import { Provider } from 'react-redux';
import { store } from './redux/store';
import Navigation from './navigation/Navigation';

const App = () => {
  const linking = {
    prefixes: ["wedz://"],
    config: {
      screens: {
        Register: "register",
      },
    },
  };

  return (
    <ToastProvider>
      <NavigationContainer linking={linking}>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </NavigationContainer>
    </ToastProvider>
  );
};

export default App;
