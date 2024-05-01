import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import { colors } from '../../utils/UIRules/colors'
import { spacing } from '../../utils/UIRules/spacing'
import { ActivityIndicator } from 'react-native-paper'
import Heading from '../../components/common/Heading'
import FollowListItem from '../../components/common/FollowListItem'
import { useDispatch, useSelector } from 'react-redux'
import { fetchsuggestedTeams } from '../../redux/slices/onBoardFollowSlice'
import Spacer from '../../components/common/Spacer'
import Nodata from '../../components/common/Nodata'

const OnboardSuggestedTeamsSection = ({
  teamFollowHandler,
  isUserFollowedByTeam,
}) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  // const [teamSearchText, setTeamSearchText] = useState('')

  useEffect(() => {
    dispatch(fetchsuggestedTeams({ type: 'suggested' }))
  }, [])

  // useEffect(() => {
  //   // if (teamSearchText.length === 0) {
  //     dispatch(fetchsuggestedTeams({ type: 'suggested' }))
  //   // } else if (teamSearchText.length >= 3) {
  //   //   dispatch(
  //   //     fetchsuggestedTeams({
  //   //       type: 'global',
  //   //       params: { search: teamSearchText },
  //   //     })
  //   //   )
  //   // }
  // }, [])

  const onSearchTextSubmit = (searchedVal) => {
    //  if (searchedVal.length === 0) {
    //   dispatch(fetchsuggestedTeams({ type: 'suggested' }))
    // } else
    if (searchedVal.length >= 3) {
      dispatch(
        fetchsuggestedTeams({
          type: 'global',
          params: { search: searchedVal },
        })
      )
    } else if (searchedVal.length === 0) {
      dispatch(
        fetchsuggestedTeams({
          type: 'suggested',
        })
      )
    }
  }

  const onSearchClearBtnPressed = () => {
    dispatch(fetchsuggestedTeams({ type: 'suggested' }))
  }

  const { suggestedTeams, suggestedTeamLoading } = useSelector(
    (state) => state.onBoardFollow
  )

  return (
    <>
      <FlatList
        style={styles.container}
        contentContainerStyle={{
          backgroundColor: theme.colors.secondaryBg,
          borderRadius: spacing.md,
          paddingHorizontal: spacing.md,
          elevation: 2,
          marginTop: spacing.sm,
          paddingBottom: spacing.md,
        }}
        keyExtractor={(item, index) => index?.toString()}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={() =>
          !suggestedTeamLoading && (
            <Nodata
              title={'No Results Found'}
              description={'Likely There is No Data with your Search term'}
            />
          )
        }
        refreshControl={
          <RefreshControl
            // colors={[[colors.dark]]}
            refreshing={suggestedTeamLoading}
            // progressViewOffset={suggestedTeamLoading ? -200 : 0}
            // onRefresh={()=>{
            //  setData(null);
            //  loadData()}}
          />
        }
        ListHeaderComponent={
          <>
            <Spacer space="md" />
            <Heading
              text={'Suggested Teams'}
              type="h5"
              searchEnabled
              searchPlaceHolder="Search All Teams"
              onSearchTextSubmit={onSearchTextSubmit}
              onSearchClearBtnPressed={onSearchClearBtnPressed}
            />
            <Spacer space="sm" />
          </>
        }
        data={suggestedTeams}
        renderItem={({ item }) => (
          <FollowListItem
            name={item.name || item?.team?.name}
            imageUrl={item?.logo || item?.team?.logo}
            followingId={item._id || item?.team?.id}
            isActive={isUserFollowedByTeam(item._id || item?.team?.id)}
            key={item?.team?.id}
            onPress={teamFollowHandler}
            extraProps={{
              national: item?.team?.national,
              code: item?.team?.code,
              country: item?.team?.country,
            }}
          />
        )}
        initialNumToRender={5}
        windowSize={5}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={30}
        removeClippedSubviews={true}
        onEndReachedThreshold={0.1}
      />
    </>
  )
}

export default OnboardSuggestedTeamsSection

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: spacing.md,
  },
})
