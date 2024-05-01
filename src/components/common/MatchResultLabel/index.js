import { StyleSheet, View } from 'react-native'
import React from 'react'
import NormalText from '../../NormalText'
import { spacing } from '../../../utils/UIRules/spacing'
import { colors } from '../../../utils/UIRules/colors'

const MatchResultLabel = ({ result }) => {
  return (
    <View style={styles.matchResultLabel(result)}>
      <NormalText color="white" fontSize={'body2'} fontFamily="bold">
        {result}
      </NormalText>
    </View>
  )
}

export default MatchResultLabel

const styles = StyleSheet.create({
  matchResultLabel: (result) => ({
    // padding: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: spacing.sm,
    backgroundColor:
      result === 'W'
        ? colors.primary
        : result === 'L'
        ? colors.danger
        : colors.warning,
  }),
})
