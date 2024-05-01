import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from '../../../components/common/Card'
import Heading from '../../../components/common/Heading'
import { spacing } from '../../../utils/UIRules/spacing'
import footballApiFixturesService from '../../../service/footballApi/fixture'
import NormalText from '../../../components/NormalText'
import { colors } from '../../../utils/UIRules/colors'
import Spacer from '../../../components/common/Spacer'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'

const UpComingFiveMatches = ({ teamId, season, league }) => {
  const [upcomingFivefixtures, setUpcomingFiveFixtures] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    if ((teamId, season, league)) {
      FetchUpcomingFiveFixtures()
    }
  }, [teamId, season, league])

  const FetchUpcomingFiveFixtures = async () => {
    const sendingValues = {
      team: teamId,
      season,
      league,
      next: 5,
    }
    try {
      const fixturesApiData = await footballApiFixturesService.getFixtures(
        sendingValues
      )
      // fixturesData
      if (fixturesApiData) {
        setUpcomingFiveFixtures(fixturesApiData)
      }
    } catch (err) {
      // alert(err.message)
      // alert(JSON.stringify(err))
      // setLoading(false)
    }
  }

  const getTeamSide = (teamsInfo, date) => {
    const matchDate = moment(date).format('MM / DD')
    const teamsData = { teamSide: {}, otherSide: {} }

    if (teamsInfo.home.id === teamId) {
      teamsData['teamSide'] = {
        ...teamsInfo.home,
        side: 'Home',
        date: matchDate,
      }
      teamsData['otherSide'] = {
        ...teamsInfo.away,
        side: 'Away',
        date: matchDate,
      }
    } else if (teamsInfo.away.id === teamId) {
      teamsData['teamSide'] = {
        ...teamsInfo.away,
        side: 'Away',
        date: matchDate,
      }
      teamsData['otherSide'] = {
        ...teamsInfo.home,
        side: 'Home',
        date: matchDate,
      }
    }

    return teamsData

    // teamSide: {goal}, awaySide: {goal}
  }

  const emptyViews = 5 - upcomingFivefixtures.length
  return (
    <>
      {upcomingFivefixtures?.length > 0 && (
        <>
          <Spacer space="lg" />
          <Card marginRight={0} contentPadding={0} contentPaddingBottom={2}>
            <View style={styles.container}>
              <Heading
                text={'Upcoming Matches'}
                type="h5"
                fontType="semiBold"
                containerStyle={{ width: 'auto' }}
              />
              <Spacer space="md" />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                {upcomingFivefixtures?.length > 0 &&
                  upcomingFivefixtures.map((cur, i) => (
                    <TouchableOpacity
                      key={i}
                      style={{ alignItems: 'center' }}
                      onPress={() => {
                        navigation.push('FixtureDetails', {
                          fixtureId: cur.fixture.id,
                          leagueId: cur.league.id,
                          shortStatus: cur.fixture.status.short,
                          date: cur.fixture.date,
                        })
                      }}
                    >
                      <View
                        style={{
                          paddingVertical: 4,
                          paddingHorizontal: 4,
                          backgroundColor:
                            getTeamSide(cur.teams).teamSide.side === 'Home'
                              ? colors.primary
                              : getTeamSide(cur.teams).teamSide.side === 'Away'
                              ? colors.warning
                              : colors.gray2,
                          borderRadius: spacing.sm,
                          marginBottom: 14,
                        }}
                      >
                        <NormalText
                          containerMarginRight={0}
                          fontFamily="bold"
                          fontSize={'body13'}
                          color="white"
                        >
                          {
                            getTeamSide(cur.teams, cur.fixture.date)?.teamSide
                              .date
                          }
                        </NormalText>
                      </View>

                      <Image
                        source={{ uri: getTeamSide(cur.teams)?.otherSide.logo }}
                        style={{ height: 30, width: 30, resizeMode: 'contain' }}
                      />
                    </TouchableOpacity>
                  ))}

                {Array.from({ length: emptyViews }, (_, index) => (
                  <View
                    key={`empty_${index}`}
                    style={{ height: 30, width: 30 }}
                  />
                ))}
              </View>
            </View>
          </Card>
        </>
      )}
    </>
  )
}

export default UpComingFiveMatches

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
})
