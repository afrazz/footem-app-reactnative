import axios from 'axios'
import errorMessageHandler from '../utils/errorHandler'
// import { AsyncStorage } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firebase from '@react-native-firebase/app'
import { ToastAndroid } from 'react-native'

// import store from '../redux/store'

// import { notification } from 'antd'
const LOCAL = 'http://192.168.18.7:5000'
const PROD = 'https://footem-server-nodejs-afrazz.onrender.com'
const service = axios.create({
  baseURL: `${LOCAL}/api`,
  timeout: 60000,
})

// Config
const TOKEN_PAYLOAD_KEY = 'authorization'

// console.log(store.getState(), 'heueyu')

// API Request interceptor
service.interceptors.request.use(
  async (config) => {
    // const store = require('../redux/store').default
    // const state = store.getState()

    const user = firebase.auth().currentUser

    const token = await user?.getIdTokenResult(true)

    // const value = await AsyncStorage.getItem('token')

    // console.log(value, 'pls')

    // if (store?.getState()?.auth?.token) {

    if (token?.token) {
      config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${token?.token}`
    }

    // }
    // const jwtToken = localStorage.getItem(AUTH_TOKEN) || null

    // if (jwtToken) {
    //   config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${jwtToken}`
    // }

    return config
  },
  (error) => {
    // Do something with request error here
    // notification.error({
    //   message: 'Error',
    // })
    // Alert.alert('Error')
    Promise.reject(error)
  }
)

// API respone interceptor
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (
      error.message.includes('auth/network-request-failed') ||
      error.message.includes('Network Error')
    ) {
      ToastAndroid.show(
        'Network Error! Please Turn On Network Connection.',
        ToastAndroid.LONG
      )
    }

    return Promise.reject(error)
    // Utils.errorMessageHandler(error.response.data)
    // errorMessageHandler(error.response.data)
    // let notificationParam = {
    //   message: '',
    // }

    // if (notificationParam?.message) {
    //   notification.error(notificationParam)
    // }

    // return Promise.reject(error)
  }
)

export default service
