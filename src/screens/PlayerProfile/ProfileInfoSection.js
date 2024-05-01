import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'react-native-collapsible-tab-view'
import StatsCard from '../../components/common/StatsCard'
import Spacer from '../../components/common/Spacer'
import { spacing } from '../../utils/UIRules/spacing'
import CardTypeDataDetails from '../../components/common/CardTypeDataDetails'
import { colors } from '../../utils/UIRules/colors'
import Icon from 'react-native-paper/src/components/Icon'
import { useTheme } from 'react-native-paper'

const ProfileInfoSection = ({
  playerInfo,
  position,
  number,
  goals,
  conceded,
}) => {
  const theme = useTheme()
  const getAppropriateListData = (listData, excludeItems = []) => {
    const newObj = {}
    for (const key in listData) {
      if (!excludeItems.includes(key)) {
        newObj[key] = listData[key]
      }
    }
    return newObj
  }

  const getShortPosition = (pos) => {
    switch (pos) {
      case 'Defender':
        return 'DF'
      case 'Midfielder':
        return 'MF'
      case 'Attacker':
        return 'FW'
      case 'Goalkeeper':
        return 'GK'
      default:
        return '-'
    }
  }

  return (
    <Tabs.ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
    >
      <View style={{ paddingHorizontal: spacing.sm }}>
        <Spacer space="lg" />
        <View style={styles.statsCardContainer}>
          <StatsCard label="Position" value={getShortPosition(position)} />
          <StatsCard label="Age" value={playerInfo?.age} isActive />
          <StatsCard label="T shirt" value={number} />
          {position === 'Goalkeeper' ? (
            <StatsCard label="Goals Conceded" value={conceded} isActive />
          ) : (
            <StatsCard label="Goals" value={goals} isActive />
          )}
        </View>
        <Spacer space="lg" />
        <CardTypeDataDetails
          title={'Personal Info'}
          image={<Icon source="account" color={colors.white} size={24} />}
          data={
            playerInfo
              ? getAppropriateListData(playerInfo, [
                  'id',
                  'photo',
                  'clubName',
                  'clubLogo',
                  'goals',
                  'goalsConceded',
                ])
              : {}
          }
          subData={{ goals: [{ total: 80, home: 40, away: 30 }] }}
        />
        <Spacer space="lg" />
      </View>
    </Tabs.ScrollView>
  )
}

export default ProfileInfoSection

const styles = StyleSheet.create({
  statsCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
