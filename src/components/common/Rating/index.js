import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { spacing } from '../../../utils/UIRules/spacing'
import { colors } from '../../../utils/UIRules/colors'
import NormalText from '../../NormalText'

const Rating = () => {
  return (
    <View style={styles.container}>
      <NormalText
        containerMarginRight={0}
        fontSize={'body3'}
        fontFamily="semiBold"
        color="white"
      >
        8.5
      </NormalText>
    </View>
  )
}

export default Rating

const styles = StyleSheet.create({
  container: {
    padding: spacing.sm - 2,
    backgroundColor: colors.primary,
    borderRadius: spacing.md,
  },
})
