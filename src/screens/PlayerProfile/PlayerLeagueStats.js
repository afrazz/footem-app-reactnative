import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tabs } from 'react-native-collapsible-tab-view'
import StatsCard from '../../components/common/StatsCard'
import Spacer from '../../components/common/Spacer'
import { spacing } from '../../utils/UIRules/spacing'
import CardTypeDataDetails from '../../components/common/CardTypeDataDetails'
import { colors } from '../../utils/UIRules/colors'
import Icon from 'react-native-paper/src/components/Icon'
import { Divider, List, useTheme } from 'react-native-paper'
import NormalText from '../../components/NormalText'
import DropDown from '../../components/common/Dropdown'

const PlayerLeagueStats = ({ playerStats }) => {
  const [formattedStatsData, setFormattedStatsData] = useState([])

  const theme = useTheme()
  useEffect(() => {
    if (playerStats) {
      const modifiedData = playerStats.map((item) => {
        const modifiedItem = {}
        for (const category in item) {
          for (const subCategory in item[category]) {
            modifiedItem[`${category} ${subCategory}`] =
              item[category][subCategory]
          }
        }

        return modifiedItem
      })

      setFormattedStatsData(modifiedData)
    }
  }, [playerStats])

  console.log(formattedStatsData, 'shhgsgs')

  return (
    <Tabs.ScrollView style={{ flex: 1 }}>
      {/* <DropDown
        options={leagues}
        setValue={setSelectedLeague}
        value={selectedLeague}
      /> */}

      {formattedStatsData?.map((cur, i) => (
        <View
          style={[
            styles.container,
            { backgroundColor: theme.colors.secondaryBg },
          ]}
          key={i}
        >
          <List.Accordion
            title={
              <NormalText fontSize={'body2'} fontFamily="semiBold">
                {cur?.['league name']} ({cur?.['league season']})
              </NormalText>
            }
            left={() => (
              <View style={{ position: 'relative' }}>
                <Image
                  source={{
                    uri: cur?.['league logo'],
                  }}
                  style={{ height: 35, width: 35, resizeMode: 'contain' }}
                />
                <View
                  style={{
                    position: 'absolute',
                    right: -12,
                    bottom: -10,
                    backgroundColor: colors.gray4,
                    height: 25,
                    width: 25,
                    borderRadius: 25 / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    source={{ uri: cur?.['team logo'] }}
                    style={{
                      height: 17,
                      width: 17,
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              </View>
            )}
            // expanded={expanded}
            // onPress={handlePress}
            theme={{ colors: { primary: colors.dark } }}
            style={{ backgroundColor: theme.colors.secondaryBg }}
            descriptionStyle={{ backgroundColor: '#fff' }}
          >
            <Divider />
            {Object.entries(
              Object.fromEntries(
                Object.entries(cur).filter(
                  ([key]) =>
                    !key.startsWith('team') &&
                    !key.startsWith('league') &&
                    !key.startsWith('clubLogo')
                )
              )
            ).map(([key, value], i) => {
              return (
                <View style={styles.rowItem} key={i}>
                  <NormalText
                    fontSize={'body2'}
                    fontFamily="semiBold"
                    color="bodyCopy"
                  >
                    {key}
                  </NormalText>
                  <NormalText fontSize={'body2'} fontFamily="bold">
                    {typeof value === 'boolean' && value === true
                      ? 'Yes'
                      : typeof value === 'boolean' && value === false
                      ? 'No'
                      : value}
                  </NormalText>
                </View>
              )
            })}

            <Spacer space="lg" />
          </List.Accordion>
        </View>
      ))}
    </Tabs.ScrollView>
  )
}

export default PlayerLeagueStats

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.md,
    marginHorizontal: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: spacing.md,
    overflow: 'hidden',
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.md + 4,
    paddingLeft: spacing.sm,
    paddingRight: spacing.sm,
  },
})
