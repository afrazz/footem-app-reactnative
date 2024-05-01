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

const LatFiveMatches = ({ teamId, season, league }) => {
  const [lastFivefixtures, setLastFiveFixtures] = useState([])
  const navigation = useNavigation()

  console.log(teamId, season, league, 'LAST-FIVE-MATCHES')

  useEffect(() => {
    if ((teamId, season, league)) {
      FetchLastFiveFixtures()
    }
  }, [teamId, season, league])

  const FetchLastFiveFixtures = async () => {
    const sendingValues = {
      team: teamId,
      season,
      league,
      last: 5,
    }
    try {
      const fixturesApiData = await footballApiFixturesService.getFixtures(
        sendingValues
      )
      // fixturesData
      if (fixturesApiData) {
        setLastFiveFixtures(fixturesApiData)
      }
    } catch (err) {
      // alert(err.message)
      // alert(JSON.stringify(err))
      // setLoading(false)
    }
  }

  const getTeamSide = (teamsInfo, goals = {}) => {
    const teamsData = { teamSide: {}, otherSide: {} }

    if (teamsInfo.home.id === teamId) {
      teamsData['teamSide'] = { ...teamsInfo.home, goals: goals.home }
      teamsData['otherSide'] = { ...teamsInfo.away, goals: goals.away }
    } else if (teamsInfo.away.id === teamId) {
      teamsData['teamSide'] = { ...teamsInfo.away, goals: goals.away }
      teamsData['otherSide'] = { ...teamsInfo.home, goals: goals.home }
    }

    alert(JSON.stringify(teamsData))

    return teamsData

    // teamSide: {goal}, awaySide: {goal}
  }

  const emptyViews = 5 - lastFivefixtures.length
  return (
    <>
      {lastFivefixtures?.length > 0 && (
        <>
          <Spacer space="lg" />

          <Card marginRight={0} contentPadding={0} contentPaddingBottom={2}>
            <View style={styles.container}>
              <Heading
                text={'Last Five Matches'}
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
                {lastFivefixtures?.length > 0 &&
                  lastFivefixtures.map((cur, i) => (
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
                            getTeamSide(cur.teams).teamSide.winner === true
                              ? colors.primary
                              : getTeamSide(cur.teams).otherSide.winner === true
                              ? colors.danger
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
                          {getTeamSide(cur.teams, cur.goals)?.teamSide.goals +
                            ' - ' +
                            getTeamSide(cur.teams, cur.goals)?.otherSide.goals}
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

export default LatFiveMatches

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
})
