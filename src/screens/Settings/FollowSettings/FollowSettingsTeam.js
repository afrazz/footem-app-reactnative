import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, IconButton, useTheme } from 'react-native-paper'
import { Tabs } from 'react-native-collapsible-tab-view'
import {
  addTeamFollow,
  fetchFollowingTeams,
  removeTeamFollow,
} from '../../../redux/slices/followSlice'
import { useDispatch, useSelector } from 'react-redux'
import FollowListItem from '../../../components/common/FollowListItem'
import { colors } from '../../../utils/UIRules/colors'
import { spacing } from '../../../utils/UIRules/spacing'
import { useNavigation } from '@react-navigation/native'
import Nodata from '../../../components/common/Nodata'
import { getCountryCode } from '../../../utils/functions'
import Spacer from '../../../components/common/Spacer'

const FollowSettingsTeam = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const theme = useTheme()

  const { followingTeams, followingTeamsLoading } = useSelector(
    (state) => state.follow
  )

  useEffect(() => {
    dispatch(fetchFollowingTeams())
  }, [])

  const isUserFollowedByTeam = (id) => {
    const isFollowingTeam = followingTeams.find(
      (league) => league.followingId == id
    )

    return isFollowingTeam ? true : false
  }

  const teamFollowHandler = async (followingId, logo, name, extraProps) => {
    const alreadyExistIndex = followingTeams.findIndex(
      (league) => league.followingId == followingId
    )

    if (alreadyExistIndex === -1) {
      dispatch(addTeamFollow({ followingId, logo, name, ...extraProps }))
    } else {
      dispatch(removeTeamFollow(followingId))
    }
  }

  return (
    <Tabs.FlatList
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
      data={followingTeams}
      renderItem={({ item }) => (
        <FollowListItem
          name={item?.name}
          imageUrl={item?.logo}
          isRemoveText
          followingId={item?.followingId}
          isActive={isUserFollowedByTeam(item?.followingId)}
          key={item?.id}
          onPress={teamFollowHandler}
          extraProps={{
            national: item?.national,
            code: item?.code,
            country: item?.country,
          }}
          onContainerPress={() =>
            navigation.navigate('TeamDetails', {
              // leagueId: item?.followingId,
              // leagueName: item?.name,
              // leagueLogo: item.logo,
              // leagueCountry: item?.country || '',
              // leagueSeason: item?.leagueSeason || {
              //   year: new Date().getFullYear,
              // },
              teamId: item?.followingId,
              teamName: item.name,
              teamLogo: item?.national
                ? getCountryCode(item?.country)
                  ? `https://cdn.ipregistry.co/flags/emojitwo/${getCountryCode(
                      item?.country
                    )}.png`
                  : item?.logo
                : item?.logo,
              teamCountry: item?.national ? item?.country : null,
              teamCode: item?.code,
              teamNational: item?.national,
            })
          }
        />
      )}
      ListHeaderComponent={<Spacer space="md" />}
      ListFooterComponent={
        followingTeamsLoading && (
          <View
            style={{ flex: 1, justifyContent: 'center', marginTop: spacing.md }}
          >
            <ActivityIndicator size={'small'} color={theme.colors.text} />
          </View>
        )
      }
      ListEmptyComponent={
        !followingTeamsLoading && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 0.5,
            }}
          >
            <Nodata
              // isImageShow={false}
              title="Following Teams Is Empty"
              description="Please Follow Teams For Getting Live Updates"
            />
          </View>
        )
      }

      //   ItemSeparatorComponent={<Spacer space="md" />}
    />
  )
}

export default FollowSettingsTeam

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
  },
})
