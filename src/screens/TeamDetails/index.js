import { Image, StyleSheet, StatusBar, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TopTabView from '../../components/common/TopTabView'
import LeagueNewsSection from '../News/leagueNewsSection'
import { colors } from '../../utils/UIRules/colors'
import { spacing } from '../../utils/UIRules/spacing'
import Heading from '../../components/common/Heading'
import Spacer from '../../components/common/Spacer'
import Button from '../../components/common/Button/Button'
import TeamSquadsSection from './TeamSquadsSection'
import { useSelector } from 'react-redux'
import PageFollowHeader from './TeamFollowHeader'
import TeamNewsSection from './TeamNewsSection'
import TeamStatsSection from './TeamStatsSection'

const TeamDetails = ({ route, navigation }) => {
  // const [primaryColor, setPrimaryColor] = useState(null)
  const { teamId, teamName, teamLogo, teamCountry, teamCode, teamNational } =
    route.params

  const TeamHeader = () => {
    return (
      <>
        <PageFollowHeader
          teamId={teamId}
          teamLogo={teamLogo}
          teamName={teamName}
          teamCountry={teamCountry}
          teamCode={teamCode}
          teamNational={teamNational}
          // primaryColor={primaryColor}
          // setPrimaryColor={setPrimaryColor}
        />
      </>
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
        Header={TeamHeader}
        activeBgColor={colors.dark}
        variant="dark"
        variantColor={colors.dark}
        TabViewData={[
          // {
          //   name: 'Matches',
          //   component: <TeamSquadsSection />,
          // },
          {
            name: 'Squad',
            component: <TeamSquadsSection teamId={teamId} />,
          },
          {
            name: 'Stats',
            component: <TeamStatsSection teamId={teamId} />,
          },
          //   {
          //     name: 'Matches',
          //     component: <LeagueMatchSection />,
          //   },
          //   {
          //     name: 'Table',
          //     component: <TrendingNewsSection />,
          //   },
          //   {
          //     name: 'Stats',
          //     component: <LeagueStatsSection />,
          //   },
          {
            name: 'News',
            component: <TeamNewsSection teamId={teamId} />,
          },
        ]}
      />
    </>
  )
}

export default TeamDetails

const styles = StyleSheet.create({})
