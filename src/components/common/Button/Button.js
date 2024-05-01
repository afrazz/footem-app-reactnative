/* eslint-disable react/prop-types */
// import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button as PaperButton } from 'react-native-paper'
import fontConfig from '../../../utils/UIRules/fontFamily'
import { colors } from '../../../utils/UIRules/colors'
import { spacing } from '../../../utils/UIRules/spacing'
import { fontSizes } from '../../../utils/UIRules/fontSize'

const Button = ({
  label,
  mode = 'contained',
  style = {},
  btnType = 'large',
  //   btnColor = null,
  //   color = '#fff',
  //   buttonColor = null,
  //   icon = null,
  ...restProps
}) => {
  return (
    <PaperButton
      //   icon={icon}
      mode={mode}
      textColor={mode === 'contained' ? colors.white : colors.primary}
      //   buttonColor="#4285F4"
      style={{
        borderRadius: spacing.md,
        borderColor: colors.primary,
        borderWidth: 1,
        height: btnType === 'small' ? 34 : 40,
        // width: 100,
        width: btnType === 'small' ? 90 : 'auto',
        // marginHorizontal: 100,

        // paddingHorizontal: 0,
        ...style,
      }}
      contentStyle={{ paddingHorizontal: btnType === 'small' ? 0 : 18 }}
      labelStyle={{
        fontFamily: fontConfig.fontBold,
        width: 'auto',
        justifyContent: 'center',
        marginTop: btnType === 'small' ? 5 : 9,
        marginBottom: btnType === 'small' ? 7 : 'auto',
        // marginVertical: btnType === 'small' ? 0  : 'auto',
        // paddingHorizontal: 0,
        fontSize: btnType === 'small' ? 12 : fontSizes.body2,
        marginHorizontal: btnType === 'small' ? 0 : 'auto',
      }}
      {...restProps}
    >
      {label}
    </PaperButton>
  )
}

export default Button

// const styles = StyleSheet.create({})
