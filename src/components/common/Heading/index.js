/* eslint-disable react/prop-types */
import { Button, IconButton, useTheme } from 'react-native-paper'
import React, { memo, useState } from 'react'
import { fontSizes } from '../../../utils/UIRules/fontSize'
import fontConfig from '../../../utils/UIRules/fontFamily'
import { View, Text, Dimensions } from 'react-native'
import { colors } from '../../../utils/UIRules/colors'
import { spacing } from '../../../utils/UIRules/spacing'
import AnimatedSearch from '../AnimatedSearchInput'

const Heading = ({
  type = 'h1',
  text,
  alignment = 'left',
  fontType = 'bold',
  secondaryButtonText,
  rightContent,

  containerStyle,
  lineHeight = 25,
  color = colors.dark,
  additionalSize = 0,
  searchEnabled,
  searchPlaceHolder,
  onSearchTextSubmit,
  onSearchClearBtnPressed,
  onSearchTextChange,
  textAdditionalStyle,
}) => {
  const theme = useTheme()
  // const { fonts } = theme
  const [searchClicked, setSearchClicked] = useState(false)

  console.log(text, 'hehe')

  const headingFontSizeGenerator = (headingType) => {
    switch (headingType) {
      case 'h1':
        return fontSizes.h1 + additionalSize
      case 'h2':
        return fontSizes.h2 + additionalSize
      case 'h3':
        return fontSizes.h3 + additionalSize
      case 'h4':
        return fontSizes.h4 + additionalSize
      case 'h5':
        return fontSizes.h5 + additionalSize
      case 'h6':
        return fontSizes.h6 + additionalSize
      default:
        return fontSizes.h4 + additionalSize
    }
  }

  const headingFontTypeGenerator = (fontType) => {
    switch (fontType) {
      case 'bold':
        return fontConfig.fontBold
      case 'semi-bold':
        return fontConfig.fontSemiBold
      case 'regular':
        return fontConfig.fontFamily
      case 'extra-bold':
        return fontConfig.fontExtraBold
      default:
        return fontConfig.fontBold
    }
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent:
          secondaryButtonText || searchEnabled || rightContent
            ? 'space-between'
            : alignment === 'center'
            ? 'center'
            : 'flex-start',
        alignItems: 'center',
        width: '100%',
        ...containerStyle,
      }}
    >
      <Text
        style={{
          fontSize: headingFontSizeGenerator(type),
          textAlign: alignment,
          fontFamily: headingFontTypeGenerator(fontType),
          lineHeight: lineHeight,
          color: color === colors.dark ? theme.colors.text : color,

          ...textAdditionalStyle,
          // fontFamily: fonts.bold.fontFamily,
        }}
      >
        {text}
      </Text>
      {secondaryButtonText && (
        <Button onPress={() => alert('Hello')}>
          <Text
            style={{ fontFamily: fontConfig.fontSemiBold, color: colors.gray2 }}
          >
            {secondaryButtonText}
          </Text>
        </Button>
      )}
      {rightContent && (
        <View
          style={{
            marginRight: searchEnabled ? spacing.xxl : 0,
            zIndex: searchClicked ? 99 : 101,
            // position: 'absolute',
          }}
        >
          {rightContent}
        </View>
      )}
      {searchEnabled && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            right: 0,
            zIndex: 100,
          }}
        >
          <AnimatedSearch
            backgroundColor="#fff"
            placeholder={searchPlaceHolder}
            onSubmitEditing={(event) =>
              onSearchTextSubmit(event.nativeEvent.text)
            }
            onSearchClearBtnPressed={onSearchClearBtnPressed}
            onChangeText={(text) =>
              onSearchTextChange && onSearchTextChange(text)
            }
            setSearchClicked={setSearchClicked}
          />
        </View>
      )}
    </View>
  )
}

export default memo(Heading)
