/* eslint-disable react/prop-types */
// import { Text } from 'react-native-paper'
import React from 'react'
import fontFamilyStyle from '../../utils/UIRules/fontFamily'
import { fontSizes } from '../../utils/UIRules/fontSize'
import { colors } from '../../utils/UIRules/colors'
import { Text, View } from 'react-native'
import { spacing } from '../../utils/UIRules/spacing'
import { useTheme } from 'react-native-paper'

const NormalText = ({
  children,
  fontFamily = 'regular', // [regular, semibold, bold, extrabold]
  fontSize = fontSizes.body1, // [body1, body2, body3]
  color = 'dark', // [dark, gray, lighGray, white, success, danger]

  containerMarginRight = spacing.md,
  // lines = 1,
  underlined,
  textProperties,
  ...rest
}) => {
  const theme = useTheme()

  const chooseFontFamily = (fontName) => {
    switch (fontName) {
      case 'regular':
        return fontFamilyStyle.fontFamily
      case 'semiBold':
        return fontFamilyStyle.fontSemiBold
      case 'bold':
        return fontFamilyStyle.fontBold
      case 'extraBold':
        return fontFamilyStyle.fontExtraBold
      default:
        return fontFamilyStyle.fontFamily
    }
  }

  const chooseColor = (color) => {
    switch (color) {
      case 'dark':
        return theme.colors.text
      // colors.dark
      case 'gray':
        return colors.darkGray
      case 'lightGray':
        return colors.gray2
      case 'white':
        return colors.white
      case 'success':
        return colors.success
      case 'warning':
        return colors.warning
      case 'danger':
        return colors.danger
      case 'bodyCopy':
        return theme.colors.bodyCopy
      // colors.bodyCopy
      case 'primary':
        return colors.primary
      default:
        return colors.dark
    }
  }

  return (
    // <View style={{ marginRight: containerMarginRight }}>
    <Text
      // adjustsFontSizeToFit={true}
      style={{
        fontFamily: chooseFontFamily(fontFamily),
        fontSize: fontSizes[fontSize] || fontSizes.body1,
        color: chooseColor(color),
        textDecorationLine: underlined ? 'underline' : 'none',

        // alignItemccfccccccccccccccccccvbv   cbgcftuuu7e66ddddddddddaq   s: 'center',
        ...rest,
      }}
      {...textProperties}
      // numberOfLines={3}
      // ellipsizeMode="tail"
      // // ellipsizeMode="clip"
      // ellipsizeMode="head"
    >
      {children}
    </Text>
    // </View>
  )
}

export default NormalText
