// index.js

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

// Register the app
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));

// Add the following lines for deep linking
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 });
}
