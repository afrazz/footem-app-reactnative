/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator, Text, useTheme } from 'react-native-paper'
import Heading from '../../components/common/Heading'
import Spacer from '../../components/common/Spacer'
import Button from '../../components/common/Button/Button'
import { fontSizes } from '../../utils/UIRules/fontSize'
import fontConfig from '../../utils/UIRules/fontFamily'

import { GoogleSigninButton } from '@react-native-google-signin/google-signin'
import { useDispatch, useSelector } from 'react-redux'
import {
  setIsFirstLaunch,
  signInWithGoogle,
  signOut,
} from '../../redux/slices/authSlice'
import NormalText from '../../components/NormalText'
import { useNavigation, StackActions } from '@react-navigation/native'
import Modal from '../../components/common/Modal'
// import { spacing } from '../../utils/UIRules/spacing'

const LoginScreen = () => {
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const { isNewUser, user, loading } = useSelector((state) => state.auth)

  useEffect(() => {
    redirectPage()
  }, [user, isNewUser])

  const redirectPage = async () => {
    if (isNewUser && user?._id) {
      navigation.dispatch(StackActions.replace('SelectLanguage'))
    } else if (!isNewUser && user?._id) {
      await dispatch(setIsFirstLaunch(false))
      navigation.dispatch(StackActions.replace('Home'))
    }
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Spacer space="md" />
      <Heading
        text={'Signin to Your Account'}
        type="h3"
        lineHeight={33}
        alignment="center"
      />
      <Spacer space="md" />
      <NormalText
        containerMarginRight={0}
        fontFamily="semiBold"
        fontSize="body2"
        color="bodyCopy"
        textAlign="center"
      >
        SignIn to Your Account for Saving Following Teams and League. And Also
        get Notified
      </NormalText>
      <Spacer space="xl" />
      {/* 
      <TextInput
        label="Password"
        mode="outlined"
        placeholderTextColor={colors.lightGray}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Spacer space={'md'} /> */}

      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        style={{ width: '100%', height: 60 }}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => dispatch(signInWithGoogle())}
        // disabled={this.state.isSigninInProgress}
      />

      <Spacer space="md" />
      {/* <View style={styles.linkText}>
        <Text style={{ fontSize: fontSizes.body2 }}>
          Don't Have an Account?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.signinText}>Signup Instead</Text>
        </TouchableOpacity>
      </View> */}
      <TouchableOpacity
        disabled={loading}
        onPress={async () => {
          navigation.dispatch(
            StackActions.replace('SelectLanguage', { isSkipped: true })
          )

          // await dispatch(setIsFirstLaunch(false))
          // navigation.dispatch(StackActions.replace('Home'))
        }}
      >
        <Text style={styles.signinText}>Skip Now</Text>
      </TouchableOpacity>

      <Modal visible={loading} dismissable={false}>
        <ActivityIndicator animating={true} size={'large'} color="primary" />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  linkText: {
    textAlign: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  signinText: {
    fontFamily: fontConfig.fontSemiBold,
    fontSize: fontSizes.body2,
    textAlign: 'right',
    textDecorationLine: 'underline',
  },
})

export default LoginScreen
