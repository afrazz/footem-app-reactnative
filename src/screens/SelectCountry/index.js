/* eslint-disable react/prop-types */
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import Header from '../../components/common/Header'
import AccordianblockHeader from '../../components/common/AccordianBlock/AccordianblockHeader'
import AccordianBlockHeaderLeft from '../../components/common/AccordianBlock/AccordianBlockHeaderLeft'
import plIcon from '../../../assets/pl.png'
import AccordianBlock from '../../components/common/AccordianBlock'
import { List, Searchbar, Text, useTheme } from 'react-native-paper'
import SearchInput from '../../components/common/SearchInput'
import { spacing } from '../../utils/UIRules/spacing'
import Spacer from '../../components/common/Spacer'
import { colors } from '../../utils/UIRules/colors'
import Heading from '../../components/common/Heading'
import NormalText from '../../components/NormalText'
import footballApiCountryService from '../../service/footballApi/countryService'
import footballApiLeagueService from '../../service/footballApi/leagueService'
import NormalListItem from '../../components/common/NormalListItem'
import FollowListItem from '../../components/common/FollowListItem'
import { useDispatch, useSelector } from 'react-redux'
import {
  addLeagueFollow,
  removeLeagueFollow,
} from '../../redux/slices/followSlice'
import FullScreenLoader from '../../components/common/FullScreenLoader'

// CountryItem component

const SelectCountry = ({ navigation }) => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchLeaguesSuggestions, setSearchLeaguesSuggestions] = useState([])
  const [countryLoading, setCountryLoading] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const dispatch = useDispatch()
  const theme = useTheme()

  const { followingLeagues } = useSelector((state) => state.follow)

  const fetchFootballApiCountries = async () => {
    setCountryLoading(true)
    try {
      const fetchedCountries = await footballApiCountryService.getCountries()
      setCountries(fetchedCountries)

      setCountryLoading(false)
    } catch (err) {
      setCountryLoading(false)
    }
  }
  const fetchFootballApiLeagues = async (searchText) => {
    setSearchLoading(true)

    try {
      const fetchedLeagues = await footballApiLeagueService.getLeagues({
        search: searchText,
      })
      setSearchLeaguesSuggestions(fetchedLeagues)
      setSearchLoading(false)
    } catch (err) {
      setSearchLoading(false)
    }
  }

  useEffect(() => {
    fetchFootballApiCountries()
  }, [])

  let searchTimeout

  // const filteredCountries = useMemo(() => {
  //   if (searchTerm) {
  //     return countries.filter((country) =>
  //       country?.name?.toLowerCase().includes(searchTerm?.toLowerCase())
  //     )
  //   } else {
  //     return countries
  //   }
  // }, [countries, searchTerm])

  // const navigateToSelectCompetitionScreenHandler = (country) => {
  // https://cdn.ipregistry.co/flags/emojitwo/${item?.code?.toLowerCase()}.png
  const onPressItem = useCallback(
    (country) => {
      navigation.navigate('SelectCompetition', { country })
    },
    [navigation]
  )

  // const onSearchTermChange = (text) => {
  //   setSearchTerm(text)

  //   clearTimeout(searchTimeout)

  //   if (text.length >= 3) {
  //     searchTimeout = setTimeout(async () => {
  //       await fetchFootballApiLeagues(text)
  //     }, 1000)
  //   } else {
  //     setSearchLeaguesSuggestions([])
  //   }
  // }

  useEffect(() => {
    clearTimeout(searchTimeout)

    if (searchTerm.length >= 3) {
      searchTimeout = setTimeout(async () => {
        await fetchFootballApiLeagues(searchTerm)
      }, 500)
    } else {
      setSearchLoading(false)
      setSearchLeaguesSuggestions([])
    }

    return () => clearTimeout(searchTimeout)
  }, [searchTerm])

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
      if (extraProps) {
        dispatch(addLeagueFollow({ followingId, logo, name, ...extraProps }))
      } else {
        dispatch(addLeagueFollow({ followingId, logo, name }))
      }
    } else {
      dispatch(removeLeagueFollow(followingId))
    }
  }

  const leagueSuggestionBlock = () => {
    if (searchLeaguesSuggestions?.length > 0) {
      return (
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled
          data={searchLeaguesSuggestions}
          renderItem={({ item }) => (
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
          )}
          keyExtractor={(item) => `${item.league.id}`}
        />
      )
    }

    return null
  }

  return (
    <>
      <Header title="Select Country" />
      <View style={styles.container}>
        <Spacer space="md" />
        <SearchInput
          placeholder="Search League or Country (3 letters)"
          onChangeText={(text) => setSearchTerm(text)}
          onClearIconPress={() => setSearchTerm('')}
          searchLoading={searchLoading}
          suggestions={leagueSuggestionBlock()}
          value={searchTerm}
          containerStyle={{ marginTop: spacing.md }}
        />
        <Spacer space="md" />
        {/* searchTerm
              ? countries.filter((country) =>
                  country?.name
                    ?.toLowerCase()
                    .includes(searchTerm?.toLowerCase())
                )
              :  */}
        {/* {countryLoading ? (
          <>
            <Spacer space="md" />
            <FullScreenLoader />
          </>
        ) : ( */}
        <>
          {searchLeaguesSuggestions?.length === 0 && (
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={countryLoading}
                  onRefresh={fetchFootballApiCountries}
                />
              }
              keyboardShouldPersistTaps="handled"
              data={countries}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.name + index}
              style={{ position: 'relative', zIndex: -1 }}
              contentContainerStyle={{
                // paddingBottom: spacing.lg,
                backgroundColor: theme.colors.secondaryBg,
                borderRadius: spacing.md,
              }}
              // renderItem={({ item, index }) => {
              //   return (
              //     <>
              //       <List.Item
              //         onPress={() => navigation.navigate('SelectCompetition')}
              //         title={
              //           <NormalText
              //             containerMarginRight={0}
              //             fontFamily="regular"
              //             fontSize={'body2'}
              //           >
              //             {item.name}
              //           </NormalText>
              //         }
              //         left={(props) => (
              //           // <SvgUri width={25} height={25} uri={item.flag} />
              //           <Image
              //             style={{ width: 25, height: 25, resizeMode: 'cover' }}
              //             source={{
              //               uri: `https://cdn.ipregistry.co/flags/emojitwo/${item?.code?.toLowerCase()}.png`,
              //             }}
              //           />
              //         )}
              //         style={{
              //           paddingLeft: spacing.md,
              //           marginBottom: -spacing.sm - 4,
              //         }}
              //         right={() => (
              //           <List.Icon
              //             color="#000"
              //             icon="chevron-right"
              //             style={{ marginRight: -spacing.sm - 4 }}
              //           />
              //         )}
              //       />
              //       <Spacer space="sm" />
              //     </>
              //   )
              // }}
              renderItem={({ item, index }) => (
                <NormalListItem
                  label={item?.name}
                  index={index}
                  onPress={onPressItem}
                  imageUrl={`https://cdn.ipregistry.co/flags/emojitwo/${item?.code?.toLowerCase()}.png`}
                />
              )}
            />
          )}
        </>
        {/* )} */}
      </View>
      {/* // navigateTo={'SelectCompetition'}
              // navigateParams={{ country: item.name }} */}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
  },
})

export default memo(SelectCountry)

// cause: Error: read ECONNRESET
// at TLSWrap.onStreamRead (node:internal/stream_base_commons:217:20) {
// errno: -4077,
// code: 'ECONNRESET',
// syscall: 'read'
// }
// }
// AxiosError: read ECONNRESET
