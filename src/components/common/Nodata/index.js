import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NormalText from '../../NormalText'
import Heading from '../Heading'
import Spacer from '../Spacer'
import { spacing } from '../../../utils/UIRules/spacing'
import Icon from 'react-native-paper/src/components/Icon'
import { useTheme } from 'react-native-paper'

const Nodata = ({
  title,
  description,
  isImageShow = true,
  titleAlignment = 'center',
}) => {
  const theme = useTheme()
  return (
    <View
      style={{
        alignItems: 'center',
        paddingTop: spacing.xxxl,
        // justifyContent: 'center',
        flex: 1,
        // marginTop: spacing.xxxl,
      }}
    >
      {isImageShow && (
        <>
          {/* <Image
            source={require('../../../../assets/noData.png')}
            style={{ height: 100, width: 100 }}
          /> */}
          <Icon source="soccer" color={theme.colors.text} size={100} />
          <Spacer space="md" />
        </>
      )}

      {/* <NormalText
        containerMarginRight={0}
        fontFamily="semibold"
        fontSize="body1"
      >
        No Results To Show
      </NormalText> */}
      <Heading text={title} type="h4" alignment={titleAlignment} />

      <Spacer space="sm" />
      <NormalText
        // containerMarginRight={0}
        fontFamily="semiBold"
        fontSize="body2"
        color="gray"
        textAlign="center"
      >
        {description}
      </NormalText>
    </View>
  )
}

export default Nodata

const styles = StyleSheet.create({})
