/* eslint-disable react/prop-types */
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import { Card, Title, useTheme } from 'react-native-paper'
import Spacer from '../common/Spacer'
import { fontSizes } from '../../utils/UIRules/fontSize'
import fontConfig from '../../utils/UIRules/fontFamily'
import { colors } from '../../utils/UIRules/colors'
import NormalText from '../NormalText'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { useSelector } from 'react-redux'
// import { calculateRelativeTime } from '../../utils/functions'

// const LeftContent = () => (
//   <Avatar.Icon
//     color="white"
//     icon="camera"
//     style={{ backgroundColor: 'green' }}
//     size={45}
//   />
// )

const NewsLargeBlock = ({
  mode = 'single',
  coverImage,
  title,
  startDate,
  newsId,
  minsRead = '5',
}) => {
  const localTime = moment.utc(startDate).local().format()

  const navigation = useNavigation()
  let deviceWidth = Dimensions.get('window').width
  let deviceHeight = Dimensions.get('window').height

  const theme = useTheme()
  const { language } = useSelector((state) => state.auth)

  return (
    <TouchableOpacity
      // TODO: ADD LANGUAGE Id
      onPress={() =>
        navigation.navigate('NewsDetails', {
          newsId: newsId,
          languageId: language,
        })
      }
    >
      <Card
        style={{
          borderRadius: 0,
          backgroundColor: theme.colors.background,
          width: mode === 'single' ? '100%' : deviceWidth - 100,
          // marginRight: 20,
          elevation: 5,
          borderColor: 'transparent',
        }}
        mode="outlined"
      >
        {/* <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={LeftContent}
        /> */}

        <Image
          source={{
            uri: coverImage,
          }}
          style={{
            width: '100%',
            borderRadius: 8,
            height: deviceHeight / 3.6, // 215 => Default
            resizeMode: 'cover',
          }}
          // borderRadius={0}
        />
        <Spacer space="sm" />
        <Card.Content>
          {/* <View style={{ flexDirection: 'row' }}>
            <Button icon="heart-circle" contentStyle={{ fontSize: 200 }}>
              Like{' '}
            </Button>
            <Button icon="comment-processing">Comment</Button>
            <Button icon="share-circle">Share</Button>
          </View> */}
          <Title
            style={{
              fontFamily: fontConfig.fontFamily,
              fontSize: fontSizes.h5,
              lineHeight: 25,
              marginLeft: -16,
              color: theme.colors.text,
            }}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {title}
          </Title>
          <Spacer space="sm" />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginLeft: -16,
              marginTop: -4,
            }}
          >
            {/* <Button icon={'clock-time-five'} color="#4A484D" /> */}
            <NormalText fontFamily="regular" fontSize="body3" color="lightGray">
              {/* {moment().calendar(startDate, formats)} */}
              {/* {calculateRelativeTime(startDate)} */}
              {moment(localTime).fromNow()}
            </NormalText>
            <NormalText
              fontFamily="regular"
              fontSize="body3"
              color="lightGray"
              containerMarginRight={0}
            >
              {/* {moment().calendar(startDate, formats)} */}
              {`${minsRead} Min Read`}
            </NormalText>
            {/* <Paragraph style={{ marginLeft: -25, color: colors.darkGray }}>
              30 min ago
            </Paragraph> */}
          </View>

          {/* <Spacer space="sm" /> */}
          {/* <Paragraph style={{ color: colors.darkGray }}>
            Cristiano Ronaldo statistics – 38 years_old Al Nassr FC Midfielder
            (Left) / Forward. Check out his latest detailed ...
          </Paragraph> */}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  // MainContainer: {
  //   flex: 1,
  // },
})
export default NewsLargeBlock
