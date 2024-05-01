import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Heading from '../common/Heading'
import Spacer from '../common/Spacer'
import NewsSmallBlock from '../common/NewsSmallBlock'

const NewsSmallSection = () => {
  return (
    <View>
      {/* <Heading
        text={'Latest News'}
        type="h5"
        containerStyle={{ marginTop: -5 }}
      /> */}
      {/* <Spacer space="md" /> */}

      <NewsSmallBlock />
    </View>
  )
}

export default NewsSmallSection

const styles = StyleSheet.create({})
