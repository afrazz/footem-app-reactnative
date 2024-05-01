import React from 'react'
import { View } from 'react-native'
import NormalText from '../../../components/NormalText'

const PlayerFixtureStatRow = ({ label, value }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <NormalText fontSize={'body13'}>{label}</NormalText>
      <NormalText fontSize={'body2'} fontFamily="bold">
        {value}
      </NormalText>
    </View>
  )
}

export default PlayerFixtureStatRow
