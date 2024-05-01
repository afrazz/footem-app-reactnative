import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { List, useTheme } from 'react-native-paper'
import NormalText from '../../NormalText'
import { Image } from 'react-native'
import { spacing } from '../../../utils/UIRules/spacing'
import Spacer from '../Spacer'

const NormalListItem = React.memo(({ label, imageUrl, index, onPress }) => {
  const theme = useTheme()
  return (
    <>
      <List.Item
        onPress={() => onPress(label)}
        title={
          <NormalText
            containerMarginRight={0}
            fontFamily="regular"
            fontSize={'body2'}
          >
            {label}
          </NormalText>
        }
        left={(props) => (
          <Image
            style={{ width: 25, height: 25, resizeMode: 'cover' }}
            source={{
              uri: imageUrl,
            }}
          />
        )}
        style={{
          paddingLeft: spacing.md,
          marginBottom: -spacing.sm - 4,
        }}
        right={() => (
          <List.Icon
            color={theme.colors.text}
            icon="chevron-right"
            style={{ marginRight: -spacing.sm - 4 }}
          />
        )}
      />
      <Spacer space="sm" />
    </>
  )
})

NormalListItem.displayName = NormalListItem

export default NormalListItem
