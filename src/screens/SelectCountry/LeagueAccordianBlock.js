/* eslint-disable react/prop-types */
import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { spacing } from '../../utils/UIRules/spacing'
import NormalText from '../../components/NormalText'
import { colors } from '../../utils/UIRules/colors'

const LeagueAccordianBlock = ({ leagueName }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: orientation === 'PORTRAIT' ? 'flex-start' : 'center',
        paddingLeft: spacing.lg,
        width: '100%',
        paddingTop: spacing.md,
      }}
    >
      <Image
        source={require('../../../assets/manunited.png')}
        style={{
          //   transform: [{ translateX: -6 }],
          height: 22,
          width: 22,
        }}
      />
      <NormalText
        fontSize={'body2'}
        textAlign="right"
        paddingLeft={spacing.sm}
        // transform={[{ translateX: 4 }]}
      >
        {leagueName}
      </NormalText>
    </View>
  )
}

const styles = StyleSheet.create({})

export default LeagueAccordianBlock
