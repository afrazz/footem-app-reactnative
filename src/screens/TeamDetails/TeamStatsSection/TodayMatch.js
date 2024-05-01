import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'
import footballApiFixturesService from '../../../service/footballApi/fixture'
import FixtureBlock from '../../../components/common/FixtureBlock'

import { useFocusEffect } from '@react-navigation/native'
import { getMatchStatus } from '../../../utils/functions'
import { colors } from '../../../utils/UIRules/colors'
import { spacing } from '../../../utils/UIRules/spacing'
import Card from '../../../components/common/Card'
import Heading from '../../../components/common/Heading'
import Spacer from '../../../components/common/Spacer'

const TodayMatch = ({ selectedLeague, teamId }) => {
  const [todayMatch, setTodayMatch] = useState(null)

  const { timezone } = useSelector((state) => state.auth)

  const getTodayMatch = async () => {
    console.log('juuu')
    const date = moment().format('YYYY-MM-DD')
    const league = selectedLeague?.value
    const season = selectedLeague?.season

    const match = await footballApiFixturesService.getFixtures({
      date,
      league,
      season,
      timezone,
      team: teamId,
    })
    setTodayMatch(match?.length > 0 ? match[0] : null)

    return match?.length > 0 ? match[0] : null
  }

  useFocusEffect(
    React.useCallback(() => {
      let interval
      // alert(JSON.stringify(route.params))
      getTodayMatch().then((matchData) => {
        if (matchData) {
          const status = matchData?.fixture.status.short

          if (
            status === 'NS' ||
            status === '1H' ||
            status === 'HT' ||
            status === '2H' ||
            status === 'ET' ||
            status === 'BT' ||
            status === 'P' ||
            status === 'SUSP' ||
            status === 'INT' ||
            status === 'LIVE'
          ) {
            console.log(status, 'juuu')
            interval = setInterval(() => {
              //   console.log(status)
              getTodayMatch()
              // console.log(`Running-recurrent for ${matchData?.fixture.id}`)
            }, 60000)
          }
        }
      })

      // let isMatchIsToday = fixtureDetails?.fixture?.date
      //   ? moment(fixtureDetails?.fixture?.date).isSame(new Date(), 'day')
      //   : moment(date).isSame(new Date(), 'day')

      // // alert(`${isMatchIsToday}, ${status}`)

      // let interval

      // if (
      //   isMatchIsToday &&
      //   (status === 'NS' ||
      //     status === '1H' ||
      //     status === 'HT' ||
      //     status === '2H' ||
      //     status === 'ET' ||
      //     status === 'BT' ||
      //     status === 'P' ||
      //     status === 'SUSP' ||
      //     status === 'INT' ||
      //     status === 'LIVE')
      // ) {
      //   interval = setInterval(() => {
      //     dispatch(fetchFixtureDetails(fixtureId))
      //     console.log(`Running-recurrent for ${fixtureId}`)
      //   }, 60000)
      // }
      // alert(JSON.stringify(todayMatch))

      return () => {
        clearInterval(interval)
        // TODO: un comment this in Real Api calls
        // dispatch(setIsInitialFixtureDetailsLoading(true))
        // setLeagueAccessSections({})
        // Dimensions.removeEventListener('change', updateOrientation)
      }
    }, [selectedLeague])
  )

  return (
    <>
      {todayMatch ? (
        <View>
          <Spacer space="lg" />
          <Card marginRight={0} contentPadding={0} contentPaddingBottom={2}>
            <View style={styles.container}>
              <Heading
                text={'Today Match'}
                type="h5"
                fontType="semiBold"
                containerStyle={{ width: 'auto' }}
              />

              <Spacer space="md" />
              <FixtureBlock
                paddingTopEnabled={false}
                matchStatus={
                  todayMatch?.goals?.home !== null &&
                  todayMatch?.goals?.away !== null
                    ? `${todayMatch?.goals?.home} - ${todayMatch?.goals?.away}`
                    : moment(todayMatch?.fixture?.date).format('hh:mm a')
                }
                team1={todayMatch.teams.home}
                team2={todayMatch.teams.away}
                penalty={todayMatch?.score?.penalty}
                matchTime={getMatchStatus(
                  todayMatch?.fixture?.status?.short,
                  todayMatch?.fixture?.status?.elapsed
                )}
                shortStatus={todayMatch?.fixture?.status?.short}
                date={todayMatch?.date}
                logo={todayMatch.teams.logo}
                fixtureId={todayMatch?.fixture?.id}
                leagueId={todayMatch?.league?.id}
              />
            </View>
          </Card>
        </View>
      ) : null}
    </>
  )
}

export default TodayMatch

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
})
