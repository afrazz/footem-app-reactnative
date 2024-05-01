import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import Icon from 'react-native-paper/src/components/Icon'
import NormalText from '../../components/NormalText'
import Spacer from '../../components/common/Spacer'
import { colors } from '../../utils/UIRules/colors'
import { spacing } from '../../utils/UIRules/spacing'
import { useTheme } from 'react-native-paper'

const SettingsRowBlock = ({ icon, label, value, onPress }) => {
  const theme = useTheme()
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.colors.secondaryBg }]}
      onPress={onPress}
    >
      <Icon source={icon} color={theme.colors.text} size={32} />
      <Spacer direction="row" space="md" />
      <View>
        <NormalText fontSize="body1" fontFamily="semiBold">
          {label}
        </NormalText>

        <NormalText fontSize="body13" color="bodyCopy" marginTop={2}>
          {value}
        </NormalText>
      </View>
      <View style={{ marginLeft: 'auto' }}>
        <Icon source="chevron-right" color={theme.colors.text} size={32} />
      </View>
    </TouchableOpacity>
  )
}

export default SettingsRowBlock

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: spacing.sm,
    marginTop: spacing.md,
  },
})
