/* eslint-disable react/prop-types */
import { Dimensions, StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { Card as RnPaperCard, useTheme } from 'react-native-paper'
import { colors } from '../../../utils/UIRules/colors'
import { spacing } from '../../../utils/UIRules/spacing'

const Card = ({
  image,
  imageHeight,
  children,
  backgroundColor = '#fff',
  width,
  marginRight = 20,
  borderRadius = spacing.sm,
  cardHeight,
  contentPadding = 'md',
  ...restProps
}) => {
  const theme = useTheme()
  return (
    <View>
      <RnPaperCard
        style={styles.cardContainer(width, marginRight, restProps)}
        mode="outlined"
        elevation={5}
      >
        {image && (
          <Image
            source={{
              uri: image,
            }}
            style={{
              width: '100%',
              borderRadius: 10,
              height: imageHeight,
            }}
          />
        )}

        <RnPaperCard.Content
          style={styles.cardContent(
            backgroundColor === colors.white
              ? theme.colors.secondaryBg
              : backgroundColor,
            borderRadius,
            cardHeight,
            contentPadding
          )}
        >
          {children}
        </RnPaperCard.Content>
      </RnPaperCard>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  cardContainer: (width, marginRight, restProps) => ({
    borderRadius: 10,
    width: width ? width : '98%',
    marginRight: marginRight,
    marginLeft: width === '100%' ? 0 : 4,
    borderColor: 'transparent',
    position: 'relative',
    ...restProps,
  }),
  cardContent: (backgroundColor, borderRadius, cardHeight, contentPadding) => ({
    backgroundColor: backgroundColor || '#fff',
    borderRadius: borderRadius,
    elevation: 6, // Android
    shadowColor: colors.darkGray,
    paddingHorizontal: spacing[contentPadding],
    // paddingHorizontal: spacing.md,
    shadowRadius: 5,
    paddingVertical: spacing[contentPadding],
    height: cardHeight || 'auto',
    paddingBottom: spacing[contentPadding],
  }),
})
