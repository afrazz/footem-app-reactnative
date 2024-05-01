import AsyncStorage from '@react-native-async-storage/async-storage'
import messaging from '@react-native-firebase/messaging'
import { getUserDeviceBasedInfo } from '../utils/functions'
import userService from './user'
import guestUserService from './guestUser'
import { DEFAULT_LANGUAGE_ID } from '../constants'

const getFCMDeviceToken = () => {
  return messaging()
    .getToken()
    .then((token) => {
      return { token: token }
    })
    .catch((err) => {
      return { err: err.message }
    })
}

const fcmTokenCheckAndSave = async (user, language) => {
  if (!user) {
    // User Not Logged

    const guestUserFCMToken = await AsyncStorage.getItem('guestUserFCMToken')

    // User Not Logged and he doesn't have FCMToken
    if (!guestUserFCMToken) {
      const fcmTokenRes = await getFCMDeviceToken()
      if (!fcmTokenRes.err && fcmTokenRes.token) {
        console.log(fcmTokenRes, 'Tokennn-guest')
        // Api call to save Guest User fcm Token
        const userDeviceInfo = await getUserDeviceBasedInfo()

        // const languageId = await AsyncStorage.getItem('languageId')
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
  } else if (user) {
    // User Logged In
    // User Logged In but he doesnot have fcmtoken
    if (!user?.fcmToken) {
      const fcmTokenRes = await getFCMDeviceToken()
      if (!fcmTokenRes.err && fcmTokenRes.token) {
        // Api call to save Auth User fcm Token
        const userDeviceInfo = await getUserDeviceBasedInfo()

        const res = await userService.updateUserInfo({
          timezone: userDeviceInfo?.timeZone,
          country: userDeviceInfo?.countryName,
          fcmToken: fcmTokenRes.token,
        })

        if (res) {
          // alert('auth user fcm done!')
          // Removes Guest Token if it's there
          await AsyncStorage.removeItem('guestUserFCMToken')
        }
      }
    }
  }
}

export { getFCMDeviceToken, fcmTokenCheckAndSave }
