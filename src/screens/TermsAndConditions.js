import 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect, useLayoutEffect} from 'react';

import {
  Text,
  View,
  Modal,
  Linking,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import colors from '../config/colorProfile';
import CustomButton from '../utils/CustomButton';

export default function TermsAndConditions({navigation, route}) {
  useEffect(() => {
    getData();
    //deleteData('');
  }, []);

  //const [user, setUser] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState('');

  const getData = async () => {
    try {
      console.log('TearmsAndConditions: Load Called.');
      await AsyncStorage.getItem('userData').then(val => {
        if (val != null && val != '') {
          let userOb = JSON.parse(val);
          //setUser(val);
          setUserName(userOb.userName.trim());
          setGender(userOb.gender.trim());
          setConfirmed(userOb.confirmed);

          // if (userOb.confirmed === true) {
          //   navigation.navigate('Simple Math', {
          //     UserNamePara: userName,
          //     GenderPara: gender,
          //   });
          // }
        }
      });
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

  const confirmFunction = () => {
    setConfirmed(true);
    updateData('confirmed', true);

    // navigation.navigate('Simple Math', {
    //   UserNamePara: userName,
    //   GenderPara: gender,
    //   //AvatarPara: avatar,
    // });

    if (userName.length > 0 && gender.length > 0) {
      navigation.navigate('Simple Math', {
        UserNamePara: userName,
        GenderPara: gender,
        //AvatarPara: avatar,
      });
    } else if (userName.length === 0) {
      navigation.navigate('Login', {
        UserNamePara: userName,
        GenderPara: gender,
      });
    } else if (gender.length === 0) {
      navigation.navigate('Gender', {
        UserNamePara: userName,
        GenderPara: gender,
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.transparentBackgroundColor1,
      }}>
      <View
        id="warnView"
        style={{
          width: 300,
          height: 300,
          backgroundColor: colors.backGroundColor1,
          //borderRadius: 5,
        }}>
        <View
          id="warnTitle"
          style={{
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: colors.textColor1,
            }}>
            Information
          </Text>
        </View>

        <View id="warnContent1" style={{alignItems: 'center'}}>
          <Text style={{padding: 3, color: colors.textColor1}}>
            -No age restriction.
          </Text>
          <Text style={{padding: 3, color: colors.textColor1}}>
            -Any one can play.
          </Text>

          <View
            id="linking"
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              top: 40,
              justifyContent: 'center',
            }}>
            <Text style={{color: colors.textColor1}}>
              By continuing, you agree to our
            </Text>

            <Text
              style={{color: 'blue'}}
              onPress={() =>
                Linking.openURL(
                  'https://wonderful-ground-0d36c2200.2.azurestaticapps.net/simpleMath-eula-en.html',
                )
              }>
              Terms of Services
            </Text>

            <Text style={{color: colors.textColor1}}> and </Text>
            <Text
              style={{color: 'blue'}}
              onPress={() =>
                Linking.openURL(
                  'https://wonderful-ground-0d36c2200.2.azurestaticapps.net/simpleMath-privacy-en.html',
                )
              }>
              Privacy Policy.
            </Text>
          </View>
        </View>

        <View
          id="confirmButton"
          style={{
            bottom: -1,
            position: 'absolute',
            height: 50,
            width: '100%',
            backgroundColor: colors.ThemeColor1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomButton
            title={confirmed === false ? 'CONFIRM' : 'CONFIRMED'}
            //title={'CONFIRM'}
            onPressFunction={confirmFunction}
            radius={0}>
            {' '}
          </CustomButton>
        </View>
      </View>
    </View>
  );
}
