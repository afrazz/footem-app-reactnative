import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SettingsRowBlock from './SettingsRowBlock'
import { useDispatch } from 'react-redux'
import { signOut } from '../../redux/slices/authSlice'

const LogoutSettings = () => {
  const dispatch = useDispatch()
  return (
    <View>
      <SettingsRowBlock
        // onPress={onNewsLanguageClick}
        icon={'logout'}
        label="Logout"
        value={'App Logout'}
        onPress={() => dispatch(signOut())}
      />
    </View>
  )
}

export default LogoutSettings

const styles = StyleSheet.create({})
