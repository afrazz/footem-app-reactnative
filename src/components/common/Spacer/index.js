/* eslint-disable react/prop-types */
import { View } from 'react-native'
import React from 'react'
import { spacing } from '../../../utils/UIRules/spacing'

const Spacer = ({ space = 'sm', direction = 'column' }) => {
  return (
    <View
      style={{
        [direction === 'row' ? 'paddingRight' : 'paddingTop']: spacing[space],
      }}
    ></View>
  )
}

export default Spacer
