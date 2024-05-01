import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NormalText from '../../../components/NormalText'
import { spacing } from '../../../utils/UIRules/spacing'
import { Divider } from 'react-native-paper'
import Spacer from '../../../components/common/Spacer'

const StatisticsDataRow = ({ homeText, headline, awayText }) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          //   marginTop: 4,
          //   marginBottom: spacing.md + 2,
        }}
      >
        <NormalText
          fontFamily="semiBold"
          fontSize="body2"
          containerMarginRight={0}
        >
          {homeText}
        </NormalText>
        <NormalText
          fontFamily="semiBold"
          fontSize="body2"
          color="bodyCopy"
          containerMarginRight={0}
        >
          {headline}
        </NormalText>
        <NormalText
          fontFamily="semiBold"
          fontSize="body2"
          containerMarginRight={0}
        >
          {awayText}
        </NormalText>
      </View>
      <Spacer space="md" />
      <Divider />
      <Spacer space="md" />
    </>
  )
}

export default StatisticsDataRow

const styles = StyleSheet.create({})
