/* eslint-disable react/prop-types */
import { Image, ScrollView, StyleSheet } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import Header from '../../components/common/Header'
import Spacer from '../../components/common/Spacer'
import SearchInput from '../../components/common/SearchInput'
import NormalText from '../../components/NormalText'
import { List } from 'react-native-paper'
import { spacing } from '../../utils/UIRules/spacing'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import Card from '../../components/common/Card'
import Heading from '../../components/common/Heading'
import footballApiteamService from '../../service/footballApi/teamService'
import footballApiLeagueService from '../../service/footballApi/leagueService'
import { useDispatch, useSelector } from 'react-redux'

import FollowListItem from '../../components/common/FollowListItem'
import userService from '../../service/user'
import { nationalTeams as nationalDummyTeams } from '../../dummyDatas/teams'
import { nationalLeagues as nationalLeaguesDummy } from '../../dummyDatas/leagues'
import Button from '../../components/common/Button/Button'
import {
  addLeagueFollow,
  addTeamFollow,
  fetchFollowingLeagues,
  fetchFollowingTeams,
  removeLeagueFollow,
  removeTeamFollow,
} from '../../redux/slices/followSlice'
import { getCountryCode } from '../../utils/functions'
import FullScreenLoader from '../../components/common/FullScreenLoader'

