import {
  Animated,
  Dimensions,
  RefreshControl,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import FixtureAccordianBlock from '../../components/common/FixtureBlock'
import FixtureAccordianBlockHeaderLeft from '../../components/common/AccordianBlock/AccordianBlockHeaderLeft'
import plIcon from '../../../assets/pl.png'
import FixtureAccordianblockHeader from '../../components/common/AccordianBlock/AccordianblockHeader'
import AccordianBlock from '../../components/common/AccordianBlock'
import { Tabs, useFocusedTab } from 'react-native-collapsible-tab-view'
import { fixturesData } from '../../dummyDatas/fixture'
import { ActivityIndicator, Switch, Text } from 'react-native-paper'
import { spacing } from '../../utils/UIRules/spacing'
import Spacer from '../../components/common/Spacer'
import NormalText from '../../components/NormalText'
import footballApiFixturesService from '../../service/footballApi/fixture'
import moment from 'moment'
import { useFocusEffect } from '@react-navigation/native'
import { getCalendars, getLocales } from 'expo-localization'
import { useSelector } from 'react-redux'
import { setLoading } from '../../redux/slices/authSlice'
import Nodata from '../../components/common/Nodata'
import { colors } from '../../utils/UIRules/colors'
import { FlashList } from '@shopify/flash-list'
import BigList from 'react-native-big-list'
import Icon from 'react-native-paper/src/components/Icon'
import { fontSizes } from '../../utils/UIRules/fontSize'
import fontFamily from '../../utils/UIRules/fontFamily'

// const getUserDeviceBasedInfo = async () => {
//   const { timeZone } = await getCalendars()[0]
//   const { regionCode } = await getLocales()[0]
//   const countryName = getName(regionCode)

//   return { timeZone, country }
// }

const FixtureSection = ({ date, isLive }) => {
  const [loading, setLoading] = useState(true)
  const [fixtures, setFixtures] = useState([])
  // const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [animation, setAnimation] = useState(new Animated.Value(60))
  const [expanded, setExpanded] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const inputRef = useRef(null)
  const { timezone } = useSelector((state) => state.auth)

  // const [isSwitchOn, setIsSwitchOn] = React.useState(false)

  const { width } = Dimensions.get('screen')

  // const animation = new Animated.Value(1000)

  const onSearch = () => {
    setSearchTerm('')

    const newWidth = animation._value === 60 ? width - 20 : 60

    if (animation._value === 60) {
      setExpanded(true)
    } else {
      setExpanded(false)
    }

    Animated.spring(animation, {
      toValue: newWidth,
      useNativeDriver: false,
    }).start(() => {
      if (newWidth === width - 20) {
        inputRef.current.focus()
      }
    })
  }

  useFocusEffect(
    React.useCallback(() => {
      // fetchFixtures()
      // setTimeout(() => {

      // }, 1000)
      // if (fixtures?.length === 0) {
      //   setLoading(true)
      //   fetchFixtures()
      // }

      // alert('hitting..')
      // Do something when the screen is focused
      //Implementing the setInterval method
      let interval

      const today = moment().format('YYYY-MM-DD')

      // TODO: UNCOMMENT
      // Here checks if isLive or Today if it's true
      if (isLive || moment(date).isSame(today, 'day')) {
        fetchFixtures()
        interval = setInterval(() => {
          fetchFixtures()
          console.log(`Running-recurrent for ${isLive ? 'Live' : date}`)
        }, 60000)
      }

      return () => {
        clearInterval(interval)
        // Dimensions.removeEventListener('change', updateOrientation)
      }
    }, [])
  )

  // useEffect(() => {
  //   setLoading(true)
  // }, [])

  useEffect(() => {
    // setLoading(true)
    const today = moment().format('YYYY-MM-DD')

    // TODO: UNCOMMENT
    if (!isLive && !moment(date).isSame(today, 'day')) {
      fetchFixtures()
    }
  }, [])

  // useEffect(() => {}, [isFocused])

  const fetchFixtures = async () => {
    console.log('timezone', timezone)
    const sendingQueries = {
      timezone,
      groupByLeague: true,
      groupByFollowingTeams: true,
    }

    if (date) {
      sendingQueries['date'] = date
    }

    if (isLive) {
      sendingQueries['live'] = 'all'
    }

    try {
      const fixturesApiData = await footballApiFixturesService.getFixtures(
        sendingQueries
      )
      setLoading(false)
      // fixturesData
      if (fixturesApiData) {
        // const nextPageData = fixturesApiData.slice(0, 11)
        // setPage(page + 1)
        // setLoading(false)
        // alert(JSON.stringify(nextPageData))

        setFixtures(fixturesApiData)
      }
    } catch (err) {
      // alert(err.message)
      // alert(JSON.stringify(err))
      setLoading(false)
    }
  }

  const renderItem = ({ item }) => <AccordianBlock accordiandata={item} />
  const getItemLayout = (data, index) => ({
    length: 50,
    offset: 50 * index,
    index,
  })

  const filterWithSearchTerm = (fixtures) => {
    const searchedFixtures = fixtures.filter((fixture) => {
      return fixture.league.name
        .toLowerCase()
        ?.trim()
        .includes(searchTerm.toLowerCase()?.trim())
    })
    return searchedFixtures
  }

  return (
    <>
      <Tabs.FlashList
        data={filterWithSearchTerm(fixtures)}
        renderItem={renderItem}
        estimatedItemSize={180}
        viewabilityConfig={{
          waitForInteraction: true,
          itemVisiblePercentThreshold: 50,
          minimumViewTime: 1000,
        }}
        // onEndReached={loadMoreData}
        // onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchFixtures} />
        }
        keyboardShouldPersistTaps="handled"
      />

      <Animated.View style={[styles.searchContainer, { width: animation }]}>
        <TextInput
          style={styles.searchInput}
          ref={inputRef}
          placeholder="Search League.."
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
        />
        <TouchableOpacity style={styles.boxButtonSearch} onPress={onSearch}>
          <Icon
            source={expanded ? 'close' : 'magnify'}
            color={colors.white}
            size={25}
          />
        </TouchableOpacity>
      </Animated.View>
    </>
    // <Spacer space="md" />

    // </Tabs.ScrollView>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    // width: 274,
    // width: 60,
    height: 60,
    backgroundColor: colors.gray4,
    borderRadius: 30,
    position: 'absolute',
    elevation: 3,
    // left: 10,
    right: 8,
    bottom: 8,
  },

  boxButtonSearch: {
    height: 60,
    width: 60,
    backgroundColor: colors.primary,
    position: 'absolute',
    right: 0,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    marginRight: 60,
    marginLeft: 10,
    fontSize: fontSizes.body1,
    fontFamily: fontFamily.fontFamily,
    // color: ',
  },
})

