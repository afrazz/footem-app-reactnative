/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import React, { useEffect } from 'react'

import * as Linking from 'expo-linking'

import { spacing } from '../../utils/UIRules/spacing'
import Heading from '../../components/common/Heading'
import Spacer from '../../components/common/Spacer'
import NormalText from '../../components/NormalText'
import NewsSmallBlock from '../../components/common/NewsSmallBlock'
import {
  ActivityIndicator,
  Divider,
  FAB,
  IconButton,
  useTheme,
} from 'react-native-paper'
import { colors } from '../../utils/UIRules/colors'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNewsById } from '../../redux/slices/newsSlice'
import RenderHTML from 'react-native-render-html'
import fontFamily from '../../utils/UIRules/fontFamily'
import { calculateRelativeTime } from '../../utils/functions'
import dynamicLinks from '@react-native-firebase/dynamic-links'
import moment from 'moment'
import Icon from 'react-native-paper/src/components/Icon'
import { useNavigation } from '@react-navigation/native'
import FullScreenLoader from '../../components/common/FullScreenLoader'

const NewsDetailsScreen = ({ route }) => {
  // const { newsId } = route.params
  const { newsId, languageId } = route.params
  const dispatch = useDispatch()
  const { selectedNews, selectedNewsLoading } = useSelector(
    (state) => state.news
  )

  const theme = useTheme()
  const navigation = useNavigation()

  useEffect(() => {
    if (newsId) {
      // , languageId: dummyLanguageId
      dispatch(fetchNewsById({ newsId, languageId }))
    }
  }, [newsId])

  console.log('newsssssss', selectedNews)

  const { width } = useWindowDimensions()

  const generateLink = async () => {
    try {
      const link = await dynamicLinks().buildShortLink(
        {
          link: `https://footemxtra.page.link/ftm?newsId=${newsId}&languageId=${selectedNews?.newsData?.language?._id}`,
          // domainUriPrefix is created in your Firebase console
          domainUriPrefix: 'https://footemxtra.page.link',
          android: {
            packageName: 'com.footem.androidapp',
          },
          social: {
            title: selectedNews?.newsData?.title,
            descriptionText: selectedNews?.newsData?.language?.name,
            imageUrl: selectedNews?.imageUrl,
          },
        },
        dynamicLinks.ShortLinkType.DEFAULT
      )
      console.log('link', link)
      return link
    } catch (err) {
      console.log('Error:', err)
    }
  }

  const shareNews = async () => {
    const getLink = await generateLink()
    try {
      Share.share({
        message: getLink,
      })
    } catch (err) {
      console.log('Share Error: ', err)
    }
  }

  // const shareNews = async () => {
  //   const deepLink = Linking.createURL(`news/${selectedNews?._id}`)
  //   // const deepLink = 'https://google.com'

  //   try {
  //     const result = await Share.share({
  //       message: `Check out this football news: ${selectedNews?.newsData?.title} - ${deepLink}`,
  //       // url: deepLink,
  //     })

  //     if (result.action === Share.sharedAction) {
  //       console.log('Shared Successfully')
  //       // News shared successfully
  //     }
  //   } catch (error) {
  //     console.error('Error sharing news:', error)
  //   }
  // }

  const tagsStyles = {
    p: {
      // color: 'green',
      fontSize: 16,
      fontFamily: fontFamily.fontFamily,
      lineHeight: 28,
      color: theme.colors.text,
    },
  }

  const getPostedTime = (postedDate) => {
    console.log(postedDate)
    const localTime = moment.utc(postedDate).local().format()
    return moment(localTime).fromNow()
  }

  return (
    <>
      {/* {selectedNewsLoading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size={'large'} color={colors.dark} />
        </View>
      ) : ( */}
      {selectedNewsLoading ? (
        <FullScreenLoader />
      ) : (
        <ScrollView
          style={{
            position: 'relative',
            backgroundColor: theme.colors.background,
          }}
          refreshControl={
            <RefreshControl
              refreshing={selectedNewsLoading}
              onRefresh={() => dispatch(fetchNewsById({ newsId }))}
            />
          }
        >
          <>
            {/* <FAB
              icon="chevron-left"
              variant="primary"
              color={colors.white}
              style={{
                position: 'absolute',
                margin: 16,
                left: 0,
                top: 0,
                zIndex: 10,
                backgroundColor: colors.darkGray,
                borderRadius: 300,
              }}
              onPress={shareNews}
            /> */}
            <IconButton
              icon={'chevron-left'}
              size={28}
              iconColor={colors.white}
              style={{
                position: 'absolute',
                margin: 16,
                left: 0,
                top: 0,
                zIndex: 10,

                backgroundColor: colors.darkGray,
                // borderRadius: 300,
              }}
              onPress={() => navigation.goBack()}
            />

            {selectedNews && (
              <IconButton
                icon="share"
                size={28}
                iconColor={colors.white}
                style={{
                  position: 'absolute',
                  margin: 16,
                  right: 0,
                  top: 0,
                  zIndex: 10,
                  backgroundColor: colors.primary,
                  // borderRadius: 300,
                }}
                onPress={shareNews}
                // onPress={() => setVisibleModal(true)}
              />

              // <FAB
              //   icon="share"
              //   variant="primary"
              //   color={colors.white}
              //   style={{
              //     position: 'absolute',
              //     margin: 16,
              //     right: 0,
              //     top: 0,
              //     zIndex: 10,
              //     backgroundColor: colors.primary,
              //     borderRadius: 300,
              //   }}
              //   onPress={shareNews}
              // />
            )}

            <Image
              source={{
                uri: selectedNews.imageUrl,
              }}
              style={{
                width: '100%',
                height: 250,
                resizeMode: 'cover',
              }}
              // borderRadius={0}
            />
            {/* <Button label="Share" /> */}
            {/* <IconButton /> */}
            <Spacer space="md" />
            <View style={{ paddingHorizontal: spacing.md }}>
              <Heading
                text={selectedNews?.newsData?.title}
                fontType="bold"
                type="h4"
                lineHeight={30}
                //   style={{
                //     fontFamily: fontFamily.fontSemiBold,
                //     fontSize: fontSizes.h5,
                //     lineHeight: 25,
                //     color: colors.dark,
                //   }}
              />
              <Spacer space="md" />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <NormalText
                  fontFamily="regular"
                  fontSize="body3"
                  color="lightGray"
                >
                  {selectedNews?.startDate &&
                    getPostedTime(selectedNews?.startDate)}
                </NormalText>
                {/* <NormalText fontFamily="regular" fontSize="body3" color="lightGray">
                      30 min ago
                    </NormalText> */}
              </View>
              {/* <Spacer space="md" /> */}

              <RenderHTML
                contentWidth={width}
                source={{ html: selectedNews?.newsData?.desc }}
                tagsStyles={tagsStyles}
              />

              {/* <NormalText
                    fontFamily="regular"
                    fontSize="body1"
                    color="bodyCopy"
                    lineHeight={30}
                    lines={0}
                    textAlign="justify"
                    // backgroundColor="red"
                    containerMarginRight={0}
                  >
                    {selectedNews?.newsData?.desc}
                  </NormalText> */}
              <Spacer space="md" />
              {selectedNews?.relatedNews?.length > 0 && (
                <>
                  <Divider />

                  <Spacer space="lg" />
                  <Heading
                    text={'Related News'}
                    type="h5"
                    // containerStyle={{ marginTop: -5 }}
                  />
                  <Spacer space="md" />

                  <FlatList
                    data={selectedNews?.relatedNews}
                    renderItem={({ item }) => (
                      <>
                        <NewsSmallBlock
                          coverImage={item.imageUrl}
                          newsId={item?._id}
                          startDate={item?.startDate}
                          title={item?.newsData.title}
                        />
                        <Spacer space="md" />
                      </>
                    )}
                    keyExtractor={(item) => item._id}
                  />
                </>
              )}

              <Spacer space="xxl" />
            </View>
          </>
        </ScrollView>
      )}

      {/* )} */}
    </>
  )
}

export default NewsDetailsScreen

const styles = StyleSheet.create({})
