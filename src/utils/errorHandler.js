import { Alert } from 'react-native'

const errorMessageHandler = (error) => {
  console.log(error, 'yeh')
  const errorsListGenerator = (errorList) => {
    return Object.entries(errorList).forEach(function ([key, value]) {
      Alert.alert(key, value)
    })
  }

  if (Object.keys(error?.errors).length !== 0) {
    errorsListGenerator(error?.errors)
    //   notification.error({
    //     message: error?.message || 'Error Occured',
    //     description: () => <>{errorsListGenerator(error?.errors)}</>,
    //   })
  } else {
    Alert.alert(error?.message || 'Error Occured')
  }
}

export default errorMessageHandler
