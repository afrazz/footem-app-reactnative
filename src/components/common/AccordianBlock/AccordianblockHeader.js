/* eslint-disable react/prop-types */
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../../utils/UIRules/colors'
import { fontSizes } from '../../../utils/UIRules/fontSize'
import fontFamily from '../../../utils/UIRules/fontFamily'

const AccordianblockHeader = ({ league, day }) => {
  return (
    <View>
      <Text
        style={{
          fontSize: fontSizes.h5,
          fontFamily: fontFamily.fontSemiBold,
          marginLeft: -10,
        }}
      >
        {league}
      </Text>

      <Text
        style={{
          textAlign: 'left',
          transform: [{ translateX: -8 }],
          fontSize: 12,
          color: colors.darkGray,
        }}
      >
        {day}
      </Text>
    </View>
  )
}

export default AccordianblockHeader

const styles = StyleSheet.create({})
