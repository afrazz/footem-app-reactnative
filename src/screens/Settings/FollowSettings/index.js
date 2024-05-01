import { StyleSheet, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import SettingsRowBlock from '../SettingsRowBlock'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
// import SignInPopup from '../../../components/common/SignInPopup'

const FollowSettings = () => {
  const navigation = useNavigation()
  // const [isOpenSignUpPopup, setIsOpenSignUpPopup] = useState(false)

  const { user } = useSelector((state) => state.auth)

  const onPress = () => {
    if (!user) {
      return ToastAndroid.show(
        'Please Signin to Follow Leagues & Teams',
        ToastAndroid.SHORT
      )
    }

    navigation.navigate('SettingsFollowing')
  }

  return (
    <View>
      <SettingsRowBlock
        icon={'heart-outline'}
        label="Following"
        value="Leagues & Teams"
        onPress={onPress}
      />

      {/* <SignInPopup
        isOpen={isOpenSignUpPopup}
        setIsOpen={setIsOpenSignUpPopup}
      /> */}
    </View>
  )
}

export default FollowSettings

const styles = StyleSheet.create({})
