/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Alert,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  // AsyncStorage,
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
import FullScreenLoader from '../../components/common/FullScreenLoader'
import { Button, Text, useTheme } from 'react-native-paper'
import moment from 'moment'
import Nodata from '../../components/common/Nodata'
import { signOut } from '../../redux/slices/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { increment } from '../../redux/slices/counterSlice'

// import { useCurrentTabScrollY } from 'react-native-collapsible-tab-view'
// import { useDerivedValue } from 'react-native-reanimated'

// Study
// useCallback()

const AllNewsSection = () => {
  const theme = useTheme()

  const LIMIT = 20
  // const didMount = useRef(false)
  const [latestNewsIndex, setLatestNewsIndex] = useState(null)
  const [hasLoadedAll, setHasLoadedAll] = useState(false)

  const [page, setPage] = useState(1)

  const { allNews, allNewsLoading } = useSelector((state) => state.news)
  const { language } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const onRefresh = useCallback(() => {
    fetchNewsHandler('create', 1)
    setPage(1)

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
      fetchNewsHandler('create', 1)
      setPage(1)
    }
  }, [language])

  const fetchNewsHandler = async (method, initialPage) => {
    let sendingValues = {
      type: NEWS_TYPE.all,
      params: {
        availableNews: true,
        page: initialPage || page,
        languageId: language,
        limit: LIMIT,
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

    dispatch(
      fetchNews({ data: sendingValues, setHasLoadedAll: setHasLoadedAll })
    )
  }

  useEffect(() => {
    if (allNews?.length > 0) {
      const findLatestNewsIndex = allNews.findIndex((news) => !news.isTrending)
      setLatestNewsIndex(findLatestNewsIndex)
    }
  }, [allNews])

  const loadMoreNewsData = async () => {
    if (!hasLoadedAll) {
      setPage((prev) => prev + 1)
    }
  }

  // useEffect(() => {
  //   // Return early, if this is the first render:
  //   if (!didMount.current) {
  //     return (didMount.current = true)
  //   }
  //   // Paste code to be executed on subsequent renders:
  //   console.log('Nzzooooo')
  // }, [page])
  useEffect(() => {
    if (page > 1) {
      fetchNewsHandler('update')
    }
  }, [page])

  const renderItem = ({ item, index }) => (
    <>
      {/* <Button
        onPress={() => {
          AsyncStorage.removeItem('alreadyLaunched')
          AsyncStorage.removeItem('token')
          dispatch(signOut())
        }}
      >
        Reset First Lauch
      </Button> */}

      {item?.isTrending && index === 0 && (
        <>
          <Heading
            text={'Trending News'}
            type="h5"
            // containerStyle={{ marginTop: -16 }}
          />
          <Spacer space="md" />
          <NewsLargeBlock
            coverImage={item?.imageUrl}
            title={item?.newsData[0]?.title}
            startDate={item?.startDate}
            newsId={item?._id}
            minsRead={item?.minuteRead}
          />
          <Spacer space="sm" />
        </>
      )}
      {item?.isTrending && index > 0 && (
        <>
          <NewsSmallBlock
            coverImage={item?.imageUrl}
            title={item?.newsData[0]?.title}
            startDate={item?.startDate}
            newsId={item?._id}
          />
          <Spacer space="lg" />
        </>
      )}
      {/* {item?.isTrending && <Spacer space="xxl" />} */}
      {/* {!item?.isTrending ? (
        <View style={{ marginTop: -10 }}></View>
      ) : (
        <View style={{ marginTop: 0 }}></View>
      )} */}
      {latestNewsIndex === index && (
        <>
          {/* <Spacer space=''/> */}
          <Heading
            text={'Latest News'}
            type="h5"
            // containerStyle={{ marginTop: -16 }}
          />
          <Spacer space="md" />
        </>
      )}

      {!item?.isTrending && (
        <>
          <NewsLargeBlock
            coverImage={item?.imageUrl}
            title={item?.newsData[0]?.title}
            startDate={item?.startDate}
            newsId={item?._id}
            minsRead={item?.minuteRead}
          />
          <Spacer space="md" />
          {/* <Heading
          text={'Latest News'}
          type="h5"
          containerStyle={{ marginTop: -5 }}
        />
        <Spacer space="md" /> */}
        </>
      )}
    </>
  )

  // console.log(JSON.stringify(allNews), 'ALLNEWS')

  return (
    // <ScrollView
    //   scrollEventThrottle={16}
    //   // boun
    //   style={styles.container}
    // >

    <Tabs.FlatList
      data={allNews}
      // estimatedItemSize={30}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{ paddingBottom: spacing.lg }}
      refreshControl={
        <RefreshControl
          refreshing={allNewsLoading}
          onRefresh={onRefresh}
          colors={[colors.primary]}
        />
      }
      onEndReached={loadMoreNewsData}
      onEndReachedThreshold={0}
      ListHeaderComponent={<></>}
      ListHeaderComponentStyle={{ marginTop: -15 }}
      keyExtractor={(item) => item._id}
      // contentContainerStyle={{ paddingBottom: spacing.lg }}
      ListEmptyComponent={
        allNewsLoading ? (
          <FullScreenLoader />
        ) : (
          allNews.length === 0 &&
          !allNewsLoading && (
            <Nodata
              // titleAlignment="left"
              title="No Results To Show"
              description="We'll Update Soon with latest results"
            />
          )
        )

        // !allNewsLoading && (
        //   <View
        //     style={{
        //       justifyContent: 'center',
        //       alignItems: 'center',
        //       flex: 0.5,
        //       marginRight: spacing.lg,
        //     }}
        //   >
        //     <Nodata
        //       titleAlignment="left"
        //       title="No Results To Show"
        //       description="We'll Update Soon with latest results"
        //     />
        //     {/* <Button
        //       onPress={() => {
        //         AsyncStorage.removeItem('alreadyLaunched')
        //         AsyncStorage.removeItem('token')
        //         dispatch(signOut())
        //       }}
        //     >
        //       Reset First Lauch
        //     </Button> */}
        //   </View>
        // )
      }
      renderItem={renderItem}
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

    paddingTop: spacing.xxl,
    marginTop: -spacing.sm,
    // paddingBottom: 60,
  },
})

export default React.memo(AllNewsSection)

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
