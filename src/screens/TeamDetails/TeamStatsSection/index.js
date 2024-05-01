import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tabs } from 'react-native-collapsible-tab-view'
import { spacing } from '../../../utils/UIRules/spacing'
import { colors } from '../../../utils/UIRules/colors'
import DropDown from '../../../components/common/Dropdown'
import Spacer from '../../../components/common/Spacer'
import StatsCard from '../../../components/common/StatsCard'
import LastFiveMatchesResultSection from './LastFiveMatchesResultSection'
import PointTable from '../../../components/common/PointTable'
import CardTypeDataDetails from '../../../components/common/CardTypeDataDetails'
import footballApiLeagueService from '../../../service/footballApi/leagueService'
import footballApiteamService from '../../../service/footballApi/teamService'
import footballApiStandingService from '../../../service/footballApi/standingService'
import FullScreenLoader from '../../../components/common/FullScreenLoader'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import LastFiveMatches from './LastFiveMatches'
import UpComingFiveMatches from './UpComingFiveMatches'
import footballApiFixturesService from '../../../service/footballApi/fixture'
import moment from 'moment'
import { useSelector } from 'react-redux'
import TodayMatch from './TodayMatch'
import { useTheme } from 'react-native-paper'

const leaguesData = [
  {
    league: {
      id: 490,
      name: 'World Cup - U20',
      type: 'Cup',
      logo: 'https://media-2.api-sports.io/football/leagues/490.png',
    },
    country: {
      name: 'World',
      code: null,
      flag: null,
    },
    seasons: {
      year: 2023,
      start: '2023-05-20',
      end: '2023-06-11',
      current: true,
      coverage: {
        fixtures: {
          events: true,
          lineups: true,
          statistics_fixtures: true,
          statistics_players: true,
        },
        standings: false,
        players: false,
        top_scorers: false,
        top_assists: false,
        top_cards: false,
        injuries: false,
        predictions: true,
        odds: false,
      },
    },
  },
  {
    league: {
      id: 773,
      name: 'Sudamericano U20',
      type: 'Cup',
      logo: 'https://media-3.api-sports.io/football/leagues/773.png',
    },
    country: {
      name: 'World',
      code: null,
      flag: null,
    },
    seasons: {
      year: 2023,
      start: '2023-01-18',
      end: '2023-02-12',
      current: true,
      coverage: {
        fixtures: {
          events: true,
          lineups: true,
          statistics_fixtures: false,
          statistics_players: false,
        },
        standings: false,
        players: false,
        top_scorers: false,
        top_assists: false,
        top_cards: false,
        injuries: false,
        predictions: true,
        odds: false,
      },
    },
  },
  {
    league: {
      id: 940,
      name: 'COTIF Tournament',
      type: 'Cup',
      logo: 'https://media-1.api-sports.io/football/leagues/940.png',
    },
    country: {
      name: 'World',
      code: null,
      flag: null,
    },
    seasons: {
      year: 2022,
      start: '2022-07-28',
      end: '2022-08-07',
      current: true,
      coverage: {
        fixtures: {
          events: false,
          lineups: false,
          statistics_fixtures: false,
          statistics_players: false,
        },
        standings: false,
        players: false,
        top_scorers: false,
        top_assists: false,
        top_cards: false,
        injuries: false,
        predictions: true,
        odds: false,
      },
    },
  },
]

