/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { spacing } from '../../utils/UIRules/spacing'
import { colors } from '../../utils/UIRules/colors'
import Heading from '../../components/common/Heading'
import Spacer from '../../components/common/Spacer'
import NewsSmallSection from '../../components/News/NewsSmallSection'
import NewsLargeBlock from '../../components/News/NewsLargeBlock'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNews } from '../../redux/slices/newsSlice'
import { NEWS_TYPE } from '../../constants'
import NewsSmallBlock from '../../components/common/NewsSmallBlock'
import { Tabs } from 'react-native-collapsible-tab-view'
import { Text, useTheme } from 'react-native-paper'
import moment from 'moment'
import Nodata from '../../components/common/Nodata'
import NormalText from '../../components/NormalText'
import AsyncStorage from '@react-native-async-storage/async-storage'

// import { useCurrentTabScrollY } from 'react-native-collapsible-tab-view'
// import { useDerivedValue } from 'react-native-reanimated'

// Study
// useCallback()

const LeagueNewsSection = () => {
  const theme = useTheme()
  const LIMIT = 20
  // const didMount = useRef(false)
  //   const [latestNewsIndex, setLatestNewsIndex] = useState(null)

  //   const [page, setPage] = useState(1)

  const { leagueNews, leagueNewsLoading } = useSelector((state) => state.news)
  const { user, language } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const onRefresh = useCallback(() => {
    fetchNewsHandler('create')
    // setPage(1)

    // setRefreshing(true)
    // setTimeout(() => {
    //   setRefreshing(false)
    // }, 2000)
  }, [language])

  // const scrollY = new Animated.Value(0)

  // const scrollYText = useDerivedValue(
  //   () => `Scroll Y is: ${scrollY.value.toFixed(2)}`
  // )
  // const scrollY = useCurrentTabScrollY()

  // useDerivedValue(() => {
  //   // yOffsetCallback(scrollY.value.toFixed(2))
  //   console.log('sbd', scrollY.value.toFixed(2))
  // })

  // console.log(style.value, 'my-value')

  useEffect(() => {
    if (language) {
      fetchNewsHandler('create')
    }
  }, [user, language])

  const fetchNewsHandler = async (method) => {
    // const leaguesIds = user?.followingLeagues?.map(
    //   (league) => league?.followingId
    // )

    let sendingValues = {
      type: NEWS_TYPE.leagues,
      params: {
        sortByLeagues: true,
        languageId: language,
        //   page: initialPage || page,
        //   limit: LIMIT,
      },
      method,
    }

    // const languageId = await AsyncStorage.getItem('languageId')

    if (language) {
      sendingValues = {
        ...sendingValues,
        params: { ...sendingValues.params, languageId: language },
      }
    }

    dispatch(fetchNews({ data: sendingValues }))
  }

  //   useEffect(() => {
  //     if (allNews?.length > 0) {
  //       const findLatestNewsIndex = allNews.findIndex((news) => !news.isTrending)
  //       setLatestNewsIndex(findLatestNewsIndex)
  //     }
  //   }, [allNews])

  //   const loadMoreNewsData = async () => {
  //     setPage((prev) => prev + 1)
  //   }

  // useEffect(() => {
  //   // Return early, if this is the first render:
  //   if (!didMount.current) {
  //     return (didMount.current = true)
  //   }
  //   // Paste code to be executed on subsequent renders:
  //   console.log('Nzzooooo')
  // }, [page])
  //   useEffect(() => {
  //     if (page > 1) {
  //       fetchNewsHandler('update')
  //     }
  //   }, [page])

  const renderItem = ({ item, index }) => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: index > 0 ? spacing.lg : 0,
          }}
        >
          <Image
            source={{ uri: item?.league?.logo }}
            style={{ height: 40, width: 40, resizeMode: 'contain' }}
          />

          <Heading
            text={item?.league?.name}
            type="h5"
            containerStyle={{ marginTop: 0, marginLeft: spacing.sm }}
          />
        </View>

        <Spacer space="lg" />
        {item?.items?.map((news, i) => (
          <>
            {i === 0 ? (
              <>
                <NewsLargeBlock
                  coverImage={news?.imageUrl}
                  title={news?.newsData[0]?.title}
                  startDate={news?.startDate}
                  newsId={news?._id}
                  minsRead={news?.minuteRead}
                />
                <Spacer space="sm" />
              </>
            ) : (
              <>
                <NewsSmallBlock
                  coverImage={news?.imageUrl}
                  title={news?.newsData[0]?.title}
                  startDate={news?.startDate}
                  newsId={news?._id}
                />

                {i === 4 && (
                  <TouchableOpacity style={{ marginTop: spacing.md }}>
                    <NormalText
                      containerMarginRight={0}
                      fontFamily="bold"
                      fontSize="body2"
                      color="primary"
                      // textAlign="center"
                    >
                      See All
                    </NormalText>
                  </TouchableOpacity>
                )}
                <Spacer space="md" />
              </>
            )}
          </>
        ))}
      </>
    )
    // if (item?.isTrending && index === 0) {
    //   return (
    //     <>
    //       <Heading
    //         text={'Trending News'}
    //         type="h5"
    //         containerStyle={{ marginTop: -5 }}
    //       />
    //       <Spacer space="md" />
    //       <NewsLargeBlock
    //         coverImage={item?.imageUrl}
    //         title={item?.newsData[0]?.title}
    //         startDate={item?.startDate}
    //         newsId={item?._id}
    //       />
    //       <Spacer space="sm" />
    //     </>
    //   )
    // }
    // if (item?.isTrending && index > 0) {
    //   return (
    //     <>
    //       <NewsSmallBlock
    //         coverImage={item?.imageUrl}
    //         title={item?.newsData[0]?.title}
    //         startDate={item?.startDate}
    //         newsId={item?._id}
    //       />
    //       <Spacer space="md" />
    //     </>
    //   )
    // }

    // if (latestNewsIndex === index) {
    //   return (
    //     <>
    //       <Spacer space="md" />
    //       <Heading
    //         text={'Latest News'}
    //         type="h5"
    //         containerStyle={{ marginTop: -5 }}
    //       />
    //       <Spacer space="md" />
    //     </>
    //   )
    // }

    // if (!item?.isTrending) {
    //   return (
    //     <>
    //       <NewsLargeBlock
    //         coverImage={item?.imageUrl}
    //         title={item?.newsData[0]?.title}
    //         startDate={item?.startDate}
    //         newsId={item?._id}
    //       />
    //       <Spacer space="md" />
    //       {/* <Heading
    //       text={'Latest News'}
    //       type="h5"
    //       containerStyle={{ marginTop: -5 }}
    //     />
    //     <Spacer space="md" /> */}
    //     </>
    //   )
    // }
    // return (
    //   <>
    //     <Heading
    //       text={'Trending News'}
    //       type="h5"
    //       containerStyle={{ marginTop: -5 }}
    //     />
    //     <Spacer space="md" />
    //     <NewsLargeBlock />
    //     <Spacer space="sm" />
    //     <NewsSmallBlock />

    //     <Spacer space="md" />
    //     <NewsSmallSection />

    //     <Spacer space="xl" />
    //     <Heading
    //       text={'Latest News'}
    //       type="h5"
    //       containerStyle={{ marginTop: -5 }}
    //     />
    //     <Spacer space="md" />
    //     <NewsLargeBlock />

    //     <Spacer space="lg" />
    //   </>
    // )
  }

  return (
    // <ScrollView
    //   scrollEventThrottle={16}
    //   // boun
    //   style={styles.container}
    // >

    <Tabs.FlatList
      data={leagueNews}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{ paddingBottom: spacing.lg }}
      refreshControl={
        <RefreshControl
          refreshing={leagueNewsLoading}
          onRefresh={onRefresh}
          colors={[colors.primary]}
        />
      }
      //   onEndReached={loadMoreNewsData}
      onEndReachedThreshold={0}
      // contentContainerStyle={{ paddingBottom: spacing.lg }}
      renderItem={renderItem}
      ListEmptyComponent={
        !leagueNewsLoading && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 0.5,
            }}
          >
            <Nodata
              title="No Results To Show"
              description="We'll Update Soon with latest results"
              titleAlignment="left"
            />
          </View>
        )
      }
      initialNumToRender={5}
      maxToRenderPerBatch={10}
      windowSize={10}
    />
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
    // backgroundColor: colors.white,
    paddingTop: spacing.xl,
    marginTop: -spacing.sm,
    // paddingBottom: 60,
  },
})

export default React.memo(LeagueNewsSection)

{
  /* <FlatList
        horizontal
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        legacyImplementation={false}
        data={['', '', '', '']}
        renderItem={(item) => <PostBlock />}
        style={{ marginTop: -8, width: 'auto' }}
        // ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        // keyExtractor={(photo) => photo.id}
        style={{ height: '70%' }}
      /> */
}
{
  /* <ScrollView horizontal>
        <View style={{ marginRight: 20 }}>
          <PostBlock />
        </View>
        <View style={{ marginRight: 20 }}>
          <PostBlock />
        </View>
      </ScrollView> */
}
