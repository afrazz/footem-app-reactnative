import { StyleSheet, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import TopTabView from '../../components/common/TopTabView'
import { colors } from '../../utils/UIRules/colors'
import LeagueTeamsSection from './LeagueTeamsSection'
import LeagueStatsSection from './LeagueStatsSection'
import LeagueMatchSection from './LeagueMatchSection'
import LeagueFollowHeader from './LeagueFollowHeader'
import LeagueTableSection from './LeagueTableSection'
import LeagueDetailsNewsSection from './LeagueDetailsNewsSection'

const LeagueDetails = ({ route }) => {
  const { leagueId, leagueName, leagueLogo, leagueCountry, leagueSeason } =
    route.params

  // alert(JSON.stringify(route.params))

  // alert(
  //   JSON.stringify({
  //     leagueId,
  //     leagueName,
  //     leagueLogo,
  //     leagueCountry,
  //     leagueSeason,
  //   })
  // )

  // coverage: {
  //   fixtures: {
  //     events: true,
  //     lineups: false,
  //     statistics_fixtures: false,
  //     statistics_players: false,
  //   },
  //   standings: true,
  //   players: true,
  //   top_scorers: true,
  //   top_assists: true,
  //   top_cards: true,
  //   injuries: false,
  //   predictions: true,
  //   odds: true,
  // },

  const TABDATA = [
    {
      name: 'Teams',
      component: (
        <LeagueTeamsSection
          leagueSeason={leagueSeason?.year}
          leagueId={leagueId}
        />
      ),
    },
    // {
    //   name: 'Matches',
    //   component: (
    //     <LeagueMatchSection
    //       leagueId={leagueId}
    //       leagueSeason={leagueSeason?.year}
    //     />
    //   ),
    // },
  ]

  if (leagueSeason?.coverage?.standings) {
    TABDATA.push({
      name: 'Table',
      component: (
        <LeagueTableSection
          leagueSeason={leagueSeason?.year}
          leagueId={leagueId}
        />
      ),
    })
  }

  if (
    leagueSeason?.coverage?.top_scorers ||
    leagueSeason?.coverage?.top_assists ||
    leagueSeason?.coverage?.top_cards
  ) {
    TABDATA.push({
      name: 'Stats',
      component: (
        <LeagueStatsSection leagueId={leagueId} leagueSeason={leagueSeason} />
      ),
    })
  }

  TABDATA.push({
    name: 'News',
    component: <LeagueDetailsNewsSection leagueId={leagueId} />,
  })

  const LeagueHeader = () => {
    return (
      <LeagueFollowHeader
        leagueId={leagueId}
        leagueName={leagueName}
        leagueLogo={leagueLogo}
        leagueCountry={leagueCountry}
        leagueSeason={leagueSeason}
      />
      // <>
      //   <View
      //     style={{
      //       paddingVertical: spacing.xxl,
      //       //   paddingVertical: spacing.md,
      //       backgroundColor: colors.dark,
      //       flexDirection: 'row',
      //       alignItems: 'center',
      //       paddingHorizontal: spacing.md,
      //       // marginBottom: spacing.sm,
      //     }}
      //   >
      //     <Image
      //       source={require('../../../assets/united.png')}
      //       style={{ height: 100, width: 100, resizeMode: 'contain' }}
      //     />
      //     <Spacer direction="row" space="md" />
      //     <View
      //       style={{
      //         alignItems: 'flex-start',
      //         flex: 1,
      //       }}
      //     >
      //       <Heading
      //         type="h4"
      //         additionalSize={2}
      //         text="Indian Super League"
      //         fontType="bold"
      //         color={colors.white}
      //         // lineHeight={}
      //       />
      //       <Spacer space="md" />
      //       <Button
      //         // icon="camera"
      //         textColor={colors.dark}
      //         buttonColor={colors.lightGray}
      //         style={{ borderColor: colors.lightGray }}
      //         onPress={() => console.log('Pressed')}
      //         label="Follow"
      //       />
      //     </View>
      //   </View>
      // </>
    )
  }

  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.dark}
        // style={{ color: colors.white, backgroundColor: colors.dark }}
      />
      <TopTabView
        TabsSpacingTop="sm"
        // removeShadow
        Header={LeagueHeader}
        activeBgColor={colors.dark}
        variant="dark"
        variantColor={colors.dark}
        TabViewData={TABDATA}
      />
    </>
  )
}

export default LeagueDetails

const styles = StyleSheet.create({})