const SelectCompetition = ({ route, navigation }) => {
  const {
    followingTeams,
    followingLeagues,
    followingLeaguesLoading,
    followingTeamsLoading,
  } = useSelector((state) => state.follow)

  // const [nationTeamLoading, setNationalTeamLoading] = useState(false)
  // const [nationLeaguesLoading, setNationalLeaguesLoading] = useState(false)

  const [nationalTeams, setNationalTeams] = useState([])

  const [nationalLeagues, setNationalLeagues] = useState([])

  const { country } = route.params

  const dispatch = useDispatch()

  useEffect(() => {
    if (country) {
      fetchFootballApiNationalTeams()
      fetchFootballApiNationalLeagues()
    }
  }, [country])

  useEffect(() => {
    dispatch(fetchFollowingLeagues())
    dispatch(fetchFollowingTeams())
  }, [])

  const fetchFootballApiNationalTeams = async () => {
    console.log(country, 'COUNTRY')
    // setNationalLeaguesLoading(true)
    try {
      const fetchedNationalTeams = await footballApiteamService.getTeams({
        country,
      })

      const nationalTeams = fetchedNationalTeams.filter(
        ({ team }) => team.national
      )

      setNationalTeams(nationalTeams)
      // setNationalLeaguesLoading(false)
    } catch (err) {
      // setNationalLeaguesLoading(false)
    }
  }

  const fetchFootballApiNationalLeagues = async () => {
    // setNationalTeamLoading(true)
    try {
      const fetchedNationalLeagues = await footballApiLeagueService.getLeagues({
        country,
      })

      setNationalLeagues(fetchedNationalLeagues)
      // setNationalTeamLoading(false)
    } catch (err) {
      // setNationalTeamLoading(false)
    }
  }

  const isUserFollowedByTeam = (id) => {
    const isFollowingTeam = followingTeams.find(
      (team) => team.followingId == id
    )

    return isFollowingTeam ? true : false
  }

  const isUserFollowedByLeague = (id) => {
    const isFollowingLeague = followingLeagues.find(
      (league) => league.followingId == id
    )

    return isFollowingLeague ? true : false
  }

  const teamFollowHandler = async (followingId, logo, name, extraProps) => {
    const alreadyExistIndex = followingTeams.findIndex(
      (team) => team.followingId == followingId
    )

    if (alreadyExistIndex === -1) {
      dispatch(addTeamFollow({ followingId, logo, name, ...extraProps }))
    } else {
      dispatch(removeTeamFollow(followingId))
    }
  }

  const leagueFollowHandler = async (followingId, logo, name, extraProps) => {
    const alreadyExistIndex = followingLeagues.findIndex(
      (league) => league.followingId == followingId
    )

    if (alreadyExistIndex === -1) {
      if (extraProps) {
        dispatch(addLeagueFollow({ followingId, logo, name, ...extraProps }))
      } else {
        dispatch(addLeagueFollow({ followingId, logo, name }))
      }
    } else {
      dispatch(removeLeagueFollow(followingId))
    }
  }

  return (
    <>
      <Header title="Select Competition" backButtonEnabled />
      <Spacer space="md" />
      {followingLeaguesLoading || followingTeamsLoading ? (
        <FullScreenLoader />
      ) : (
        <ScrollView style={styles.container}>
          {/* International Teams*/}
          {nationalTeams?.length > 0 && (
            <Card marginRight={0}>
              <List.Section>
                <List.Subheader
                  style={{
                    paddingLeft: -spacing.md,
                    marginTop: -spacing.md,
                    marginBottom: -spacing.sm,
                  }}
                >
                  <Heading
                    text={'National Teams'}
                    type="h5"
                    // containerStyle={{ marginTop: -5 }}
                  />
                </List.Subheader>
                {nationalTeams?.map((item, index) => (
                  <FollowListItem
                    name={item?.team?.name}
                    imageUrl={item?.team?.logo}
                    // `https://cdn.ipregistry.co/flags/emojitwo/${getCountryCode(
                    //   item?.team?.country
                    // )}.png`
                    followingId={item?.team?.id}
                    isActive={isUserFollowedByTeam(item?.team?.id)}
                    key={item?.team?.id}
                    onPress={teamFollowHandler}
                    extraProps={{
                      code: item?.team?.code,
                      country: item?.team?.country,
                      national: item?.team?.national,
                    }}
                    onContainerPress={() =>
                      navigation.navigate('TeamDetails', {
                        teamId: item?.team?.id,
                        teamName: item?.team?.name,
                        teamLogo: item?.team?.national
                          ? getCountryCode(item?.team?.country)
                            ? `https://cdn.ipregistry.co/flags/emojitwo/${getCountryCode(
                                item?.team?.country
                              )}.png`
                            : item?.team?.logo
                          : item?.team?.logo,
                        teamCountry: item?.team?.national
                          ? item?.team?.country
                          : null,
                        teamCode: item?.team?.code,
                        teamNational: item?.team?.national,
                      })
                    }
                  />
                ))}
              </List.Section>

              {/* <Spacer space="sm" /> */}
            </Card>
          )}

          <Spacer space="md" />

          {/* Competitions */}
          {nationalLeagues?.length > 0 && (
            <Card
              marginRight={0}
              // borderRadius={spacing.md}
              marginBottom={spacing.md}
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
                    text={'Competitions'}
                    type="h5"
                    // containerStyle={{ marginTop: -5 }}
                  />
                </List.Subheader>

                {nationalLeagues?.map((item, index) => (
                  <FollowListItem
                    name={item?.league?.name}
                    imageUrl={item?.league?.logo}
                    followingId={item?.league?.id}
                    isActive={isUserFollowedByLeague(item?.league?.id)}
                    key={item?.league?.id}
                    onPress={leagueFollowHandler}
                    extraProps={{
                      country: item?.country?.name,
                      // leagueSeason: item?.seasons,
                    }}
                    onContainerPress={() =>
                      navigation.navigate('LeagueDetails', {
                        leagueId: item?.league?.id,
                        leagueName: item?.league?.name,
                        leagueLogo: item?.league?.logo,
                        leagueCountry: item?.country?.name,
                        leagueSeason: item?.seasons,
                      })
                    }
                  />
                ))}
              </List.Section>

              <Spacer space="sm" />
            </Card>
          )}
        </ScrollView>
      )}
    </>
  )
}

export default memo(SelectCompetition)

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.sm,
  },
})