export default FixtureSection

// const styles = StyleSheet.create({})

// import * as React from 'react'
// import { Switch } from 'react-native-paper'

// const MyComponent = () => {
//   const [isSwitchOn, setIsSwitchOn] = React.useState(false)

//   const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn)

//   return (
//     // <Switch
//     //   value={isSwitchOn}
//     //   onValueChange={onToggleSwitch}
//     //   style={{ marginTop: 200 }}
//     // />
//   )
// }

// const accordiandata = [
//   {
//     title: <FixtureAccordianblockHeader league="Primier League" day="Today" />,
//     left: <FixtureAccordianBlockHeaderLeft icon={plIcon} />,
//     content: (
//       <>
//         {[1, 2, 3, 4].map((i) => (
//           <FixtureAccordianBlock
//             key={i}
//             matchStatus={'2 - 1'}
//             team1="Barcelona"
//             team2="Real Madrid"
//             matchTime="65"
//             //   onPress={() => navigation.navigate('FixtureDetails')}
//           />
//         ))}
//       </>
//     ),
//   },
//   {
//     title: <FixtureAccordianblockHeader league="Primier League" day="Today" />,
//     left: <FixtureAccordianBlockHeaderLeft icon={plIcon} />,
//     content: (
//       <>
//         {[1, 2, 3, 4].map((i) => (
//           <FixtureAccordianBlock
//             key={i}
//             matchStatus={'2 - 1'}
//             team1="Barcelona"
//             team2="Real Madrid"
//             matchTime="65"
//           />
//         ))}
//       </>
//     ),
//   },
//   {
//     title: <FixtureAccordianblockHeader league="Primier League" day="Today" />,
//     left: <FixtureAccordianBlockHeaderLeft icon={plIcon} />,
//     content: (
//       <>
//         {[1, 2, 3, 4].map((i) => (
//           <FixtureAccordianBlock
//             key={i}
//             matchStatus={'2 - 1'}
//             team1="Barcelona"
//             team2="Real Madrid"
//             matchTime="65"
//           />
//         ))}
//       </>
//     ),
//   },
//   {
//     title: <FixtureAccordianblockHeader league="Primier League" day="Today" />,
//     left: <FixtureAccordianBlockHeaderLeft icon={plIcon} />,
//     content: (
//       <>
//         {[1, 2, 3, 4].map((i) => (
//           <FixtureAccordianBlock
//             key={i}
//             matchStatus={'2 - 1'}
//             team1="Barcelona"
//             team2="Real Madrid"
//             matchTime="65"
//           />
//         ))}
//       </>
//     ),
//   },
//   {
//     title: <FixtureAccordianblockHeader league="Primier League" day="Today" />,
//     left: <FixtureAccordianBlockHeaderLeft icon={plIcon} />,
//     content: (
//       <>
//         {[1, 2, 3, 4].map((i) => (
//           <FixtureAccordianBlock
//             key={i}
//             matchStatus={'2 - 1'}
//             team1="Barcelona"
//             team2="Real Madrid"
//             matchTime="65"
//           />
//         ))}
//       </>
//     ),
//   },
//   {
//     title: <FixtureAccordianblockHeader league="Primier League" day="Today" />,
//     left: <FixtureAccordianBlockHeaderLeft icon={plIcon} />,
//     content: (
//       <>
//         {[1, 2, 3, 4].map((i) => (
//           <FixtureAccordianBlock
//             key={i}
//             matchStatus={'2 - 1'}
//             team1="Barcelona"
//             team2="Real Madrid"
//             matchTime="65"
//           />
//         ))}
//       </>
//     ),
//   },
//   {
//     title: <FixtureAccordianblockHeader league="Primier League" day="Today" />,
//     left: <FixtureAccordianBlockHeaderLeft icon={plIcon} />,
//     content: (
//       <>
//         {[1, 2, 3, 4].map((i) => (
//           <FixtureAccordianBlock
//             key={i}
//             matchStatus={'2 - 1'}
//             team1="Barcelona"
//             team2="Real Madrid"
//             matchTime="65"
//           />
//         ))}
//       </>
//     ),
//   },
//   {
//     title: <FixtureAccordianblockHeader league="Primier League" day="Today" />,
//     left: <FixtureAccordianBlockHeaderLeft icon={plIcon} />,
//     content: (
//       <>
//         {[1, 2, 3, 4].map((i) => (
//           <FixtureAccordianBlock
//             key={i}
//             matchStatus={'2 - 1'}
//             team1="Barcelona"
//             team2="Real Madrid"
//             matchTime="65"
//           />
//         ))}
//       </>
//     ),
//   },
//   {
//     title: <FixtureAccordianblockHeader league="Primier League" day="Today" />,
//     left: <FixtureAccordianBlockHeaderLeft icon={plIcon} />,
//     content: (
//       <>
//         {[1, 2, 3, 4].map((i) => (
//           <FixtureAccordianBlock
//             key={i}
//             matchStatus={'2 - 1'}
//             team1="Barcelona"
//             team2="Real Madrid"
//             matchTime="65"
//           />
//         ))}
//       </>
//     ),
//   },
//   {
//     title: <FixtureAccordianblockHeader league="Primier League" day="Today" />,
//     left: <FixtureAccordianBlockHeaderLeft icon={plIcon} />,
//     content: (
//       <>
//         {[1, 2, 3, 4].map((i) => (
//           <FixtureAccordianBlock
//             key={i}
//             matchStatus={'2 - 1'}
//             team1="Barcelona"
//             team2="Real Madrid"
//             matchTime="65"
//           />
//         ))}
//       </>
//     ),
//   },
//   {
//     title: <FixtureAccordianblockHeader league="Primier League" day="Today" />,
//     left: <FixtureAccordianBlockHeaderLeft icon={plIcon} />,
//     content: (
//       <>
//         {[1, 2, 3, 4].map((i) => (
//           <FixtureAccordianBlock
//             key={i}
//             matchStatus={'2 - 1'}
//             team1="Barcelona"
//             team2="Real Madrid"
//             matchTime="65"
//           />
//         ))}
//       </>
//     ),
//   },
//   {
//     title: <FixtureAccordianblockHeader league="Primier League" day="Today" />,
//     left: <FixtureAccordianBlockHeaderLeft icon={plIcon} />,
//     content: (
//       <>
//         {[1, 2, 3, 4].map((i) => (
//           <FixtureAccordianBlock
//             key={i}
//             matchStatus={'2 - 1'}
//             team1="Barcelona"
//             team2="Real Madrid"
//             matchTime="65"
//           />
//         ))}
//       </>
//     ),
//   },
// ]

