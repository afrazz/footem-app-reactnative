/* eslint-disable react/prop-types */
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../../utils/UIRules/colors'
import { spacing } from '../../../utils/UIRules/spacing'

const SecondaryCard = ({
  leagueId,
  name,
  logo,

  flexWidth = 1 / 3,
  isActive = false,
  onSelectOrRemoveHandler,
}) => {
  return (
    <TouchableOpacity
      style={styles.container(flexWidth, isActive)}
      onPress={() =>
        onSelectOrRemoveHandler({
          followingId: leagueId,
          name,
          logo,
        })
      }
    >
      <Image
        source={{ uri: logo }}
        style={{ height: 85, width: 85, resizeMode: 'contain' }}
      />
    </TouchableOpacity>
  )
}

export default SecondaryCard

const styles = StyleSheet.create({
  container: (flexWidth, isActive) => ({
    flex: flexWidth,
    backgroundColor: 'rgba(74, 181, 149, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    borderRadius: spacing.md,
    borderWidth: isActive ? 4 : 0,
    borderColor: isActive ? colors.primary : 'transparent',
  }),
})
