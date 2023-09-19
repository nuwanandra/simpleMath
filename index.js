/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/screens/App';
//import App from './src/screens/Test';

import {name as appName} from './app.json';
import Test from './src/screens/Test';

AppRegistry.registerComponent(appName, () => App);
