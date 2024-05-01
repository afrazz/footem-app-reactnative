// /* eslint-disable react/prop-types */
// import { Image, StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { Tabs } from 'react-native-collapsible-tab-view'
// import { spacing } from '../../utils/UIRules/spacing'
// import { colors } from '../../utils/UIRules/colors'
// import Card from '../../components/common/Card'
// import { Divider, List } from 'react-native-paper'
// import Heading from '../../components/common/Heading'
// import NormalText from '../../components/NormalText'
// import Spacer from '../../components/common/Spacer'
// import StatsDetailRow from '../../components/common/StatsDetailRow'

// const LeagueStatsSection = ({ navigation }) => {
//   return (
//     <Tabs.ScrollView style={styles.container}>
//       <Card marginRight={0} borderRadius={spacing.md}>
//         <List.Section>
//           <List.Subheader
//             style={{
//               paddingLeft: -spacing.md,
//               marginTop: -spacing.md,
//               marginBottom: -spacing.sm,
//             }}
//           >
//             <Heading
//               text={'Top Scores'}
//               type="h5"
//               // containerStyle={{ marginTop: -5 }}
//             />
//           </List.Subheader>
//           {['', '', '', '', ''].map(() => (
//             <>
//               <StatsDetailRow
//                 image={
//                   'https://e7.pngegg.com/pngimages/610/114/png-clipart-lionel-messi-fc-barcelona-2018-world-cup-football-player-lionel-messi-face-head.png'
//                 }
//                 rightContent={2}
//                 title="C. Ronaldo"
//                 onPress={() => console.log('cliecked')}
//               />

//               {/* <Spacer space="sm" /> */}
//             </>
//           ))}
//         </List.Section>
//       </Card>

//       <Card marginRight={0} borderRadius={spacing.md}>
//         <List.Section>
//           <List.Subheader
//             style={{
//               paddingLeft: -spacing.md,
//               marginTop: -spacing.md,
//               marginBottom: -spacing.sm,
//             }}
//           >
//             <Heading
//               text={'Top Assists'}
//               type="h5"
//               // containerStyle={{ marginTop: -5 }}
//             />
//           </List.Subheader>
//           {['', '', '', '', ''].map(() => (
//             <>
//               <StatsDetailRow
//                 image={
//                   'https://e7.pngegg.com/pngimages/610/114/png-clipart-lionel-messi-fc-barcelona-2018-world-cup-football-player-lionel-messi-face-head.png'
//                 }
//                 rightContent={2}
//                 title="C. Ronaldo"
//                 onPress={() => console.log('cliecked')}
//               />

//               {/* <Spacer space="sm" /> */}
//             </>
//           ))}
//         </List.Section>
//       </Card>
//       <Card marginRight={0} borderRadius={spacing.md}>
//         <List.Section>
//           <List.Subheader
//             style={{
//               paddingLeft: -spacing.md,
//               marginTop: -spacing.md,
//               marginBottom: -spacing.sm,
//             }}
//           >
//             <Heading
//               text={'Top Yellow Cards'}
//               type="h5"
//               // containerStyle={{ marginTop: -5 }}
//             />
//           </List.Subheader>
//           {['', '', '', '', ''].map(() => (
//             <>
//               <StatsDetailRow
//                 image={
//                   'https://e7.pngegg.com/pngimages/610/114/png-clipart-lionel-messi-fc-barcelona-2018-world-cup-football-player-lionel-messi-face-head.png'
//                 }
//                 rightContent={2}
//                 title="C. Ronaldo"
//                 onPress={() => console.log('cliecked')}
//               />

//               {/* <Spacer space="sm" /> */}
//             </>
//           ))}
//         </List.Section>
//       </Card>
//     </Tabs.ScrollView>
//   )
// }

// export default LeagueStatsSection

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: spacing.md,
//     // backgroundColor: colors.white,
//     // paddingTop: 290,
//     // marginTop: spacing.sm,
//     // paddingBottom: 60,
//   },
// })

/* eslint-disable react/prop-types */
import { Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tabs } from 'react-native-collapsible-tab-view'
import { spacing } from '../../utils/UIRules/spacing'
import { colors } from '../../utils/UIRules/colors'
import Card from '../../components/common/Card'
import { List } from 'react-native-paper'
import Heading from '../../components/common/Heading'
import StatsDetailRow from '../../components/common/StatsDetailRow'
// import squadData from '../../dummyDatas/squad'
import footballApiPlayerService from '../../service/footballApi/playersService'
import Spacer from '../../components/common/Spacer'
import { leagueStatsData } from '../../dummyDatas/leagues'
import FullScreenLoader from '../../components/common/FullScreenLoader'
import { useNavigation } from '@react-navigation/native'

// const dummyStats =

