/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Alert,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
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
import NormalText from '../../components/NormalText'
import Nodata from '../../components/common/Nodata'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FullScreenLoader from '../../components/common/FullScreenLoader'

// import { useCurrentTabScrollY } from 'react-native-collapsible-tab-view'
// import { useDerivedValue } from 'react-native-reanimated'

// Study
// useCallback()

const TodayNewsSection = () => {
  const theme = useTheme()
  const LIMIT = 20
  // const didMount = useRef(false)
  //   const [latestNewsIndex, setLatestNewsIndex] = useState(null)

  const [page, setPage] = useState(1)
  const [hasLoadedAll, setHasLoadedAll] = useState(false)

  const { todayNews, todayNewsLoading } = useSelector((state) => state.news)
  const { language } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const onRefresh = useCallback(() => {
    fetchNewsHandler('create', 1)
    setPage(1)
  }, [language])

  useEffect(() => {
    if (language) {
      fetchNewsHandler('create', 1)
      setPage(1)
    }
  }, [language])

  const fetchNewsHandler = async (method, initialPage) => {
    let sendingValues = {
      type: NEWS_TYPE.today,
      params: {
        fetchToday: true,
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

  const loadMoreNewsData = async () => {
    if (!hasLoadedAll) {
      setPage((prev) => prev + 1)
    }
  }
  useEffect(() => {
    if (page > 1) {
      fetchNewsHandler('update')
    }
  }, [page])

  const renderItem = ({ item, index }) => {
    return (
      <>
        {index === 0 && (
          <>
            <Heading
              text={"Today's News"}
              type="h5"
              containerStyle={{ marginTop: -5 }}
            />
            <Spacer space="md" />
          </>
        )}

        <NewsLargeBlock
          coverImage={item?.imageUrl}
          title={item?.newsData[0]?.title}
          startDate={item?.startDate}
          newsId={item?._id}
          minsRead={item?.minuteRead}
        />
        <Spacer space="sm" />
      </>
    )
  }

  return (
    <Tabs.FlatList
      data={todayNews}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{ paddingBottom: spacing.lg }}
      refreshControl={
        <RefreshControl
          refreshing={todayNewsLoading}
          onRefresh={onRefresh}
          colors={[colors.primary]}
        />
      }
      onEndReached={loadMoreNewsData}
      onEndReachedThreshold={0}
      ListEmptyComponent={
        todayNewsLoading ? (
          <FullScreenLoader />
        ) : (
          todayNews.length === 0 &&
          !todayNewsLoading && (
            <Nodata
              // titleAlignment="left"
              title="No Results To Show"
              description="We'll Update Soon with latest results"
            />
          )
        )
      }
      // ListEmptyComponent={

      //   !todayNewsLoading && (
      //     <View
      //       style={{
      //         justifyContent: 'center',
      //         alignItems: 'center',
      //         flex: 0.5,
      //         marginRight: spacing.lg,
      //       }}
      //     >
      //       <Nodata
      //         title="No Results To Show"
      //         description="We'll Update Soon with latest results"
      //         titleAlignment="left"
      //       />
      //     </View>
      //   )
      // }
      // contentContainerStyle={{ paddingBottom: spacing.lg }}
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
    // backgroundColor: colors.white,
    paddingTop: spacing.xl,
    marginTop: -spacing.sm,
    // paddingBottom: 60,
  },
})

export default React.memo(TodayNewsSection)

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
