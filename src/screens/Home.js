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
  TextInput,
  Image,
} from 'react-native';

import {IconButton} from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import UserDefineFunc from '../functions/UserDefineFunc ';

import {RadioButton} from 'react-native-paper';
import colors from '../config/colorProfile';
import CustomButton from '../utils/CustomButton';

//import {maleImagesArray, femaleImagesArray} from '../config/AvatarImages';

export default function Home({navigation, route}) {
  useLayoutEffect(() => {
    getData();
    //deleteData('');
  });

  const {UserNamePara, GenderPara} = route.params;
  const [userName, setUserName] = useState(UserNamePara);
  const [gender, setGender] = useState(GenderPara);
  const [level, setLevel] = useState('2');
  const [operationCount, setOperationCount] = useState('4');

  const getData = async () => {
    try {
      console.log('Home: Load Called.');
      await AsyncStorage.getItem('userData').then(val => {
        let userOb = null;
        if (val != null && val != '') {
          userOb = JSON.parse(val);
          //setUser(val);
          setUserName(userOb.userName.trim());
          setGender(userOb.gender.trim());
          setLevel(userOb.level);
          setOperationCount(userOb.operationCount);

          //setConfirmed(userOb.confirmed);
        } else {
          userOb = {
            userName: '',
            gender: '',
            //operandArray: ['x', '/', '-', '+'],
            operationCount: '4', //1,2,3,4=Random
            level: '2', // [1=Simple,2=Average,3=Hard]
            dateFirstOpen: new Date().toLocaleDateString(),
            confirmed: false,
          };

          //setUser(JSON.stringify(userOb));
        }

        if (userOb.confirmed === false) {
          AsyncStorage.setItem('userData', JSON.stringify(userOb));
          navigation.navigate('Terms And Conditions', {
            UserNamePara: '',
            GenderPara: '',
          });
        } else if (userOb.userName.trim().length === 0) {
          navigation.navigate('Login', {
            UserNamePara: userName,
            GenderPara: gender,
          });
        } else if (userOb.gender.trim().length === 0) {
          navigation.navigate('Gender', {
            UserNamePara: userName,
            GenderPara: gender,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async itemName => {
    try {
      if (itemName.trim().length > 0) {
        await AsyncStorage.removeItem(itemName);
      } else {
        await AsyncStorage.clear();
      }

      Alert.alert('Successful', 'AsyncStorage Cleared.');
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async (name, value) => {
    if (value === null) {
      console.log(
        'Login:updateData : Warning!' + {name} + ' value is empty or null',
      );
    } else {
      try {
        let user = {
          [name]: value,
        };

        await AsyncStorage.mergeItem('userData', JSON.stringify(user));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const goSettings = () => {
    //Alert.alert('Clicked');

    navigation.navigate('Settings', {
      UserNamePara: userName,
      GenderPara: gender,
    });
  };

  const startGame = () => {
    //Alert.alert('Clicked');
    navigation.navigate('Game01', {
      UserNamePara: userName,
      GenderPara: gender,
      levelPara: level,
      operationCountPara: operationCount,
    });
  };

  return (
    <SafeAreaView
      style={{
        //paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? 0 : 0,
      }}>
      <StatusBar hidden={true}></StatusBar>

      <View
        id="Header"
        style={{
          backgroundColor: colors.themeColor1,
          flexDirection: 'row',
          height: 60,
          //justifyContent: 'left',
          alignItems: 'center',
          width: '100%',
        }}>
        <Text
          style={{
            color: colors.themeTextColor1,
            //fontWeight: 'normal',
            fontSize: 24,
            marginLeft: 20,
          }}>
          Simple Math
        </Text>

        <IconButton
          style={{position: 'absolute', right: 0}}
          icon={() => (
            <FontAwesome5
              name="wrench"
              size={24}
              color={colors.themeTextColor1}
            />
          )}
          onPress={goSettings}
        />
      </View>

      <View style={{flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
        <Text style={{fontSize: 26, color: colors.textColor1}}>
          Welcome {userName}
        </Text>
        <Image
          source={
            gender === 'Male'
              ? require('../assets/male.png')
              : require('../assets/female.png')
          }
          style={{
            width: 60,
            height: 60,
            //borderRadius: 40,
            //borderWidth: 5,
            borderColor: colors.themeColor1,
            position: 'relative',
          }}></Image>
      </View>

      <TouchableOpacity
        style={{
          height: 250,
          width: 300,
          backgroundColor: '#454545',
          margin: 30,
          alignItems: 'center',
          borderRadius: 30,
          borderWidth: 10,
          borderColor: '#CFD2CF',
        }}
        onPress={startGame}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 40, marginTop: 10, color: colors.textColor2}}>
            Game : Mix
          </Text>
          <Text style={{fontSize: 60, color: colors.textColor2}}>+ -</Text>
          <Text style={{fontSize: 60, color: colors.textColor2}}> x /</Text>
        </View>
      </TouchableOpacity>

      <View style={{marginTop: 30, alignItems: 'center'}}>
        <Text
          style={{fontSize: 24, fontWeight: 'bold', color: colors.textColor1}}>
          Why Simple Math?
        </Text>
        <Text style={{fontSize: 24, color: colors.textColor1}}>
          {' '}
          Easy and simple
        </Text>
        <Text style={{fontSize: 24, color: colors.textColor1}}>
          {' '}
          Improve your memory
        </Text>
        <Text style={{fontSize: 24, color: colors.textColor1}}>
          {' '}
          Keep active your brain functions
        </Text>
        <Text style={{fontSize: 24, color: colors.textColor1}}>
          {' '}
          Use 10 minutes a day...
        </Text>
      </View>
    </SafeAreaView>
  );
}
