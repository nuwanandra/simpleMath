import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
//import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import React, {useState, useEffect, useLayoutEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Platform,
  Modal,
  TouchableOpacity,
  Pressable,
  TouchableHighlight,
  Linking,
  Alert,
  Settings,
} from 'react-native';

import {IconButton} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//import CustomButton from '../utils/CustomButton';
import colors from '../config/colorProfile';

import TermsAndConditions from './TermsAndConditions';
import Home from './Home';
//import AvatarPage from './AvatarPage';
import Login from './Login';
import Gender from './Gender';
import SettingsPage from './SettingsPage';
import Game01 from './Game01';

//import CallScreen1 from './CallScreen1';

//const drawer = createDrawerNavigator();
const stack = createNativeStackNavigator();

const App = ({navigation, route}) => {
  // useEffect(() => {
  //   getData();
  // }, []);

  // const [userName, setUserName] = useState('');
  // const [gender, setGender] = useState('');

  // const getData = async () => {
  //   try {
  //     console.log('App: Load Called.');
  //     await AsyncStorage.getItem('userData').then(val => {
  //       let userOb = null;
  //       if (val != null && val != '') {
  //         userOb = JSON.parse(val);
  //         //setUser(val);
  //         setUserName(userOb.userName.trim());
  //         setGender(userOb.gender.trim());
  //         //setConfirmed(userOb.confirmed);
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <NavigationContainer>
      <stack.Navigator
        initialRouteName="Simple Math"
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.themeColor1,
          },
          headerTintColor: colors.themeTextColor1,
          headerTitleStyle: {
            fontSize: 25,
          },
        }}>
        <stack.Screen
          name="Login"
          component={Login}
          options={{drawerLabel: 'Login'}}
          //initialParams={{params: route.params}}
        />

        <stack.Screen
          name="Gender"
          component={Gender}
          options={{drawerLabel: 'Gender'}}
          //initialParams={{params: route.params}}
        />

        <stack.Screen
          name="Simple Math"
          component={Home}
          options={{
            drawerLabel: 'Home',
            header: () => null,
            //headerRight: () => (
            // <IconButton
            //   icon="menu"
            //   color="red"
            //   size={30}
            //   onPress={() => console.log('Pressed')}
            // />

            // <IconButton
            //   icon={() => <FontAwesome5 name="bars" size={24} color="#fff" />}
            //   onPress={goSettings}
            // />
            //),
          }}
          initialParams={{UserNamePara: '', GenderPara: ''}}
        />

        <stack.Screen
          name="Settings"
          component={SettingsPage}
          options={{drawerLabel: 'Settings'}}
          initialParams={{UserNamePara: '', GenderPara: ''}}
        />

        <stack.Screen
          name="Terms And Conditions"
          component={TermsAndConditions}
          options={{drawerLabel: 'Terms And Conditions'}}

          //initialParams={{ItemName: user, ItemID: 4}}
        />

        <stack.Screen
          name="Game01"
          component={Game01}
          options={{drawerLabel: 'Game01'}}
          //initialParams={{ItemName: user, ItemID: 1}}
        />

        {/* <drawer.Screen
          name="Terms And Conditions"
          component={TermsAndConditions}
          options={{drawerLabel: 'Terms And Conditions', header: () => null}}
        /> */}
      </stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.backGroundColor1,
    //paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  text: {
    fontSize: 60,
    color: colors.textColor1,
  },
});

export default App;
