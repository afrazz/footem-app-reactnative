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
import NewsLargeBlock from '../../components/News/NewsLargeBlock'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNews, resetNews } from '../../redux/slices/newsSlice'
import { NEWS_TYPE } from '../../constants'
import { Tabs } from 'react-native-collapsible-tab-view'
import Nodata from '../../components/common/Nodata'
import { useFocusEffect } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'

// import { useCurrentTabScrollY } from 'react-native-collapsible-tab-view'
// import { useDerivedValue } from 'react-native-reanimated'

// Study
// useCallback()

const TeamNewsSection = ({ teamId }) => {
  const theme = useTheme()
  const LIMIT = 20
  // const didMount = useRef(false)
  //   const [latestNewsIndex, setLatestNewsIndex] = useState(null)

  const [page, setPage] = useState(1)
  const [hasLoadedAll, setHasLoadedAll] = useState(false)

  const { teamNews, teamNewsLoading } = useSelector((state) => state.news)
  const { language } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const onRefresh = useCallback(() => {
    fetchNewsHandler('create', 1)
    setPage(1)
  }, [language])

  useEffect(() => {
    fetchNewsHandler('create', 1)
    setPage(1)
  }, [language])

  const fetchNewsHandler = async (method, initialPage) => {
    // const languageId = await AsyncStorage.getItem('languageId')

    const sendingValues = {
      type: NEWS_TYPE.team,
      params: {
        team: teamId,
        languageId: language,
        page: initialPage || page,
        limit: LIMIT,
      },
      method,
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

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        dispatch(resetNews('teamNews'))
        // Dimensions.removeEventListener('change', updateOrientation)
      }
    }, [])
  )

  return (
    <Tabs.FlatList
      data={teamNews}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={{ paddingBottom: spacing.lg }}
      refreshControl={
        <RefreshControl
          refreshing={teamNewsLoading}
          onRefresh={onRefresh}
          colors={[colors.primary]}
        />
      }
      onEndReached={loadMoreNewsData}
      onEndReachedThreshold={0}
      ListEmptyComponent={
        !teamNewsLoading && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 0.5,
              marginRight: spacing.lg,
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
      // contentContainerStyle={{ paddingBottom: spacing.lg }}
      renderItem={({ item, index }) => {
        return (
          <>
            {index === 0 && (
              <>
                {/* <Heading
                  text={"Teams's News"}
                  type="h5"
                  containerStyle={{ marginTop: -5 }}
                /> */}
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
      }}
    />
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,

    paddingTop: spacing.xl,
    marginTop: -spacing.sm,
    // paddingBottom: 60,
  },
})

export default React.memo(TeamNewsSection)