const TeamPlayersSection = ({ leagueId, leagueSeason }) => {
  const [leagueStats, setLeagueStats] = useState({})
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation()

  const fetchLeagueStats = async () => {
    setLoading(true)
    const stats = {}
    if (leagueSeason?.coverage?.top_scorers) {
      const topScorersData = await footballApiPlayerService.getTopScorers({
        season: leagueSeason.year,
        league: leagueId,
      })
      if (topScorersData?.length > 0) {
        stats['topScorers'] = topScorersData
      }
    }

    if (leagueSeason?.coverage?.top_assists) {
      const topAssistsData = await footballApiPlayerService.getTopAssists({
        season: leagueSeason.year,
        league: leagueId,
      })
      if (topAssistsData?.length > 0) {
        stats['topAssists'] = topAssistsData
      }
    }

    if (leagueSeason?.coverage?.top_cards) {
      const topYellowCardsData =
        await footballApiPlayerService.getTopYellowCards({
          season: leagueSeason.year,
          league: leagueId,
        })
      if (topYellowCardsData?.length > 0) {
        stats['topYellowCards'] = topYellowCardsData
      }

      const topRedCardsData = await footballApiPlayerService.getTopRedCards({
        season: leagueSeason.year,
        league: leagueId,
      })
      if (topRedCardsData?.length > 0) {
        stats['topRedCards'] = topRedCardsData
      }
    }
    setLeagueStats(stats)
    setLoading(false)
  }

  useEffect(() => {
    fetchLeagueStats()
  }, [])

  // console.log(JSON.stringify(leagueStats))

  const getPlayerStatValue = (position, statistics) => {
    console.log(position, statistics, 'showwww--wmmw')
    if (position === 'topScorers') {
      return statistics?.goals?.total
    } else if (position === 'topAssists') {
      return statistics?.goals?.assists
    } else if (position === 'topYellowCards') {
      return statistics?.cards?.yellow
    } else if (position === 'topRedCards') {
      return statistics?.cards?.red
    }
  }

  const pickHeading = (statsTitle) => {
    switch (statsTitle) {
      case 'topScorers':
        return 'Top Scorers'
      case 'topAssists':
        return 'Top Assists'
      case 'topYellowCards':
        return 'Top Yellow Cards'
      case 'topRedCards':
        return 'Top Red Cards'
      default:
        return null
    }
  }

  return (
    <Tabs.ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchLeagueStats} />
      }
    >
      {/* {loading ? (
        <FullScreenLoader />
      ) : ( */}
      <>
        <Spacer space="sm" />
        {/* <View style={{ marginTop: -spacing.md, zIndex: 100 }}> */}
        {/* </View> */}
        {/* <Card marginRight={0} borderRadius={spacing.md}>
        <List.Section>
          <List.Subheader
            style={{
              paddingLeft: -spacing.md,
              marginTop: -spacing.md,
              marginBottom: -spacing.sm,
            }}
          >
            <Heading
              text={'Manager'}
              type="h5"
              // containerStyle={{ marginTop: -5 }}
            />
          </List.Subheader>
          {[''].map(() => (
            <>
              <StatsDetailRow
                image={require('../../../assets/player.png')}
                rightContent={2}
                title="C. Ronaldo"
                onPress={() => console.log('cliecked')}
              />

            </>
          ))}
        </List.Section>
      </Card> */}

        {/* Object.entries(animals).forEach(([key, value]) => {
    console.log(`${key}: ${value}`)
}); */}
        {Object.entries(leagueStats)?.map(([statsTitle, players]) => (
          <Card
            key={statsTitle}
            marginRight={0}
            // borderRadius={spacing.md}
            marginBottom={spacing.sm}
          >
            <List.Section>
              <List.Subheader
                style={{
                  paddingLeft: -spacing.md,
                  marginTop: -spacing.md,
                  marginBottom: -spacing.sm,
                }}
              >
                <Heading
                  text={pickHeading(statsTitle)}
                  type="h5"
                  // containerStyle={{ marginTop: -5 }}
                />
              </List.Subheader>
              {players?.map((player) => {
                return (
                  <StatsDetailRow
                    key={player?.player?.id}
                    image={player?.player?.photo}
                    rightContent={getPlayerStatValue(
                      statsTitle,
                      player?.statistics[0]
                    )}
                    title={player?.player?.name}
                    logo={player?.statistics[0].team?.logo}
                    onPress={() =>
                      navigation.navigate('PlayerProfile', {
                        playerId: player?.player?.id,
                      })
                    }
                  />
                )
              })}
            </List.Section>
          </Card>
        ))}
      </>
      {/* )} */}
    </Tabs.ScrollView>
  )
}

export default TeamPlayersSection

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.sm,
    // backgroundColor: colors.white,
    // paddingTop: 290,
    // marginTop: spacing.sm,
    // paddingBottom: 60,
  },
})
