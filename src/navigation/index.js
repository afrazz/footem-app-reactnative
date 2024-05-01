import { StatusBar, useColorScheme } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import { useCallback } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  ActivityIndicator,
  // MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper'
import theme from '../utils/UIRules/theme'
import MainStackNavigation from './StackNavigation'
import Animated from 'react-native-reanimated'
import {
  getCurrentUser,
  setIsFirstLaunch,
  setLanguage,
  setLoading,
  setTheme,
  setUserTimezone,
} from '../redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import auth from '@react-native-firebase/auth'
import { getCalendars } from 'expo-localization'
import { DEFAULT_LANGUAGE_ID } from '../constants'
import darkTheme from '../utils/UIRules/darkTheme'
import lightTheme from '../utils/UIRules/lightTheme'
import guestUserService from '../service/guestUser'
import { getFCMDeviceToken } from '../service/firebase'
import { getUserDeviceBasedInfo } from '../utils/functions'

// import lightTheme from '../utils/UIRules/lightTheme'
// import AsyncStorage from '@react-native-async-storage/async-storage'

const Navigation = () => {
  const deviceColorScheme = useColorScheme()

  // console.log(deviceColorScheme, 'thememe')

  const { loading, language } = useSelector((state) => state.auth)

  const { theme } = useSelector((state) => state.auth)
  // const colorScheme = useColorScheme()

  // const [isFirstLaunch, setIsFirstLaunch] = useState(true)
  const fadeAnimation = useState(new Animated.Value(0))[0]
  const dispatch = useDispatch()

  const [fontsLoaded] = useFonts({
    'Mulish-Regular': require('../../assets/fonts/Mulish-Regular.ttf'),
    'Mulish-Semibold': require('../../assets/fonts/Mulish-SemiBold.ttf'),
    'Mulish-Bold': require('../../assets/fonts/Mulish-Bold.ttf'),
    'Mulish-Extrabold': require('../../assets/fonts/Mulish-ExtraBold.ttf'),
  })

  // Handle user state changes
  async function onAuthStateChanged(user) {
    if (user) {
      console.log(user, 'heyye')
      // alert(JSON.stringify(user))
      // const { token } = await user.getIdTokenResult()
      // await AsyncStorage.setItem('token', token)

      // if (token) {
      await dispatch(getCurrentUser())
      // await AsyncStorage.removeItem('languageId')
      // }
    } else {
      // const languageId = await AsyncStorage.getItem('languageId')

      // if (!languageId) {
      //   await AsyncStorage.setItem('languageId', DEFAULT_LANGUAGE_ID)
      // }
      const guestUserFcmToken = await AsyncStorage.getItem('guestUserFCMToken')
      console.log(guestUserFcmToken, 'jiiooooo')

      if (guestUserFcmToken) {
        const guestUser = await guestUserService.getProfile(guestUserFcmToken)

        console.log(guestUser, 'heyyyyyyy')

        if (guestUser) {
          if (!guestUser.language && language) {
            dispatch(setLanguage(language))
          } else if (!guestUser.language && !language) {
            dispatch(setLanguage(DEFAULT_LANGUAGE_ID))
          } else {
            dispatch(setLanguage(guestUser.language))
          }
        } else {
          // RE-CREATE FCM TOKEN AND SAVE GUEST USER
          await AsyncStorage.removeItem('guestUserFCMToken')

          const fcmTokenRes = await getFCMDeviceToken()

          if (!fcmTokenRes.err && fcmTokenRes.token) {
            const userDeviceInfo = await getUserDeviceBasedInfo()
            // Api call to save Guest User fcm Token
            await guestUserService.createGuestUser({
              _id: fcmTokenRes.token,
              timezone: userDeviceInfo?.timeZone,
              country: userDeviceInfo.countryName,
              language: language || DEFAULT_LANGUAGE_ID,
            })
            // If api returns success => store FCM Token to Asyncstorage
            await AsyncStorage.setItem('guestUserFCMToken', fcmTokenRes.token)
          }
        }
      } else {
        if (language) {
          // alert(language)
          dispatch(setLanguage(language))
        } else {
          // alert('any-hit')

          // alert('no-lan')
          dispatch(setLanguage(DEFAULT_LANGUAGE_ID))
        }
      }
    }

    dispatch(setLoading(false))
  }

  const getTimeZone = async () => {
    const { timeZone } = await getCalendars()[0]
    dispatch(setUserTimezone(timeZone))
  }

  useEffect(() => {
    getTimeZone()
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  useEffect(() => {
    AsyncStorage.getItem('theme').then((value) => {
      if (value === null) {
        AsyncStorage.setItem('theme', 'System Default')
        dispatch(setTheme('System Default'))
      } else {
        dispatch(setTheme(value))
      }
    })

    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value === null) {
        AsyncStorage.setItem('alreadyLaunched', 'true')
        // setIsFirstLaunch(true)
        dispatch(setIsFirstLaunch(true))
      } else {
        // setIsFirstLaunch(false)
        dispatch(setIsFirstLaunch(false))
      }
    })
    // AsyncStorage.getItem('theme').then((value) => {
    //   if (value === null) {
    //     AsyncStorage.setItem('theme', 'System Default')
    //     // setIsFirstLaunch(true)
    //   }
    // })
  }, [])

  // -----------Splash Screen Things
  const fadeOut = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }

  useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
      fadeOut()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return (
      <Animated.View style={{ flex: 1, opacity: fadeAnimation }}>
        {/* Your splash screen UI goes here */}
      </Animated.View>
    )
  }

  // -----------End-----Splash Screen Things----------------

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center' }}>
  //       <ActivityIndicator animating={true} size={'large'} color="primary" />
  //     </View>
  //   )
  // } else {
  // const colorScheme = useColorScheme()

  // const colorScheme = 'dark'

  // const theme = colorScheme === 'dark' ? darkTheme : lightTheme
  const NavigationDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#121212',
      card: '#1E1E1E',
    },
  }
  const NavigationLightTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      // background: '#fff',
      // card: '#fff',
    },
  }

  console.log(theme, 'THE-THEME')

  let themeStyle
  let navigationThemeStyle

  // if (deviceColorScheme === 'dark') {
  //   themeStyle = darkTheme
  //   navigationThemeStyle = NavigationDarkTheme
  // } else {
  //   themeStyle = lightTheme
  //   navigationThemeStyle = NavigationLightTheme
  // }

  const getSystemColorSchemeSelectedByUser = (stage) => {
    if (stage === 'app-theme') {
      if (deviceColorScheme === 'dark') {
        return darkTheme
      }
      return lightTheme
    } else {
      if (deviceColorScheme === 'dark') {
        return NavigationDarkTheme
      }
      return NavigationLightTheme
    }
  }

  themeStyle =
    theme === 'Dark'
      ? darkTheme
      : theme === 'Light'
      ? lightTheme
      : getSystemColorSchemeSelectedByUser('app-theme')

  navigationThemeStyle =
    theme === 'Dark'
      ? NavigationDarkTheme
      : theme === 'Light'
      ? NavigationLightTheme
      : getSystemColorSchemeSelectedByUser('navigation-theme')

  return (
    <PaperProvider theme={themeStyle}>
      <StatusBar
        backgroundColor={themeStyle.colors.background}
        barStyle={
          theme === 'Light'
            ? 'dark-content'
            : theme === 'Dark'
            ? 'light-content'
            : deviceColorScheme === 'dark'
            ? 'light-content'
            : 'dark-content'
        }
      />
      <NavigationContainer theme={navigationThemeStyle}>
        <MainStackNavigation />
      </NavigationContainer>
    </PaperProvider>
  )
  // }
}

export default Navigation
