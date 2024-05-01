import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Heading from '../../components/common/Heading'
import { spacing } from '../../utils/UIRules/spacing'
import Spacer from '../../components/common/Spacer'
import FollowListCardItem from '../../components/common/FollowListCardItem'
import { getCalendars, getLocales } from 'expo-localization'
import { getName } from 'country-list'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLocalTeams } from '../../redux/slices/onBoardFollowSlice'
import * as Network from 'expo-network'
import { getUserDeviceBasedInfo } from '../../utils/functions'

const OnboardLocalTeamsSection = ({
  teamFollowHandler,
  isUserFollowedByTeam,
}) => {
  const flatListRef = useRef()
  const dispatch = useDispatch()
  const [searchedValue, setSearchedValue] = useState('')

  const fetchLocalTeamsHandler = async () => {
    const userInfo = await getUserDeviceBasedInfo()

    if (userInfo?.countryName) {
      dispatch(
        fetchLocalTeams({
          params: {
            country: userInfo?.countryName,
          },
        })
      )
    }
  }

  useEffect(() => {
    fetchLocalTeamsHandler()
  }, [])

  const { localTeams, localTeamsLoading } = useSelector(
    (state) => state.onBoardFollow
  )

  // const getUserCountry = async () => {
  //   const { regionCode, languageCode, currencyCode } = await getLocales()[0]
  //   const countryName = getName(regionCode)
  //   return countryName
  // }

  const onSearchTextChange = (val) => {
    setSearchedValue(val)
  }

  const onSearchClearBtnPressed = () => {
    setSearchedValue('')
  }

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
    }
  }, [searchedValue])

  return (
    <>
      {localTeams?.length > 0 && (
        <>
          <View style={{ paddingHorizontal: spacing.md }}>
            <Heading
              text={'Local Teams'}
              type="h5"
              searchEnabled
              searchPlaceHolder="Search Local Team Only"
              onSearchTextChange={onSearchTextChange}
              // onSearchTextSubmit={onSearchTextSubmit}
              onSearchClearBtnPressed={onSearchClearBtnPressed}
            />
          </View>

          <Spacer space="lg" />

          <FlatList
            ref={flatListRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            legacyImplementation={false}
            contentContainerStyle={{
              paddingLeft: spacing.md,
            }}
            data={
              searchedValue
                ? localTeams.filter((item) =>
                    item.team.name
                      .toLowerCase()
                      .includes(searchedValue.toLowerCase())
                  )
                : localTeams
            }
            renderItem={({ item, index }) => (
              <View style={{ marginTop: 20 }}>
                <FollowListCardItem
                  isActive={isUserFollowedByTeam(item.team.id)}
                  logo={item?.team?.logo}
                  name={item?.team?.name}
                  followingId={item?.team?.id}
                  key={item?.team?.id}
                  extraProps={{
                    national: item?.team?.national,
                    code: item?.team?.code,
                    country: item?.team?.country,
                  }}
                  onPress={teamFollowHandler}
                />
              </View>
            )}
            style={{ marginTop: -8, flexGrow: 0 }}
            ItemSeparatorComponent={() => (
              <View style={{ height: 10, width: spacing.sm }} />
            )}
            initialNumToRender={5}
            windowSize={5}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={30}
            removeClippedSubviews={true}
            onEndReachedThreshold={0.1}
            // initialNumToRender={10}
            // windowSize={5}
            // maxToRenderPerBatch={5}
            // updateCellsBatchingPeriod={30}
            // removeClippedSubviews={true}
            // onEndReachedThreshold={0.1}
            keyExtractor={(item) => `${item.team.id}`}
            // keyExtractor={(photo) => photo.id}
            // style={{ height: '70%' }}
          />
        </>
      )}
    </>
  )
}

export default OnboardLocalTeamsSection

const styles = StyleSheet.create({})
