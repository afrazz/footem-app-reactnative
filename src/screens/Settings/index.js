import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Header from '../../components/common/Header'
import auth from '@react-native-firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { colors } from '../../utils/UIRules/colors'
import { spacing } from '../../utils/UIRules/spacing'
import SettingsRowBlock from './SettingsRowBlock'
import LanguageSettings from './LanguageSettings'
import FollowSettings from './FollowSettings'
import LogoutSettings from './LogoutSettings'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'
import { signInWithGoogle } from '../../redux/slices/authSlice'
import NormalText from '../../components/NormalText'
import Spacer from '../../components/common/Spacer'
import ThemeSettings from './ThemeSettings'

const Settings = () => {
  const { user } = useSelector((state) => state.auth)

  const userImage = auth()?.currentUser?.photoURL

  const dispatch = useDispatch()

  // Snackbar.show({
  //   text: 'Hello world',
  //   // duration: Snackbar.LENGTH_SHORT,
  // })

  return (
    <>
      <Header
        title="Settings"
        rightContent={
          userImage ? (
            <Image
              source={{ uri: userImage }}
              style={{ height: 40, width: 40, borderRadius: 20 }}
            />
          ) : null
        }
      />

      {!user && (
        <View
          style={{
            paddingHorizontal: spacing.md,
            // flex: 1,
            // justifyContent: 'center',
          }}
        >
          <Spacer space="lg" />
          <NormalText
            containerMarginRight={0}
            fontFamily="semiBold"
            fontSize="body2"
            color="bodyCopy"
            textAlign="center"
          >
            You Are Not Signed In Please Sign To Unlock Features
          </NormalText>
          <Spacer space="md" />
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            style={{ width: '100%', height: 60 }}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => dispatch(signInWithGoogle())}
            // disabled={this.state.isSigninInProgress}
          />
          <Spacer space="lg" />
        </View>
      )}

      <>
        <View style={{ paddingHorizontal: spacing.md }}>
          <LanguageSettings />
        </View>

        <View style={{ paddingHorizontal: spacing.md }}>
          <FollowSettings />
        </View>

        <View style={{ paddingHorizontal: spacing.md }}>
          <ThemeSettings />
        </View>
        {user && (
          <View style={{ paddingHorizontal: spacing.md }}>
            <LogoutSettings />
          </View>
        )}
      </>
    </>
  )
}

export default Settings

const styles = StyleSheet.create({})
