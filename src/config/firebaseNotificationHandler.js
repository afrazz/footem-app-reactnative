import messaging from '@react-native-firebase/messaging'

const firebaseNotificationHandler = (navigation) => {
  // Quit State
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        navigation.navigate('NewsDetails', {
          languageId: remoteMessage.data.language,
          newsId: remoteMessage.data.newsId,
        })
        // console.log(
        //   'Notification caused app to open from quit state:',
        //   remoteMessage.notification
        // )
        // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
      // setLoading(false);
    })

  // Open State
  // Assume a message-notification contains a "type" property in the data payload of the screen to open
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage
    )
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
}

export default firebaseNotificationHandler
