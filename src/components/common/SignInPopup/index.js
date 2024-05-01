import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from '../Modal'
import { ActivityIndicator, Button, useTheme } from 'react-native-paper'
import { colors } from '../../../utils/UIRules/colors'
import Spacer from '../Spacer'
import NormalText from '../../NormalText'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'
import { signInWithGoogle } from '../../../redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { spacing } from '../../../utils/UIRules/spacing'

const SignInPopup = ({ isOpen, setIsOpen, message }) => {
  const dispatch = useDispatch()
  const { user, loginLoading } = useSelector((state) => state.auth)
  const theme = useTheme()

  useEffect(() => {
    if (user) {
      setIsOpen(false)
    }
  }, [user])

  return (
    <View>
      <Modal
        setVisible={setIsOpen}
        visible={isOpen}
        actions={
          <>
            <Button
              onPress={() => {
                setIsOpen(false)
              }}
              textColor={colors.danger}
            >
              Cancel
            </Button>
          </>
        }
      >
        {/* <View>
          <Spacer space="lg" />
          <NormalText
            containerMarginRight={0}
            fontFamily="semiBold"
            fontSize="body2"
            color="gray"
            textAlign="center"
          >
            Your Not Signed In Please Sign To Unlock Features
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
        </View> */}
        {/* <View
          style={{
            paddingHorizontal: spacing.md,
            // flex: 1,
            // justifyContent: 'center',
          }}
        >
          <Spacer space="lg" /> */}
        <Spacer space="md" />
        <NormalText
          containerMarginRight={0}
          fontFamily="semiBold"
          fontSize="body2"
          color="bodyCopy"
          textAlign="center"
        >
          {loginLoading ? (
            <ActivityIndicator size={'small'} color={theme.colors.text} />
          ) : (
            message
          )}
        </NormalText>
        <Spacer space="md" />
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          style={{ width: '100%', height: 60 }}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => dispatch(signInWithGoogle())}
          disabled={loginLoading}

          // disabled={this.state.isSigninInProgress}
        />
        {/* <Spacer space="lg" /> */}
        {/* </View> */}
      </Modal>
    </View>
  )
}

export default SignInPopup

const styles = StyleSheet.create({})
