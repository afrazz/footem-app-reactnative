/* eslint-disable no-constant-condition */
/* eslint-disable react/no-unescaped-entities */
import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/common/Header'
import TopTabView from '../../components/common/TopTabView'
import NewsSection from '../News/NewsSection'
import FixtureStatisticsSection from './FixtureStatisticsSection'
import FixtureHeaderSection from './FixtureDetailsHeaderSection'
import FixtureLineupSection from './FixtureLinupSection/index'
import footballApiLeagueService from '../../service/footballApi/leagueService'
import H2h from './H2hSection'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFixtureDetails } from '../../redux/slices/footballApi/fixtureDetailsSlice'
import { ActivityIndicator } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native'
// import { setIsInitialFixtureDetailsLoading } from '../../redux/slices/footballApi/fixtureDetailsSlice'
import H2hSection from './H2hSection'
import moment from 'moment'
import FullScreenLoader from '../../components/common/FullScreenLoader'

const FixtureDetails = ({ route }) => {
  const { fixtureId, leagueId, shortStatus, date } = route.params

  const { timezone } = useSelector((state) => state.auth)

  const [leagueAccessSections, setLeagueAccessSections] = useState({
    events: true,
    lineups: true,
    statistics_fixtures: true,
    statistics_players: true,
  })
  const {
    isInitialFixtureDetailsLoading,
    fixtureDetails,
    fixtureDetailsLoading,
  } = useSelector((state) => state.fixtureDetails)

  // Recurring
  // NS =>  is today date
  // 1H
  // HT
  // 2H
  // ET
  // BT
  // P
  // SUSP => is Today Date
  // INT => is Today Date
  // LIVE

  let status = shortStatus
  if (fixtureDetails?.fixture?.status?.short) {
    status = fixtureDetails.fixture.status.short
    console.log(`dddddd`, fixtureDetails.fixture.status.short)
  }

  console.log('here', shortStatus, fixtureDetails?.fixture?.status?.short)

  // let status = fixtureDetails.fixture.status.short
  //   ? fixtureDetails.fixture.status.short
  //   : shortStatus

  // const matchDateShow = fixtureDetails?.fixture?.date ? moment(fixtureDetails?.fixture?.date).format('YYYY-MM-DD')

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // setLoading(true)
  //     dispatch(fetchFixtureDetails(fixtureId))

  //     alert(status)

  //     // alert('hitting..')
  //     // Do something when the screen is focused
  //     //Implementing the setInterval method
  //     // let interval

  //     // const today = moment().format('YYYY-MM-DD')

  //     // // Here checks if isLive or Today if it's true
  //     // if (isLive || moment(date).isSame(today, 'day')) {
  //     //   interval = setInterval(() => {
  //     //     fetchFixtures()
  //     //     console.log(`Running-recurrent for ${isLive ? 'Live' : date}`)
  //     //   }, 60000)
  //     // }

  //     // return () => {
  //     //   clearInterval(interval)
  //     //   // Dimensions.removeEventListener('change', updateOrientation)
  //     // }
  //   }, [])
  // )

  useFocusEffect(
    React.useCallback(() => {
      // alert(JSON.stringify(route.params))
      dispatch(fetchFixtureDetails({ id: fixtureId, timezone }))

      let isMatchIsToday = fixtureDetails?.fixture?.date
        ? moment(fixtureDetails?.fixture?.date).isSame(new Date(), 'day')
        : moment(date).isSame(new Date(), 'day')

      // alert(`${isMatchIsToday}, ${status}`)

      let interval

      if (
        isMatchIsToday &&
        (status === 'NS' ||
          status === '1H' ||
          status === 'HT' ||
          status === '2H' ||
          status === 'ET' ||
          status === 'BT' ||
          status === 'P' ||
          status === 'SUSP' ||
          status === 'INT' ||
          status === 'LIVE')
      ) {
        interval = setInterval(() => {
          dispatch(fetchFixtureDetails(fixtureId))
          console.log(`Running-recurrent for ${fixtureId}`)
        }, 60000)
      }

      return () => {
        clearInterval(interval)
        // TODO: un comment this in Real Api calls
        // dispatch(setIsInitialFixtureDetailsLoading(true))
        // setLeagueAccessSections({})
        // Dimensions.removeEventListener('change', updateOrientation)
      }
    }, [fixtureId])
  )

  // {
  //   events: true,
  //   lineups: true,
  //   statistics_fixtures: true,
  //   statistics_players: true,
  // }

  const dispatch = useDispatch()

  // TODO: Uncomment it
  const fetchFixtureSectionAccess = async () => {
    // const leagueDetails = await footballApiLeagueService.getLeagues({
    //   id: leagueId,
    // })
    // if (leagueDetails) {
    //   alert(JSON.stringify(leagueDetails))
    //   const accessSections = leagueDetails[0].seasons.coverage.fixtures
    //   setLeagueAccessSections(accessSections)
    // }
    setLeagueAccessSections({
      events: true,
      lineups: true,
      statistics_fixtures: true,
      statistics_players: true,
    })
  }

  useEffect(() => {
    fetchFixtureSectionAccess()
  }, [])

  // useEffect(() => {
  //   dispatch(fetchFixtureDetails(fixtureId))
  // }, [])

  let Tabs = [
    {
      name: 'Statistic',
      component: <FixtureStatisticsSection fixtureId={fixtureId} />,
    },
    {
      name: 'Playing Eleven',
      component: (
        <FixtureLineupSection
          statisticsPlayersAccessFound={
            leagueAccessSections?.statistics_players
          }
          fixtureId={fixtureId}
        />
      ),
    },
    {
      name: 'H2H',
      component: <H2hSection />,
    },
  ]

  const removeTab = (value) => {
    // alert('Removing...')
    const index = Tabs.findIndex((tab) => tab.name === value)
    if (index > -1) {
      Tabs.splice(index, 1)
    }
  }

  // alert(JSON.stringify(leagueAccessSections))

  if (!leagueAccessSections.statistics_fixtures) {
    removeTab('Statistic')

    // Tabs.push({
    //   name: 'Statistics',
    //   component: <FixtureStatisticsSection fixtureId={fixtureId} />,
    // })
  }

  if (!leagueAccessSections.lineups) {
    removeTab('Playing Eleven')
    // Tabs.push({
    //   name: 'Playing Elevens',
    //   component: (
    //     <FixtureLineupSection
    //       statisticsPlayersAccessFound={
    //         leagueAccessSections?.statistics_players
    //       }
    //     />
    //   ),
    // })
  }

  // Tabs.push({
  //   name: 'H2Hs',
  //   component: <H2h />,
  // })

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      {/* TODO: Make it isInitialFixtureDetailsLoading */}
      {fixtureDetailsLoading ? (
        <FullScreenLoader />
      ) : (
        // <ActivityIndicator animating={true} size={'large'} color="primary" />
        <>
          <Header title="Match Details" backButtonEnabled />

          <TopTabView
            Header={() => <FixtureHeaderSection fixtureId={fixtureId} />}
            TabsSpacingTop={0}
            TabViewData={Tabs}
          />
        </>
      )}
    </View>
  )
}

export default FixtureDetails
