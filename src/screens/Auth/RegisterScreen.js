/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Divider, Text, TextInput } from 'react-native-paper'
import Heading from '../../components/common/Heading'
import Spacer from '../../components/common/Spacer'
import Button from '../../components/common/Button/Button'
import { colors } from '../../utils/UIRules/colors'
import { fontSizes } from '../../utils/UIRules/fontSize'
import fontConfig from '../../utils/UIRules/fontFamily'

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <View style={styles.container}>
      <Spacer space="md" />
      <Heading text={'Create An Account'} type="h2" />
      <Spacer space="md" />
      <TextInput
        label="Name"
        mode="outlined"
        value={name}
        placeholderTextColor={colors.lightGray}
        onChangeText={(text) => setName(text)}
      />
      <Spacer />
      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        placeholderTextColor={colors.lightGray}
        onChangeText={(text) => setEmail(text)}
      />
      <Spacer />
      <TextInput
        label="Password"
        mode="outlined"
        placeholderTextColor={colors.lightGray}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Spacer space={'md'} />

      <Button
        // icon="camera"
        textColor="#fff"
        onPress={() => console.log('Pressed')}
        label="Create an Account"
      />

      <Spacer />
      <Divider />
      <Spacer />
      <Button
        icon="google"
        textColor="#fff"
        onPress={() => console.log('Pressed')}
        buttonColor="#4285F4"
        label="Signup With Google"
      />
      <Spacer space="md" />
      <View style={styles.linkText}>
        <Text style={{ fontSize: fontSizes.body2 }}>Have an Account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signinText}>Signin Instead</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
})

export default RegisterScreen
