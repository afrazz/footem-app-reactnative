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
import { Card, useTheme } from 'react-native-paper'
import { spacing } from '../../utils/UIRules/spacing'
import { colors } from '../../utils/UIRules/colors'
import { LinearGradient } from 'expo-linear-gradient'
import Spacer from '../../components/common/Spacer'
import NormalText from '../../components/NormalText'
import { fetchYoutubeVideos } from '../../redux/slices/youtubeVideoSlice'
import { useDispatch, useSelector } from 'react-redux'
import playButtonIcon from '../../../assets/play-button.png'
import WebView from 'react-native-webview'
import YoutubePlayer from 'react-native-youtube-iframe'
import { useOrientation } from '../../hooks/useOrientation'
import VideosSection from '../../components/common/VideosSection'

const VideoPlayer = ({ route }) => {
  const [selectedVideoId, setSelectedVideoId] = useState(null)
  const [selectedVideoTitle, setSelectedVideoTitle] = useState(null)

  const theme = useTheme()

  const { videoId, title } = route.params

  useEffect(() => {
    if (videoId) {
      setSelectedVideoId(videoId)
    }
  }, [videoId])

  const onPress = ({ videoId, title }) => {
    setSelectedVideoId(videoId)
    setSelectedVideoTitle(title)
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <YoutubePlayer
        height={(Dimensions.get('window').width / 16) * 9}
        // height={deviceHeight / 3}
        // webViewStyle={{ height: 600 }}
        play={true}
        videoId={selectedVideoId}

        // onChangeState={onStateChange}
      />
      <VideosSection
        selectedVideoId={selectedVideoId}
        onPress={onPress}
        header={
          <View
            style={{
              paddingTop: 10,
              paddingHorizontal: spacing.md,
              paddingBottom: spacing.lg,
            }}
          >
            <NormalText
              textProperties={{ numberOfLines: 3 }}
              // color="gray"
              fontFamily="semiBold"
              lineHeight={22}
              // fontFamily="body1"
            >
              {selectedVideoTitle || title}
            </NormalText>
          </View>
        }
      />
    </View>
  )
}

export default VideoPlayer

const styles = StyleSheet.create({})
