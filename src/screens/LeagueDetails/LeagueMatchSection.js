import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FixtureBlock from '../../components/common/FixtureBlock'
import { Tabs } from 'react-native-collapsible-tab-view'
import { spacing } from '../../utils/UIRules/spacing'
import { colors } from '../../utils/UIRules/colors'
import Card from '../../components/common/Card'
import CenteredTextWithLines from '../../components/common/CenteredTextWithLines'
import Spacer from '../../components/common/Spacer'
import { useSelector } from 'react-redux'
import footballApiFixturesService from '../../service/footballApi/fixture'
import FullScreenLoader from '../../components/common/FullScreenLoader'
import Nodata from '../../components/common/Nodata'
import AccordianBlock from '../../components/common/AccordianBlock'
import moment from 'moment'
import { getMatchStatus } from '../../utils/functions'

const LeagueMatchSection = ({ leagueId, leagueSeason }) => {
  const [loading, setLoading] = useState(false)
  const [fixtures, setFixtures] = useState([])

  const [fixtureRounds, setFixtureRounds] = useState([])
  const [selectedRound, setSelectedRound] = useState({})

  const { timezone } = useSelector((state) => state.auth)

  const fetchFixtures = async () => {
    setLoading(true)

    const sendingQueries = {
      timezone: timezone,
      league: leagueId,
      season: leagueSeason,
      date: moment().format('YYYY-MM-DD'),
    }

    // if (date) {
    //   sendingQueries['date'] = date
    // }

    // if (isLive) {
    //   sendingQueries['live'] = 'all'
    // }

    const fixturesApiData = await footballApiFixturesService.getFixtures(
      sendingQueries
    )

    setLoading(false)
    // fixturesData
    setFixtures(fixturesApiData)
  }

  useEffect(() => {
    if (leagueId && leagueSeason) {
      // fetchFixtures()
      fetchFixtureRounds({ league: leagueId, season: leagueSeason })
    }
  }, [leagueId, leagueSeason])

  const fetchFixtureRounds = async (query, isCurrent) => {
    const fixturesRounds = await footballApiFixturesService.getFixtureRounds(
      query
    )
    // if(isCurrent) {
    //   setSelectedRound(fixturesRounds)
    // }

    setFixtureRounds(fixturesRounds)
  }

  return (
    <Tabs.ScrollView style={styles.container}>
      <CenteredTextWithLines text="Today" />

      <Tabs.FlatList
        data={fixtures}
        renderItem={({ item }) => (
          // <>
          //   <Text>{JSON.stringify(item?.fixture)}</Text>
          //   <Text>{JSON.stringify(item?.league)}</Text>
          //   <Text>{JSON.stringify(item?.teams)}</Text>
          // </>
          <FixtureBlock
            // key={i}
            matchStatus={
              item?.goals?.home !== null && item?.goals?.away !== null
                ? `${item?.goals?.home} - ${item?.goals?.away}`
                : moment(item?.item?.date).format('hh:mm a')
            }
            team1={item.teams.home}
            team2={item.teams.away}
            penalty={item?.score?.penalty}
            matchTime={getMatchStatus(
              item?.fixture?.status?.short,
              item?.fixture?.status?.elapsed
            )}
            shortStatus={item?.fixture?.status?.short}
            date={item?.date}
            logo={item.teams.logo}
            fixtureId={item?.fixture?.id}
            leagueId={item?.league?.id}
          />
        )}
        keyExtractor={(item, index) => index}
        contentContainerStyle={{ paddingTop: 0 }}
        ListFooterComponent={loading && <FullScreenLoader />}
        ListEmptyComponent={
          !loading && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 0.5,
              }}
            >
              <Nodata
                isImageShow={false}
                title="No Results To Show"
                description="We'll Update Soon with latest results"
              />
            </View>
          )
        }
      />

      {/* <FixtureBlock
              key={i}
              matchStatus={
                fixture?.goals?.home !== null && fixture?.goals?.away !== null
                  ? `${fixture?.goals?.home} - ${fixture?.goals?.away}`
                  : moment(fixture?.fixture?.date).format('hh:mm a')
              }
              team1={fixture.teams.home}
              team2={fixture.teams.away}
              penalty={fixture?.score?.penalty}
              matchTime={getMatchStatus(
                fixture?.fixture?.status?.short,
                fixture?.fixture?.status?.elapsed
              )}
              shortStatus={fixture?.fixture?.status?.short}
              date={fixture?.date}
              logo={fixture.teams.logo}
              fixtureId={fixture?.fixture?.id}
              leagueId={fixture?.league?.id}
            /> */}

      {/* <FixtureBlock
        matchStatus={'2 - 2'}
        team1="Barcelona"
        team2="Real Madrid"
        matchTime="FT"
      />
      <FixtureBlock
        matchStatus={'12:00pm'}
        team1="Argentina Fc"
        team2="Real Madrid"
        // matchTime="65"
      />
      <FixtureBlock
        matchStatus={'12:00pm'}
        team1="Barcelona"
        team2="Kerala Blaster FC"
      />
      <Spacer space="lg" />

      <CenteredTextWithLines text="Tommorow" />
      <FixtureBlock
        matchStatus={'2 - 2'}
        team1="Barcelona"
        team2="Real Madrid"
        matchTime="FT"
      />
      <FixtureBlock
        matchStatus={'12:00pm'}
        team1="Barcelona"
        team2="Real Madrid"
        // matchTime="65"
      />
      <FixtureBlock
        matchStatus={'12:00pm'}
        team1="Barcelona"
        team2="Real Madrid"
      />
      <Spacer space="lg" />
      <CenteredTextWithLines text="29th July 2023" />
      <FixtureBlock
        matchStatus={'12:06pm'}
        team1="Barcelona"
        team2="Real Madrid"
      />
      <FixtureBlock
        matchStatus={'12:00am'}
        team1="Barcelona"
        team2="Real Madrid"
        // matchTime="65"
      />
      <FixtureBlock
        matchStatus={'12:00pm'}
        team1="Barcelona"
        team2="Real Madrid"
      /> */}
    </Tabs.ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    paddingTop: spacing.md,
    // marginTop: spacing.sm,
    // paddingBottom: 60,
  },
})

export default LeagueMatchSection
