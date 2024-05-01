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
import React from 'react'
import Header from '../../components/common/Header'
import { spacing } from '../../utils/UIRules/spacing'
import { colors } from '../../utils/UIRules/colors'
import { useState } from 'react'
import { useRef } from 'react'
import { useOrientation } from '../../hooks/useOrientation'
import WebView from 'react-native-webview'
import Spacer from '../../components/common/Spacer'
import { useDispatch, useSelector } from 'react-redux'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { fetchYoutubeVideos } from '../../redux/slices/youtubeVideoSlice'
import Nodata from '../../components/common/Nodata'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'
import NormalText from '../../components/NormalText'
import playButtonIcon from '../../../assets/play-button.png'
import Heading from '../../components/common/Heading'
import Card from '../../components/common/Card'
import { FlashList } from '@shopify/flash-list'
import VideosSection from '../../components/common/VideosSection'
import { useTheme } from 'react-native-paper'

const VideoScreen = ({ navigation }) => {
  // const [isScrolling, setIsScrolling] = useState(true)
  // const youtubePlayerRef = useRef(null)

  const theme = useTheme()

  let deviceHeight = Dimensions.get('window').height
  // return (
  //   <View>
  //     <Header title="Videos" />
  //     <FlatList
  //       style={{
  //         paddingHorizontal: spacing.md,
  //         paddingTop: spacing.lg,
  //       }}
  //       ListFooterComponent={<View style={{ height: 90 }} />}
  //       onScrollBeginDrag={() => setIsScrolling(true)}
  //       onScrollEndDrag={() => setIsScrolling(false)}
  //       nestedScrollEnabled
  //       data={['', '', '', '', '', '']}
  //       renderItem={({ item }) => (
  //         //   <YoutubePlayer
  //         //     height={orientation === 'PORTRAIT' ? 240 : 480}
  //         //     //   play={isScrolling}
  //         //     //   forceAndroidAutoplay={true}
  //         //     //   width={400}
  //         //     // play={playing}
  //         //     videoId={'qU2d9kZMIr4'}
  //         //     // webViewProps={}
  //         //     // onChangeState={onStateChange}
  //         //   />
  //         <>
  //           <WebView
  //             style={{ height: orientation === 'PORTRAIT' ? 240 : 480 }}
  //             allowsFullscreenVideo
  //             source={{
  //               uri: 'https://www.youtube.com/embed/5VICP8dfjlQ?rel=0&autoplay=0&showinfo=0&fullscreen=1',
  //             }}
  //             javaScriptEnabled={true}
  //           />
  //           <Spacer space="lg" />
  //         </>
  //       )}
  //       keyExtractor={(item) => item.id}
  //     />
  //   </View>
  // )

  // console.log(youtubeVideos, 'heyy')
  const onPress = ({ videoId, title }) => {
    navigation.navigate('VideoPlayer', {
      videoId: videoId,
      title: title,
    })
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Header title="Videos" />
      <VideosSection onPress={onPress} />
      {/* {!youtubeVideosLoading && youtubeVideos?.length === 0 ? (
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
            titleAlignment="left"
            description="We'll Update Soon with latest results"
          />
        </View>
      ) : (
        !youtubeVideosLoading &&
        youtubeVideos?.length > 0 && ( */}

      {/* )
      )} */}
    </View>
  )
}

export default VideoScreen

const styles = StyleSheet.create({})
