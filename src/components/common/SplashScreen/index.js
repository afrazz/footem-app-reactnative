import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/logo.png')}
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 200,
    height: 200,
  },
})

export default SplashScreen
