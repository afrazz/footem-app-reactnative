import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { fetchYoutubeVideos } from '../../../redux/slices/youtubeVideoSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Card from '../Card'
import { spacing } from '../../../utils/UIRules/spacing'
import playButtonIcon from '../../../../assets/play-button.png'
import { colors } from '../../../utils/UIRules/colors'
import { LinearGradient } from 'expo-linear-gradient'
import Spacer from '../Spacer'
import NormalText from '../../NormalText'

const VideosSection = ({ onPress, selectedVideoId, header }) => {
  let deviceHeight = Dimensions.get('window').height
  const navigation = useNavigation()

  const LIMIT = 20
  // const didMount = useRef(false)

  const [page, setPage] = useState(1)
  const [hasLoadedAll, setHasLoadedAll] = useState(false)

  const { youtubeVideos, youtubeVideosLoading } = useSelector(
    (state) => state.youtubeVideo
  )
  const { language } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const onRefresh = useCallback(() => {
    fetchYoutubeVideosHandler('create', 1)
    setPage(1)
  }, [language])

  useEffect(() => {
    fetchYoutubeVideosHandler('create', 1)
    setPage(1)
  }, [language])

  const fetchYoutubeVideosHandler = async (method, initialPage) => {
    // const languageId = await AsyncStorage.getItem('languageId')
    console.log(language, 'heheh')
    dispatch(
      fetchYoutubeVideos({
        data: {
          params: {
            languageId: language,
            page: initialPage || page,
            limit: LIMIT,
          },
          method,
        },
        setHasLoadedAll: setHasLoadedAll,
      })
    )
  }

  const loadMoreYoutubeVideos = async () => {
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
      fetchYoutubeVideosHandler('update')
    }
  }, [page])

  return (
    <FlatList
      data={
        selectedVideoId
          ? youtubeVideos?.filter(
              (ytVideo) => ytVideo.videoId !== selectedVideoId
            )
          : youtubeVideos
      }
      keyExtractor={(item) => item._id}
      // estimatedItemSize={20}
      style={
        {
          // paddingHorizontal: spacing.md,
          // paddingTop: spacing.lg,
        }
      }
      // ListFooterComponent={<View style={{ height: 90 }} />}
      refreshControl={
        <RefreshControl
          refreshing={youtubeVideosLoading}
          onRefresh={onRefresh}
          colors={[colors.primary]}
        />
      }
      onEndReached={loadMoreYoutubeVideos}
      onEndReachedThreshold={0.1}
      initialNumToRender={5}
      maxToRenderPerBatch={10}
      windowSize={10}
      ListHeaderComponent={header || null}
      // contentContainerStyle={{ paddingBottom: spacing.lg }}
      // ListEmptyComponent={
      //   !youtubeVideosLoading && (
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
      //       />
      //     </View>
      //   )
      // }
      renderItem={({ item, index }) => {
        console.log('foepe', item)
        return (
          <TouchableOpacity
            onPress={() =>
              onPress({ videoId: item?.videoId, title: item?.data[0]?.title })
            }
          >
            {/* <Card
              marginRight={0}
              contentPadding={0}
              width={'100%'}
              // borderRadius={spacing.md}
              marginBottom={spacing.md}
            > */}
            <ImageBackground
              style={{
                // width: deviceWidth,
                height: deviceHeight / 3.6,
                position: 'relative',
                // transform: [{translateX: }]
              }}
              source={{
                uri: `https://img.youtube.com/vi/${item?.videoId}/hqdefault.jpg`,
              }}
            >
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  zIndex: 100,
                }}
              >
                <Image
                  source={playButtonIcon}
                  style={{
                    height: 60,
                    width: 60,
                    resizeMode: 'contain',

                    // transform: [
                    //   { translateX: -(deviceWidth / 10) }, // Adjust for half of the image width
                    //   { translateY: -(deviceHeight / 6) }, // Adjust for half of the parent height
                    // ],
                  }}
                />
              </View>

              <LinearGradient
                colors={['#00000000', '#000000']}
                style={{ height: '100%', width: '100%' }}
              ></LinearGradient>
            </ImageBackground>

            {/* <Image
            source={{
              uri: `https://img.youtube.com/vi/${item?.videoId}/hqdefault.jpg`,
            }}
            style={{
              width: '100%',
              borderRadius: 8,
              height: deviceHeight / 3.3, // 215 => Default
              resizeMode: 'cover',
            }}
          >
            <LinearGradient
              colors={['#00000000', '#000000']}
              style={{ height: deviceHeight / 3.3, width: '100%' }}
            ></LinearGradient>
          </Image> */}

            {/* <WebView
            style={{ height: orientation === 'PORTRAIT' ? 240 : 480 }}
            allowsFullscreenVideo
            source={{
              uri: `https://www.youtube.com/embed/${item?.videoId}?rel=0&autoplay=0&showinfo=0&fullscreen=1`,
            }}
            javaScriptEnabled={true}
          /> */}
            <Spacer space="sm" />
            <View style={{ paddingHorizontal: spacing.md }}>
              <NormalText
                textProperties={{ numberOfLines: 3 }}
                // color="gray"
                fontFamily="semiBold"
                lineHeight={22}
                // fontFamily="body1"
              >
                {item?.data[0]?.title}
              </NormalText>
              {/* <Heading
              text={item?.title}
              type="h5"
              containerStyle={{ marginTop: -5 }}
              textAdditionalStyle={{ numberOfLines: 3 }}
            /> */}
            </View>

            <Spacer space="lg" />
            {/* </Card> */}
          </TouchableOpacity>
        )
      }}
    />
  )
}

export default VideosSection

const styles = StyleSheet.create({})
