import React from 'react'
import Navigation from './src/navigation'
import { Provider } from 'react-redux'
import store from './src/redux/store'
import { useEffect, useState, useRef } from 'react'
import messaging from '@react-native-firebase/messaging'
import { AppState } from 'react-native'
// const { getCode, getName } = require('country-list')
import 'expo-dev-client'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
// Global
// TODO: MarginRight Props needs to be fixed
// 5.4.7 expo version
// ~47.0.14 => 47.0.0 expo sdk version
// eas-cli@3.13.3
// Rnanimation => ~2.12.0
const App = () => {
  const appState = useRef(AppState.currentState)
  const [appStateVisible, setAppStateVisible] = useState(appState.current)

  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', (nextAppState) => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === 'active'
  //     ) {
  //       console.log('App has come to the foreground!')
  //     }

  //     appState.current = nextAppState
  //     setAppStateVisible(appState.current)
  //     console.log('AppState', appState.current)
  //   })

  //   return () => {
  //     subscription.remove()
  //   }
  // }, [])

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId:
  //       '210258378338-4vgdnjpg4i9v75fqvq6uvqmvmpjc9hkt.apps.googleusercontent.com',
  //   })

  //   messaging()
  //     .getToken()
  //     .then((token) => {
  //       console.log(token, 'DEVICE_TOKEN')
  //     })

  //   // fxV4ybiTQDm_ZhKTCAYKqV:APA91bFcGOcT4zUDElC_XEeotPpZwTa03BGHUl9q_FVvV1i743jW5_SUYGSRgiw6IMCDs_3GHkgc-UDpKbKd9NaWSRvMJBTEqj0t0yKP5ifL-jOFl8Qi8SzE0tL-HugDR6o0d69xqoZ8

  //   // Quit State
  //   messaging()
  //     .getInitialNotification()
  //     .then((remoteMessage) => {
  //       alert('hitttttttttt!!' + JSON.stringify(remoteMessage))
  //       if (remoteMessage) {
  //         // console.log(
  //         //   'Notification caused app to open from quit state:',
  //         //   remoteMessage.notification
  //         // )
  //         // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
  //       }
  //       // setLoading(false);
  //     })

  //   // Open State
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open
  //   messaging().onNotificationOpenedApp((remoteMessage) => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage
  //     )
  //     // navigation.navigate(remoteMessage.data.type)
  //   })

  //   // Register background handler
  //   messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  //     console.log('Message handled in the background!', remoteMessage)
  //   })

  //   const unsubscribe = messaging().onMessage(async (remoteMessage) => {
  //     console.log('HAMDLED!', remoteMessage)
  //     // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage))
  //   })

  //   return unsubscribe
  // }, [])

  // "./plugins/withDisableForcedDarkModeAndroid.js"

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}

// "./plugins/withDisableForcedDarkModeAndroid.js"

// "preview": {
//   "distribution": "internal"
// },
export default App

// import React, { useEffect, useRef } from 'react';
// import { AppState, View, Text } from 'react-native';

// const App = () => {
//   const appState = useRef(AppState.currentState);

//   useEffect(() => {
//     AppState.addEventListener('change', handleAppStateChange);

//     return () => {
//       AppState.removeEventListener('change', handleAppStateChange);
//     };
//   }, []);

//   const handleAppStateChange = (nextAppState) => {
//     if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
//       // App has come to the foreground from the background or inactive state
//       // Perform your API call here
//       console.log('API call when app is minimized');
//     }

//     appState.current = nextAppState;
//   };

//   return (
//     <View>
//       <Text>My App</Text>
//     </View>
//   );
// };

// export default App;
