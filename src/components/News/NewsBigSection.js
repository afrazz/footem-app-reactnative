import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import Heading from '../common/Heading'
import Spacer from '../common/Spacer'
import NewsLargeBlock from './NewsLargeBlock'

const NewsBigSection = () => {
  return (
    <>
      <Heading text={'Popular'} type="h5" containerStyle={{ marginTop: -5 }} />
      <Spacer space="md" />
      <FlatList
        horizontal
        bounces={false}
        // pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        legacyImplementation={false}
        data={['', '', '', '']}
        renderItem={(item) => <NewsLargeBlock mode="multiple" />}
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}

        // keyExtractor={(photo) => photo.id}
        // style={{ height: '70%' }}
      />
    </>
  )
}

export default NewsBigSection

const styles = StyleSheet.create({})
