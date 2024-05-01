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
import { Tab, Tabs } from 'react-native-collapsible-tab-view'
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

const TransferNewsSection = () => {
  const theme = useTheme()
  const LIMIT = 20
  // const didMount = useRef(false)
  //   const [latestNewsIndex, setLatestNewsIndex] = useState(null)

  const [page, setPage] = useState(1)
  const [hasLoadedAll, setHasLoadedAll] = useState(false)

  const { transferNews, transferNewsLoading } = useSelector(
    (state) => state.news
  )
  const { language } = useSelector((state) => state.auth)

  //   Alert.alert(JSON.stringify(transferNews))

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
      type: NEWS_TYPE.transfer,
      params: {
        isTransferNews: true,
        getRunningNews: true,
        languageId: language,
        page: initialPage || page,
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
              text={'Transfer News'}
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
      data={transferNews}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{ paddingBottom: spacing.lg }}
      refreshControl={
        <RefreshControl
          refreshing={transferNewsLoading}
          onRefresh={onRefresh}
          colors={[colors.primary]}
        />
      }
      onEndReached={loadMoreNewsData}
      onEndReachedThreshold={0}
      ListEmptyComponent={
        transferNewsLoading ? (
          <FullScreenLoader />
        ) : (
          transferNews.length === 0 &&
          !transferNewsLoading && (
            <Nodata
              // titleAlignment="left"
              title="No Results To Show"
              description="We'll Update Soon with latest results"
            />
          )
        )
      }
      // ListEmptyComponent={
      //   !transferNewsLoading && (
      //     <View
      //       style={{
      //         justifyContent: 'center',
      //         alignItems: 'center',
      //         flex: 0.5,
      //         // marginRight: spacing.lg,
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
    paddingHorizontal: spacing.md,
    // backgroundColor: colors.white,
    paddingTop: spacing.xl,
    marginTop: -spacing.sm,
    paddingBottom: 30,
  },
})

export default React.memo(TransferNewsSection)
