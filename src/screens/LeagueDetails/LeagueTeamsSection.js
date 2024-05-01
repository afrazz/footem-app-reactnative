/* eslint-disable react/prop-types */
import { Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { spacing } from '../../utils/UIRules/spacing'
import { colors } from '../../utils/UIRules/colors'
import SearchInput from '../../components/common/SearchInput'
import Spacer from '../../components/common/Spacer'
import { FlatList, Tabs } from 'react-native-collapsible-tab-view'
import { List, useTheme } from 'react-native-paper'
import NormalText from '../../components/NormalText'
import Button from '../../components/common/Button/Button'
import { useNavigation } from '@react-navigation/native'
import FollowListItem from '../../components/common/FollowListItem'
// import { nationalTeams } from '../../dummyDatas/teams'
import { useDispatch, useSelector } from 'react-redux'
import { addTeamFollow, removeTeamFollow } from '../../redux/slices/followSlice'
import { getCountryCode } from '../../utils/functions'
import footballApiteamService from '../../service/footballApi/teamService'
import { nationalTeams } from '../../dummyDatas/teams'
import FullScreenLoader from '../../components/common/FullScreenLoader'

const LeagueTeamsSection = ({ leagueSeason, leagueId }) => {
  const [leagueTeams, setLeagueTeams] = useState([])
  const [loading, setLoading] = useState(false)

  const theme = useTheme()

  const getTeamsInLeague = async () => {
    setLoading(true)
    try {
      const teams = await footballApiteamService.getTeams({
        season: leagueSeason,
        league: leagueId,
      })
      setLeagueTeams(teams)
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTeamsInLeague()
  }, [])

  const navigation = useNavigation()

  const dispatch = useDispatch()
  const { followingTeams } = useSelector((state) => state.follow)

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

  const isUserFollowedByTeam = (id) => {
    const isFollowingTeam = followingTeams.find(
      (team) => team.followingId == id
    )

    return isFollowingTeam ? true : false
  }

  return (
    <>
      <Tabs.FlatList
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getTeamsInLeague}
            // colors={[colors.primary]}
          />
        }
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        data={leagueTeams}
        renderItem={({ item }) => (
          <FollowListItem
            name={item?.team?.name}
            imageUrl={
              item?.team?.national
                ? getCountryCode(item?.team?.country)
                  ? `https://cdn.ipregistry.co/flags/emojitwo/${getCountryCode(
                      item?.team?.country
                    )}.png`
                  : item?.team?.logo
                : item?.team?.logo
            }
            followingId={item?.team?.id}
            isActive={isUserFollowedByTeam(item?.team?.id)}
            key={item?.team?.id}
            onPress={teamFollowHandler}
            extraProps={{
              national: item?.team?.national,
              country: item?.team?.country,
              code: item?.team?.code,
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
                teamCountry: item?.team?.national ? null : item?.team?.country,
                teamCode: item?.team?.code,
                teamNational: item?.team?.national,
              })
            }
          />
          // <List.Item
          //   onPress={() => navigation.navigate('TeamDetails')}
          //   title={
          //     <NormalText
          //       containerMarginRight={0}
          //       fontFamily="regular"
          //       fontSize={'body2'}
          //     >
          //       India
          //     </NormalText>
          //   }
          //   left={(props) => (
          //     <Image
          //       source={require('../../../assets/manunited.png')}
          //       style={{
          //         // transform: [{ translateX: -6 }],
          //         height: 35,
          //         width: 35,
          //       }}
          //     />
          //   )}
          //   style={{
          //     marginBottom: -spacing.md + 8,
          //     // height: 40,
          //   }}
          //   right={() => (
          //     <Button
          //       // icon="camera"
          //       textColor={colors.dark}
          //       buttonColor={colors.unActiveButton}
          //       style={{
          //         borderColor: colors.unActiveButton,
          //         marginRight: -spacing.lg,
          //       }}
          //       onPress={() => console.log('Pressed')}
          //       label="Follow"
          //       btnType="small"
          //     />
          //   )}
          // />
        )}
        //   ItemSeparatorComponent={<Spacer space="md" />}
      />
    </>
  )
}

export default LeagueTeamsSection

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    // paddingTop: 290,
    // marginTop: spacing.sm,
    // paddingBottom: 60,
  },
})
