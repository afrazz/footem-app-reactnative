import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Card from '../Card'
import { spacing } from '../../../utils/UIRules/spacing'
import NormalText from '../../NormalText'
import { colors } from '../../../utils/UIRules/colors'

const StatsCard = ({ isActive = false, label, value }) => {
  let deviceWidth = Dimensions.get('window').width

  return (
    <Card
      marginRight={spacing.sm}
      width={deviceWidth / 4.7}
      cardHeight={85}
      contentPadding="sm"
      backgroundColor={isActive ? colors.dark : colors.white}
    >
      <View
        style={{
          // justifyContent: 'space-between',

          flex: 1,
        }}
      >
        <NormalText
          fontSize={'body3'}
          color={isActive ? 'white' : 'bodyCopy'}
          fontFamily="semiBold"
        >
          {label}
        </NormalText>

        <NormalText
          position="absolute"
          bottom={-4}
          right={0}
          fontSize={'h3'}
          color={isActive ? 'white' : 'dark'}
          fontFamily="bold"
        >
          {value}
        </NormalText>
      </View>
    </Card>
  )
}

export default StatsCard

const styles = StyleSheet.create({})
