import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, IconButton, useTheme } from 'react-native-paper'
import { Tabs } from 'react-native-collapsible-tab-view'
import {
  addLeagueFollow,
  fetchFollowingLeagues,
  removeLeagueFollow,
} from '../../../redux/slices/followSlice'
import { useDispatch, useSelector } from 'react-redux'
import FollowListItem from '../../../components/common/FollowListItem'
import { colors } from '../../../utils/UIRules/colors'
import { spacing } from '../../../utils/UIRules/spacing'
import { useNavigation } from '@react-navigation/native'
import Nodata from '../../../components/common/Nodata'
import Spacer from '../../../components/common/Spacer'
import footballApiLeagueService from '../../../service/footballApi/leagueService'

const FollowSettingsLeague = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const theme = useTheme()

  const { followingLeagues, followingLeaguesLoading } = useSelector(
    (state) => state.follow
  )

  useEffect(() => {
    dispatch(fetchFollowingLeagues())
  }, [])

  const isUserFollowedByLeague = (id) => {
    const isFollowingLeague = followingLeagues.find(
      (league) => league.followingId == id
    )

    return isFollowingLeague ? true : false
  }

  const leagueFollowHandler = async (followingId, logo, name, extraProps) => {
    const alreadyExistIndex = followingLeagues.findIndex(
      (league) => league.followingId == followingId
    )

    if (alreadyExistIndex === -1) {
      dispatch(addLeagueFollow({ followingId, logo, name, extraProps }))
    } else {
      dispatch(removeLeagueFollow(followingId))
    }
  }

  return (
    <Tabs.FlatList
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
      data={followingLeagues}
      ListHeaderComponent={<Spacer space="md" />}
      renderItem={({ item }) => (
        <FollowListItem
          name={item?.name}
          imageUrl={item?.logo}
          isRemoveText
          followingId={item?.followingId}
          isActive={isUserFollowedByLeague(item?.followingId)}
          key={item?.id}
          onPress={leagueFollowHandler}
          onContainerPress={async () => {
            const latestLeagueData = await footballApiLeagueService.getLeagues({
              id: item?.followingId,
            })

            if (latestLeagueData) {
              navigation.navigate('LeagueDetails', {
                leagueId: item?.followingId,
                leagueName: item?.name,
                leagueLogo: item.logo,
                leagueCountry: item?.country || '',
                leagueSeason: latestLeagueData[0].seasons,
                // leagueSeason: item?.leagueSeason || {
                //   year: new Date().getFullYear,
                // },
              })
            }
          }}
        />
      )}
      ListFooterComponent={
        followingLeaguesLoading && (
          <View
            style={{ flex: 1, justifyContent: 'center', marginTop: spacing.md }}
          >
            <ActivityIndicator size={'small'} color={theme.colors.text} />
          </View>
        )
      }
      ListEmptyComponent={
        !followingLeaguesLoading && (
          <View
            style={{
              justifyContent: 'center',
              flex: 0.5,
            }}
          >
            <Nodata
              // isImageShow={false}
              title="Following League Is Empty"
              description="Please Follow Leagues For Getting Live Updates"
            />
          </View>
        )
      }

      //   ItemSeparatorComponent={<Spacer space="md" />}
    />
  )
}

export default FollowSettingsLeague

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
  },
})
