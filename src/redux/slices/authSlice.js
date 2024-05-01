import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import auth from '@react-native-firebase/auth'
import authService from '../../service/auth'
// import { AsyncStorage } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import userService from '../../service/user'
import {
  resetFollowingState,
  setLeaguesFollow,
  setTeamsFollow,
} from './followSlice'
import { ToastAndroid } from 'react-native'
import { getFCMDeviceToken } from '../../service/firebase'
import { getUserDeviceBasedInfo } from '../../utils/functions'
import guestUserService from '../../service/guestUser'
import { DEFAULT_LANGUAGE_ID } from '../../constants'

const updateFCMTokenInfo = async (isNewUser, language) => {
  const fcmTokenRes = await getFCMDeviceToken()
  if (!fcmTokenRes.err && fcmTokenRes.token) {
    // Api call to save Auth User fcm Token
    const userDeviceInfo = await getUserDeviceBasedInfo()

    const sendingData = {
      timezone: userDeviceInfo?.timeZone,
      country: userDeviceInfo?.countryName,
      fcmToken: fcmTokenRes.token,
    }

    // IF the user is new set guest user language if it's available
    if (isNewUser && language) {
      alert(language)
      sendingData.language = language
    }

    const res = await userService.updateUserInfo(sendingData)

    if (res) {
      // alert('auth user login....... fcm done!')
      // Removes Guest Token if it's there
      await AsyncStorage.removeItem('guestUserFCMToken')
    }
  }
}

// NOTE: AuthSlice also act as UserSlice => all the user operations will be added in here.

const initialState = {
  loading: true,
  user: null,
  isNewUser: null,
  loginLoading: false,
  timezone: null,
  isFirstLaunch: true,
  theme: 'System Default',
  language: null,
}

export const getCurrentUser = createAsyncThunk(
  'auth/currentUser',
  async (_, { rejectWithValue, dispatch, getState }) => {
    const data = await authService.getCurrentUser()

    if (data.user) {
      dispatch(
        setLanguage(
          data.user.language || getState().auth.language || DEFAULT_LANGUAGE_ID
        )
      )
      // await AsyncStorage.setItem('languageId', data.user.language)

      // dispatch(setTeamsFollow(data.user.followingTeams))
      // dispatch(setLeaguesFollow(data.user.followingLeagues))
      // alert(JSON.stringify(data.user))
      return { user: data.user }
    }
  }
)
// export const getGuestUser = createAsyncThunk(
//   'auth/guestUser',
//   async (_, { rejectWithValue, dispatch }) => {
//     const data = await guestUserService.getProfile()

//     if (data._id) {
//       dispatch(setLanguage(data.language))
//       // await AsyncStorage.setItem('languageId', data.user.language)

//       // dispatch(setTeamsFollow(data.user.followingTeams))
//       // dispatch(setLeaguesFollow(data.user.followingLeagues))
//       // alert(JSON.stringify(data.user))
//       return { user: data.user }
//     }
//   }
// )

// User Following Methods
// export const setTeamsFollow = createAsyncThunk(
//   'user/setTeamsFollow',
//   async (data) => {
//     const updatedUser = await userService.setTeamsFollows(data)
//     return { updatedData: updatedUser.followingTeams }
//   }
// )

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await userService.updateUserInfo({ fcmToken: null })
      // const signOut = await GoogleSignin.signOut()
      const signOut = await auth().signOut()
      await GoogleSignin.revokeAccess()
      // const signOut = await auth().signOut()
      dispatch(resetFollowingState())

      return signOut
    } catch (err) {
      rejectWithValue(err.message)
    }
    // auth()
    //   .signOut()
    //   .then(() => console.log('User signed out!'))
    //   .catch((err) => console.log(err, 'SIGN_OUTERROR'))
  }
)

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, { dispatch, rejectWithValue, getState }) => {
    // Check if your device supports Google Play

    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn()

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    // Sign-in the user with the credential
    try {
      const signedUser = await auth().signInWithCredential(googleCredential)

      // const { token } = await signedUser.user.getIdTokenResult()
      // await AsyncStorage.setItem('token', token)

      if (signedUser) {
        console.log(signedUser.additionalUserInfo.isNewUser, 'ISNEWONE')
        dispatch(setIsNewUser(signedUser.additionalUserInfo.isNewUser))

        const data = await authService.registerOrLoginUser()
        console.log('dfdfdfscd')

        if (data.user) {
          dispatch(setTeamsFollow(data.user.followingTeams))
          dispatch(setLeaguesFollow(data.user.followingLeagues))

          await updateFCMTokenInfo(
            signedUser.additionalUserInfo.isNewUser,
            getState().auth.language
          )

          return {
            user: data.user,
          }
        }
      }
    } catch (err) {
      // alert(JSON.stringify(err))
      rejectWithValue(err)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setIsFirstLaunch: (state, action) => {
      state.isFirstLaunch = action.payload
    },
    setIsNewUser: (state, action) => {
      state.isNewUser = action.payload
    },
    setUserTimezone: (state, action) => {
      state.timezone = action.payload
    },
    setUpdateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    },
    setTheme: (state, action) => {
      state.theme = action.payload
    },
    setLanguage: (state, action) => {
      console.log(action.payload, 'languagess')
      state.language = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signOut.fulfilled, (state) => {
        state.language = state.user.language
        state.loading = false
        state.user = null
        state.loginLoading = false
        AsyncStorage.removeItem('token')

        ToastAndroid.show('Signout Successfully', ToastAndroid.SHORT)
      })
      .addCase(signOut.rejected, (state, action) => {
        console.log(action.payload, 'SIGNOUT ERROR')
        state.loading = false
        state.user = null
        state.loginLoading = false
      })

      .addCase(signInWithGoogle.pending, (state) => {
        state.loginLoading = true
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        // state.isFirstLaunch = false
        state.loginLoading = false
        state.loading = false
        state.user = action.payload.user

        ToastAndroid.show('SignIn Successfully Welcome!', ToastAndroid.SHORT)
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        console.log('SIGNIN ERROR', action)
        // TODO: Error handling
        state.loading = false
        state.loginLoading = false
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        // state.token = action.payload.token
        state.user = action.payload.user
        state.loading = false
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.user = null
        state.loading = false
      })
  },
})

export const {
  setLoading,
  setIsNewUser,
  setUserTimezone,
  setUpdateUser,
  setIsFirstLaunch,
  setTheme,
  setLanguage,
} = authSlice.actions

export default authSlice.reducer
