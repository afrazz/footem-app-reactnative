/* eslint-disable react/prop-types */
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Divider, Text } from 'react-native-paper'
import { colors } from '../../../utils/UIRules/colors'
import { spacing } from '../../../utils/UIRules/spacing'

const CenteredTextWithLines = ({ text }) => {
  return (
    <View style={styles.container}>
      <Divider style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <Divider style={styles.line} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  line: {
    flex: 1,
    // height: StyleSheet.hairlineWidth,
    // backgroundColor: 'black',
    marginTop: 2,
  },
  text: {
    paddingHorizontal: spacing.md,
    color: colors.bodyCopy,
  },
})

export default CenteredTextWithLines
