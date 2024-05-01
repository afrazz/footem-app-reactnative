/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import OnboardingScreen from '../screens/Onboarding'
import LoginScreen from '../screens/Auth/LoginScreen'
import RegisterScreen from '../screens/Auth/RegisterScreen'
import { HomeTabNavigation } from './TabNavigation'
import OnBoardFollowLeaguesScreen from '../screens/OnboardFollowLeagues'
// import Icon from 'react-native-paper/src/components/Icon'
import LeagueDetails from '../screens/LeagueDetails'
import NewsDetailsScreen from '../screens/NewsDetails'
import TeamDetails from '../screens/TeamDetails'
import { useSelector } from 'react-redux'
import { StackActions, useNavigation, useRoute } from '@react-navigation/native'
import OnBoardFollowTeamsScreen from '../screens/OnboardFollowTeams'
import SelectCompetition from '../screens/SelectCompetition'
import SelectTeam from '../screens/SelectTeams'
import PlayerProfile from '../screens/PlayerProfile'
import SelectLanguage from '../screens/SelectLanguage'
import FollowSettingsPage from '../screens/Settings/FollowSettings/FollowSettingsPage'
import dynamicLinks from '@react-native-firebase/dynamic-links'
import { parseQueryParams } from '../utils/functions'
import FixtureDetails from '../screens/FixtureDetails'
import messaging from '@react-native-firebase/messaging'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Platform } from 'react-native'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import {
  expoNotificationConfig,
  registerForPushNotificationsAsync,
} from '../config/expoNotificationConfig'
import VideoPlayer from '../screens/VideoPlayer'

const MainStackNavigation = () => {
  const Stack = createNativeStackNavigator()
  // const  = useSelector(state => state.news)
  const navigation = useNavigation()

  // Notifications.setNotificationHandler({
  //   handleNotification: async () => ({
  //     shouldShowAlert: true,
  //     shouldPlaySound: false,
  //     shouldSetBadge: false,
  //   }),
  // })
  expoNotificationConfig()

  const { isNewUser, user, isFirstLaunch } = useSelector((state) => state.auth)

  // EXPO NOTIFICATION
  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    registerForPushNotificationsAsync()

    // notificationListener.current =
    //   Notifications.addNotificationReceivedListener((notification) => {
    //     alert('hey')
    //     setNotification(notification)
    //   })

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data
        navigation.navigate('NewsDetails', data)
      })

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        )
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current)
      }
    }
  }, [])

  // -----------------EXPO NOTIFICATION

  // const route = useRoute()

  // useEffect(() => {
  //   // New Changes Will Apply Here
  //   if (isNewUser && user?._id) {
  //     navigation.dispatch(StackActions.replace('SelectLanguage'))
  //   } else if (!isNewUser && user?._id) {
  //     navigation.dispatch(StackActions.replace('Home'))
  //   }
  // }, [])

  // const handleDeepLinking = () => {
  const handleLinks = async (link) => {
    if (link?.url) {
      let url = link.url
      console.log(url, 'keikei')
      const queryParams = parseQueryParams(url)

      console.log('link: ', queryParams)
      navigation.navigate('NewsDetails', queryParams)
    }
  }
  //   return null
  // }

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleLinks)
    return () => unsubscribe
  }, [])

  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then((link) => {
        handleLinks(link)
      })
  }, [])

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '210258378338-4vgdnjpg4i9v75fqvq6uvqmvmpjc9hkt.apps.googleusercontent.com',
    })

    messaging()
      .getToken()
      .then((token) => {
        console.log(token, 'DEVICE_TOKEN')
      })

    // fxV4ybiTQDm_ZhKTCAYKqV:APA91bFcGOcT4zUDElC_XEeotPpZwTa03BGHUl9q_FVvV1i743jW5_SUYGSRgiw6IMCDs_3GHkgc-UDpKbKd9NaWSRvMJBTEqj0t0yKP5ifL-jOFl8Qi8SzE0tL-HugDR6o0d69xqoZ8

    // Quit State
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        // alert('hitttttttttt!!' + JSON.stringify(remoteMessage))
        if (remoteMessage) {
          navigation.navigate('NewsDetails', {
            languageId: remoteMessage.data.language,
            newsId: remoteMessage.data.newsId,
          })
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
      })

    // Open State
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp((remoteMessage) => {
      navigation.navigate('NewsDetails', {
        languageId: remoteMessage.data.language,
        newsId: remoteMessage.data.newsId,
      })
      // navigation.navigate(remoteMessage.data.type)
    })

    // Register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage)
    })

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('HAMDLED!', remoteMessage)
      // Create notification content
      if (
        remoteMessage?.notification?.title ||
        remoteMessage?.notification?.body
      ) {
        const notificationContent = {
          title: remoteMessage.notification.title,
          body: remoteMessage.notification.body,
          data: remoteMessage.data,
        }

        // Schedule and display the notification immediately
        await Notifications.scheduleNotificationAsync({
          content: notificationContent,
          trigger: null,
        })
      }

      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage))
    })

    return unsubscribe
  }, [])

  // const getInitialRoute = () => {
  //   if(isFirstLaunch === true) {
  //     return 'Login'
  //   } else if (isNewUser && user?._id) {

  //   }
  // }

  return (
    <Stack.Navigator
      // initialRouteName={isFirstLaunch === true && !user?._id && 'Login'}
      // initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isFirstLaunch ? (
        <>
          {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}

          {/* Other Main Screens */}
          {/* <Stack.Screen
            name="OnBoardFollowLeaguesScreen"
            component={OnBoardFollowLeaguesScreen}
          /> */}
          {/* <Stack.Screen name="SelectLanguage" component={SelectLanguage} /> */}
          {/* <Stack.Screen
            name="OnBoardFollowTeamsScreen"
            component={OnBoardFollowTeamsScreen}
          /> */}

          <Stack.Screen name="Home" component={HomeTabNavigation} />

          <Stack.Screen
            name="TeamDetails"
            component={TeamDetails}
            options={{
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            }}
          />

          <Stack.Screen
            name="FixtureDetails"
            component={FixtureDetails}
            options={{
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="LeagueDetails"
            component={LeagueDetails}
            options={{
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            }}
          />

          <Stack.Screen
            name="NewsDetails"
            component={NewsDetailsScreen}
            options={{
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="SelectCompetition"
            component={SelectCompetition}
            options={{
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="SelectTeam"
            component={SelectTeam}
            options={{
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="PlayerProfile"
            component={PlayerProfile}
            options={{
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            }}
          />

          <Stack.Screen
            name="SettingsFollowing"
            component={FollowSettingsPage}
            options={{
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="VideoPlayer"
            component={VideoPlayer}
            options={{
              presentation: 'modal',
              animationTypeForReplace: 'push',
              animation: 'slide_from_right',
            }}
          />
        </>
      ) : (
        <>
          {/* <Stack.Screen name="Onboarding" component={OnboardingScreen} /> */}
          <Stack.Screen name="Login" component={LoginScreen} />
          {/* {isNewUser && (
            <> */}
          <Stack.Screen name="SelectLanguage" component={SelectLanguage} />
          {/* <Stack.Screen
            name="OnBoardFollowLeaguesScreen"
            component={OnBoardFollowLeaguesScreen}
          /> */}
          <Stack.Screen
            name="OnBoardFollowTeamsScreen"
            component={OnBoardFollowTeamsScreen}
          />
          {/* </>
          )} */}
        </>
      )}

      {/* <Stack.Screen name="SelectTeams" component={SelectTeams} /> */}
    </Stack.Navigator>
  )
}

export default MainStackNavigation
