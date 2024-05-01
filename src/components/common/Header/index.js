/* eslint-disable react/prop-types */
import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import Heading from '../Heading'
import { spacing } from '../../../utils/UIRules/spacing'
import { IconButton, useTheme } from 'react-native-paper'
import { colors } from '../../../utils/UIRules/colors'
import NormalText from '../../NormalText'
import Spacer from '../Spacer'
import { useNavigation } from '@react-navigation/native'

const Header = ({ title, backButtonEnabled, rightContent, subTitle }) => {
  const navigation = useNavigation()
  const theme = useTheme()
  return (
    <View
      style={{
        // paddingTop: StatusBar.currentHeight,
        height: subTitle ? 100 : 60,
        // paddingVertical: 10,
        // paddingLeft: -8,
        // backgroundColor: '#fff',
        paddingHorizontal: backButtonEnabled ? spacing.md : spacing.lg,

        backgroundColor: theme.colors.secondaryBg,
        justifyContent: 'center',
        zIndex: 1000,
        // paddingTop: StatusBar.currentHeight,
        // marginTop: -8,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        {backButtonEnabled && (
          <IconButton
            icon="chevron-left"
            size={28}
            onPress={() => navigation.goBack()}
            style={{ marginLeft: -spacing.sm, marginRight: spacing.md }}
          />
        )}
        {title && (
          <Heading
            text={title}
            type="h4"
            containerStyle={{ marginRight: rightContent ? 'auto' : 0 }}
          />
        )}
        {rightContent && rightContent}
      </View>
      {subTitle && (
        <>
          <Spacer space="md" />
          <NormalText
            containerMarginRight={0}
            fontSize="body2"
            // fontFamily="semiBold"
            color="bodyCopy"
          >
            {subTitle}
          </NormalText>
          <Spacer space="md" />
        </>
      )}
    </View>
  )
}

export default Header