// {/* <View
//         style={{
//           paddingHorizontal: spacing.sm,
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'flex-end',
//         }}
//       >
//         <NormalText fontFamily="semiBold" fontSize={'body1'}>
//           Following Teams Match
//         </NormalText>
//         <Spacer direction="row" space="sm" />
//         <Switch
//           value={isSwitchOn}
//           onValueChange={onToggleSwitch}

//           // style={{ marginTop: -100 }}
//         />
//       </View> */}
//       {/* <Spacer space="sm" /> */}
//       {/* <View style={{ flex: 1, width: Dimensions.get('screen').width }}> */}
//       {/* <FlashList
//         data={fixtures}
//         renderItem={renderItem}
//         estimatedItemSize={150}
//         // viewabilityConfig={{
//         //   waitForInteraction: true,
//         //   itemVisiblePercentThreshold: 50,
//         //   minimumViewTime: 1000,
//         // }}
//         onEndReached={loadMoreData}
//         onEndReachedThreshold={0}
//         // keyExtractor={(item) => item.}
//       /> */}
//       {/* <BigList data={fixtures} renderItem={renderItem} /> */}
//       {/* </View> */}

//       {/* <Tabs.FlatList
//         data={fixtures}
//         renderItem={renderItem}
//         getItemLayout={getItemLayout}
//         // keyExtractor={(item) => item.league.id}
//         contentContainerStyle={{ paddingTop: 0 }}
//         initialNumToRender={5}
//         maxToRenderPerBatch={10}
//         windowSize={10}
//         // contentContainerStyle={{ paddingBottom: spacing.lg }}
//         ListFooterComponent={
//           loading && (
//             <View style={{ flex: 1, justifyContent: 'center' }}>
//               <ActivityIndicator size={'small'} color={colors.dark} />
//             </View>
//           )
//         }
//         ListEmptyComponent={
//           !loading && (
//             <View
//               style={{
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 flex: 0.5,
//               }}
//             >
//               <Nodata
//                 isImageShow={false}
//                 title="No Results To Show"
//                 description="We'll Update Soon with latest results"
//               />
//             </View>
//           )
//         }
//       /> */}
//       {/* {!loading && fixtures?.length === 0 ? (
//         <Nodata title="No Matches Found" />
//       ) : (
//         fixtures?.map((cur, i) => (
//           <AccordianBlock accordiandata={cur} key={i} />
//         ))
//       )} */}
//       {/* {
//         // loading ? (
//         //   <View style={{ flex: 1, justifyContent: 'center' }}>
//         //     <ActivityIndicator size={'small'} color={colors.dark} />
//         //   </View>
//         // ) : (
//         fixtures?.map((cur, i) => (
//           <AccordianBlock accordiandata={cur} key={i} />
//         ))
//         // )
//       } */}

// const loadMoreData = async () => {
//   if (!loading && hasMore) {
//     setLoading(true)
//     const sendingQueries = {
//       timezone,
//       groupByLeague: true,
//       groupByFollowingTeams: true,
//     }

//     if (date) {
//       sendingQueries['date'] = date
//     }

//     if (isLive) {
//       sendingQueries['live'] = 'all'
//     }

//     // setTimeout(() => {
//     const fixturesApiData = await footballApiFixturesService.getFixtures(
//       sendingQueries
//     )

//     const nextPageData = fixturesApiData.slice(
//       page * Limit,
//       (page + 1) * Limit
//     )
//     setPage(page + 1)
//     setLoading(false)

//     if (nextPageData.length === 0) setHasMore(false)

//     // Check if there's more data to load
//     if (nextPageData.length > 0) {
//       setFixtures((prevFixtures) => [...prevFixtures, ...nextPageData])
//     }
//   }

//   // }, 1000); // Simulate a delay, replace with your own logic
// }

// const refetchData = (fixtureData) => {
//   const nextPageData = fixtureData.slice(page * Limit, page * Limit)

//   setFixtures(nextPageData)
// }
