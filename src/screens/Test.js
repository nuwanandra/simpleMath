// import React, {Component} from 'react';
// import {View, Animated, Easing} from 'react-native';

// class Test extends Component {
//   constructor(props) {
//     super(props);
//     this.spinValue = new Animated.Value(0);
//   }

//   componentDidMount() {
//     Animated.start(
//       Animated.timing(this.spinValue, {
//         toValue: 1,
//         duration: 3000,
//         easing: Easing.linear,
//         useNativeDriver: true,
//       }),
//     ).start(() => {
//       spinValue.setValue(0);
//     });
//   }

//   render() {
//     const spin = this.spinValue.interpolate({
//       inputRange: [0, 1],
//       outputRange: ['0deg', '360deg'],
//     });

//     return (
//       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//         <Animated.Image
//           style={{width: 200, height: 200, transform: [{rotateY: spin}]}}
//           source={require('../assets/male.png')}
//         />
//       </View>
//     );
//   }
// }

// export default Test;

import React, {useRef} from 'react';
import {View, Animated, Easing, TouchableOpacity, Text} from 'react-native';

export default function Test({navigation, route}) {
  const spinValue = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 400,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      spinValue.setValue(0);
    });
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animated.View style={{transform: [{rotateX: spin}]}}>
        <TouchableOpacity onPress={startAnimation}>
          <Text style={{fontSize: 32}}>Rotate me!</Text>
          <View
            style={{backgroundColor: 'pink', width: 200, height: 200}}></View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

// import React, {useState, useEffect} from 'react';
// import {Animated, View, Text, TouchableOpacity} from 'react-native';

// export default function Test({navigation, route}) {
//   const [isShrunk, setIsShrunk] = useState(false);
//   const [animationValue, setAnimationValue] = useState(new Animated.Value(1));

//   useEffect(() => {
//     const duration = 500; // animation duration in milliseconds
//     Animated.timing(animationValue, {
//       toValue: isShrunk ? 0.5 : 1,
//       duration,
//       useNativeDriver: true,
//     }).start();
//   }, [isShrunk, animationValue]);

//   const handlePress = () => {
//     setIsShrunk(true);
//     setTimeout(() => setIsShrunk(false), 200); // delay the expansion by 1 second
//   };

//   return (
//     <Animated.View
//       style={{
//         width: 200,
//         height: 200,
//         backgroundColor: 'pink',
//         transform: [{scale: animationValue}],
//         onPress: {handlePress},
//       }}>
//       {/* <Text onPress={handlePress}>Click me to shrink and expand!</Text> */}
//       <TouchableOpacity onPress={handlePress}></TouchableOpacity>
//     </Animated.View>
//   );
// }

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, {useState, useEffect} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
//   Platform,
//   Modal,
//   TouchableOpacity,
//   Pressable,
//   TouchableHighlight,
//   Linking,
//   Alert,
//   TextInput,
//   Animated,
//   LayoutAnimation,
// } from 'react-native';

// import UserDefineFunc from '../functions/UserDefineFunc ';

// import {RadioButton} from 'react-native-paper';
// import colors from '../config/colorProfile';
// import CustomButton from '../utils/CustomButton';

// //import {maleImagesArray, femaleImagesArray} from '../config/AvatarImages';

// export default function Test({navigation, route}) {
//   //const {UserNamePara, GenderPara} = route.params;
//   //const [gender, setGender] = useState(GenderPara);

//   //const [maleImages, setMaleImages] = useState(new UserDefineFunc().getUserAvatar('Male'));
//   //const [femaleImages, setFemaleImages] = useState(new UserDefineFunc().getUserAvatar('Female'));

//   //const [showView, setShowView] = useState(false);

//   //   const toggleView = () => {
//   //     Animated.timing(opacity, {
//   //       toValue: showView ? 0 : 1,
//   //       duration: 2000,
//   //       useNativeDriver: true,
//   //     }).start(() => setShowView(!showView));
//   //   };

//   //const animationVal = new Animated.Value(0);

//   //const [expanded, setExpanded] = useState(false);

//   //const toggleView = () => {
//   // Animated.timing(animationVal, {
//   //   toValue: 100,
//   //   duration: 2000,
//   //   useNativeDriver: true,
//   // }).start();

//   //.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//   //setExpanded(!expanded);
//   //};

//   const [width, setWidth] = useState(300); // initial width

//   const onPress = () => {
//     // Define the animation configuration
//     const animationConfig1 = LayoutAnimation.create(
//       1000,
//       LayoutAnimation.Types.easeInEaseOut,
//       LayoutAnimation.Properties.opacity,
//     );

//     //LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

//     //setWidth(width === 0 ? 1 : 0);
//     setWidth(10); // desired final width

//     // Animate the layout change
//     LayoutAnimation.configureNext(animationConfig1);

//     const animationConfig2 = LayoutAnimation.create(
//       1000,
//       LayoutAnimation.Types.easeInEaseOut,
//       LayoutAnimation.Properties.opacity,
//     );
//     setWidth(300); // desired final width

//     LayoutAnimation.configureNext(animationConfig2);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={onPress}>
//         <Text>Toggle Position</Text>
//       </TouchableOpacity>

//       <View style={[styles.box, {width: width}]} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   box: {
//     //width: 100,
//     height: 100,
//     backgroundColor: 'blue',
//     position: 'relative',
//   },
// });
