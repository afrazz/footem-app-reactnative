/* eslint-disable react/prop-types */
import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { List } from 'react-native-paper'
import NormalText from '../../NormalText'
import { spacing } from '../../../utils/UIRules/spacing'

const StatsDetailRow = ({
  title,
  image,
  rightContent,
  onPress,
  logo,
  otherProps,
}) => {
  // data = [{image, title, rightContent, onPress}]
  return (
    <List.Item
      onPress={onPress}
      {...otherProps}
      title={
        <NormalText
          containerMarginRight={0}
          // fontFamily="semiBold"
          fontSize={'body2'}
        >
          {title}
        </NormalText>
      }
      left={(props) => (
        <Image
          source={{ uri: image }}
          style={{
            // transform: [{ translateX: -6 }],
            height: 35,
            width: 35,
            resizeMode: 'cover',
            borderRadius: 35 / 2,
          }}
        />
      )}
      style={{
        marginBottom: -spacing.sm,
      }}
      right={() => (
        <View
          style={{
            marginRight: -spacing.md - 4,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {logo && (
            <Image
              source={{ uri: logo }}
              style={{
                // transform: [{ translateX: -6 }],
                height: 25,
                width: 25,
                resizeMode: 'contain',
                marginRight: spacing.md,
              }}
            />
          )}

          <NormalText fontFamily="bold" fontSize={'body1'}>
            {rightContent || '-'}
          </NormalText>
        </View>
      )}
    />
  )
}

export default StatsDetailRow

const styles = StyleSheet.create({})
