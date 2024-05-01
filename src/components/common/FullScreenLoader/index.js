import { StyleSheet, View } from 'react-native'
import React from 'react'
import { ActivityIndicator, useTheme } from 'react-native-paper'
import { colors } from '../../../utils/UIRules/colors'

const FullScreenLoader = () => {
  const theme = useTheme()
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ActivityIndicator size={'small'} color={theme.colors.text} />
    </View>
  )
}

export default FullScreenLoader

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
})
