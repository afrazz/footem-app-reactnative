import { RefreshControl, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import FixtureBlock from '../../components/common/FixtureBlock'
import { Tabs } from 'react-native-collapsible-tab-view'
import footballApiFixturesService from '../../service/footballApi/fixture'
import Spacer from '../../components/common/Spacer'
import NormalText from '../../components/NormalText'
import { spacing } from '../../utils/UIRules/spacing'
import moment from 'moment'
import Nodata from '../../components/common/Nodata'
import { useSelector } from 'react-redux'
import { h2hFixturesDummy } from '../../dummyDatas/fixture'
import { getMatchStatus } from '../../utils/functions'
import FullScreenLoader from '../../components/common/FullScreenLoader'
import { Divider, useTheme } from 'react-native-paper'
import { colors } from '../../utils/UIRules/colors'

const H2hSection = () => {
  const [h2hFixtures, setH2hFixtures] = useState([])
  const { fixtureDetails } = useSelector((state) => state.fixtureDetails)
  const [loading, setLoading] = useState(false)

  const theme = useTheme()

  const getH2hFixtures = async () => {
    setLoading(true)

    try {
      const h2hDatas = await footballApiFixturesService.getH2hFixtures({
        h2h: `${fixtureDetails?.teams?.home?.id}-${fixtureDetails.teams.away?.id}`,
        last: 10,
      })
      if (h2hDatas) {
        setH2hFixtures(h2hDatas)
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }

    // setH2hFixtures(h2hFixturesDummy)
  }

  useEffect(() => {
    if (fixtureDetails) {
      getH2hFixtures()
    }
  }, [fixtureDetails])

  return (
    <Tabs.ScrollView
      style={{
        paddingHorizontal: spacing.md,
        backgroundColor: theme.colors.background,
      }}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={getH2hFixtures} />
      }
    >
      <>
        {h2hFixtures?.length > 0 ? (
          h2hFixtures.map((fixture, i) => (
            <>
              <FixtureBlock
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
                logo={fixture.teams.logo}
                fixtureId={fixture?.fixture?.id}
                leagueId={fixture?.league?.id}
                shortStatus={fixture?.fixture?.status?.short}
                date={fixture?.fixture?.date}
              />
              <Spacer space="lg" />
              <Divider style={{ backgroundColor: colors.gray4 }} />
            </>
          ))
        ) : (
          <>
            <Spacer space="md" />
            <Nodata
              // isImageShow={false}
              title="No Results To Show"
              description="Currently We are not Having H2H Info Right Now"
            />
          </>
        )}
      </>

      {/* <FixtureBlock
        matchStatus={
          // fixture?.goals?.home !== null && fixture?.goals?.away !== null
          //   ? `${fixture?.goals?.home} - ${fixture?.goals?.away}`
          //   : moment(fixture?.fixture?.date).format('hh:mm a')'
          '2 - 1'
        }
        // team1={fixture.teams.home}
        // team2={fixture.teams.away}
        team1={{
          name: 'Newcastle',
          logo: 'https://media-3.api-sports.io/football/teams/34.png',
        }}
        team2={{
          name: 'Newcastle',
          logo: 'https://media-3.api-sports.io/football/teams/34.png',
        }}
        // penalty={fixture?.score?.penalty}
        penalty={{ home: null, away: null }}
        // matchTime={fixture?.fixture?.status?.elapsed}
        matchTime={'90'}
        // logo={fixture.teams.logo}
        // fixtureId={'fixture?.fixture?.id'}
        // leagueId={fixture?.league?.id}
        fixtureId={'1121'}
        leagueId={'1222'}
      /> */}
    </Tabs.ScrollView>
  )
}

export default H2hSection

const styles = StyleSheet.create({})
