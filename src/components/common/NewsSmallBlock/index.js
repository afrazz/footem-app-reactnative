/* eslint-disable react/prop-types */
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import NormalText from '../../NormalText'
import { spacing } from '../../../utils/UIRules/spacing'
import { calculateRelativeTime } from '../../../utils/functions'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { useSelector } from 'react-redux'

const NewsSmallBlock = ({ coverImage, title, startDate, newsId }) => {
  const navigation = useNavigation()
  const localTime = moment.utc(startDate).local().format()
  const { language } = useSelector((state) => state.auth)
  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', width: 'auto' }}
      onPress={() =>
        navigation.navigate('NewsDetails', {
          newsId: newsId,
          languageId: language,
        })
      }
    >
      <Image
        source={{
          uri: coverImage,
        }}
        style={{
          width: '40%',
          borderRadius: 16,
          height: 90,
          resizeMode: 'cover',
          marginRight: spacing.md,
        }}
        // borderRadius={0}
      />
      <View
        style={{
          justifyContent: 'space-between',
          width: '60%',

          paddingRight: spacing.md,
        }}
      >
        <NormalText
          fontFamily="regular"
          fontSize="body2"
          color="dark"
          lineHeight={22}
          textProperties={{ numberOfLines: 3 }}
          // lines={3}
          // textAlign="justify"
        >
          {title}
        </NormalText>
        <NormalText fontFamily="regular" fontSize="body3" color="lightGray">
          {moment(localTime).fromNow()}
        </NormalText>
      </View>
      {/* 
        <NormalText fontFamily="regular" fontSize="body3" color="lightGray">
          30 min ago
        </NormalText> */}
      {/* </View> */}
    </TouchableOpacity>
  )
}

export default NewsSmallBlock

const styles = StyleSheet.create({})