const TeamStatsSection = ({ teamId }) => {
  const theme = useTheme()
  const [leagues, setLeagues] = useState([])
  const [selectedLeague, setSelectedLeague] = useState({})

  const [teamStatitics, setTeamStatitics] = useState({})

  const [teamStanding, setTeamStanding] = useState([])

  const [loading, setLoading] = useState(true)

  const navigation = useNavigation()

  useEffect(() => {
    if (teamId) {
      // getTeamLeagues()
      getTeamLeagues()
    }
  }, [teamId])

  console.log(teamStanding, 'heuehe')

  const getTeamLeagues = async () => {
    const teamLeagues = await footballApiLeagueService.getLeagues({
      team: teamId,
    })
    // const teamLeagues = leaguesData

    const formattedLeaguesData = teamLeagues.map((league) => {
      return {
        label: league.league.name,
        image: league.league.logo,
        value: league.league.id,
        season: league.seasons.year,
        standing: league.seasons.coverage.standings,
      }
    })

    // Intial fromatted data for dropdown needs Setting...
    setSelectedLeague(formattedLeaguesData[0])

    setLeagues(formattedLeaguesData)
  }

  const getTeamStatitics = async () => {
    try {
      const teamStatitics = await footballApiteamService.getTeamStatitics({
        team: teamId,
        season: selectedLeague.season,
        league: selectedLeague.value,
      })

      setTeamStatitics(teamStatitics)
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  console.log(selectedLeague, 'will')

  const getTeamStanding = async () => {
    const teamStanding = await footballApiStandingService.getStandings({
      team: teamId,
      season: selectedLeague.season,
      league: selectedLeague.value,
    })

    // alert(JSON.stringify(teamStanding))

    setTeamStanding(teamStanding)
  }

  // const formatLeagueDataDropDown = (leagueData) => {
  //   const dropDownLeagueData = leagueData.map((league) => {
  //     return {
  //       label: league.league.name,
  //       image: league.league.logo,
  //       value: league.league.id,
  //       season: league.seasons.year,
  //     }
  //   })

  //   return dropDownLeagueData
  // }

  useEffect(() => {
    if (selectedLeague?.value) {
      getTeamStatitics()
      // getTodayMatch()
      if (selectedLeague.standing) {
        getTeamStanding()
      }
    }
  }, [selectedLeague])

  const formattedBigWinData = (data) => {
    const result = {}

    if (data?.wins) {
      result['Biggest Home Win'] = data?.wins?.home || '-'
      result['Biggest Away Win'] = data?.wins?.away || '-'
    }

    if (data?.loses) {
      result['Biggest Home Lose'] = data?.loses?.home || '-'
      result['Biggest Away Lose'] = data?.loses?.away || '-'
    }

    return result
  }

  // alert(JSON.stringify(teamStanding))

  return (
    <Tabs.ScrollView
      style={[styles.container, { backgroundColor: theme.colors.greyishBg }]}
      stickyHeaderIndices={[0]}
    >
      <View style={styles.dropdownContainer}>
        <DropDown
          options={leagues}
          setValue={setSelectedLeague}
          value={selectedLeague}
        />
      </View>
      {loading ? (
        <FullScreenLoader />
      ) : (
        <View style={{ paddingHorizontal: spacing.sm }}>
          <Spacer space="lg" />
          <View style={styles.statsCardContainer}>
            <StatsCard
              label="Played"
              value={teamStatitics?.fixtures?.played?.total}
            />
            <StatsCard
              label="Wins"
              value={teamStatitics?.fixtures?.wins?.total}
              isActive
            />
            <StatsCard
              label="Loses"
              value={teamStatitics?.fixtures?.loses?.total}
            />
            <StatsCard
              label="Draws"
              value={teamStatitics?.fixtures?.draws?.total}
              isActive
            />
          </View>

          <TodayMatch selectedLeague={selectedLeague} teamId={teamId} />

          <LastFiveMatches
            teamId={teamId}
            season={selectedLeague.season}
            league={selectedLeague.value}
          />

          <UpComingFiveMatches
            teamId={teamId}
            season={selectedLeague.season}
            league={selectedLeague.value}
          />
          {/* <LastFiveMatchesResultSection
            data={teamStatitics?.form
              ?.substr(
                teamStatitics?.form?.length -
                  (teamStatitics?.form?.length < 5
                    ? teamStatitics?.form?.length
                    : 5)
              )
              .split('')}
          /> */}
          <Spacer space="lg" />
          {selectedLeague?.standing && teamStanding?.id && (
            <>
              <PointTable data={teamStanding?.standings[0]} clickable={false} />
              <Spacer space="lg" />
            </>
          )}

          {teamStatitics?.goals?.for?.total?.total !== null && (
            <CardTypeDataDetails
              title={'Goals'}
              data={teamStatitics?.goals?.for?.total}
            />
          )}

          {teamStatitics?.biggest !== null && (
            <>
              <Spacer space="md" />
              <CardTypeDataDetails
                title={'Biggest Events'}
                data={formattedBigWinData(teamStatitics?.biggest)}
              />
            </>
          )}

          {teamStatitics?.clean_sheet?.total !== null && (
            <>
              <Spacer space="md" />
              <CardTypeDataDetails
                title={'Clean Sheets'}
                data={teamStatitics?.clean_sheet}
              />
            </>
          )}

          {teamStatitics?.penalty?.total !== null && (
            <>
              <Spacer space="md" />
              <CardTypeDataDetails
                title={'Penalty'}
                data={{
                  scored: teamStatitics?.penalty?.scored?.total,
                  missed: teamStatitics?.penalty?.missed?.total,
                  total: teamStatitics?.penalty?.total,
                }}
              />
            </>
          )}

          <Spacer space="lg" />
          {/* <CardTypeDataDetails title={'Biggest Wins'} /> */}
        </View>
      )}
    </Tabs.ScrollView>
  )
}

export default TeamStatsSection

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // height: 600,
  },
  statsCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 10000,
    backgroundColor: colors.white,
  },
  // tournamentStatsContainer: {
  //   padding: spacing.md,
  // },
})

// SEO, or search engine optimization, is the process of optimising a website or web page to rank higher in search engine results pages (SERPs) for specific keywords or phrases. SEO aims to improve organic search traffic by increasing a website's visibility and relevance. SEO techniques include keyword research, on-page optimization, off-page optimization, and technical SEO.

// Social media marketing is the process of using social media platforms such as Facebook, Twitter, Instagram, LinkedIn, and others to promote a product or service. It involves creating and sharing content on these platforms to engage with a target audience, build brand awareness, and ultimately drive traffic and sales, creating a social media strategy.
