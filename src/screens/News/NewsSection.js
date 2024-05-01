/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { spacing } from '../../utils/UIRules/spacing'
import { colors } from '../../utils/UIRules/colors'
import Heading from '../../components/common/Heading'
import Spacer from '../../components/common/Spacer'
import NewsSmallSection from '../../components/News/NewsSmallSection'
import NewsLargeBlock from '../../components/News/NewsLargeBlock'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNews } from '../../redux/slices/newsSlice'
// import { useCurrentTabScrollY } from 'react-native-collapsible-tab-view'
// import { useDerivedValue } from 'react-native-reanimated'

const NewsSection = ({ data, type, params }) => {
  // const dispatch = useDispatch()

  // const scrollY = new Animated.Value(0)

  // const scrollYText = useDerivedValue(
  //   () => `Scroll Y is: ${scrollY.value.toFixed(2)}`
  // )
  // const scrollY = useCurrentTabScrollY()

  // useDerivedValue(() => {
  //   // yOffsetCallback(scrollY.value.toFixed(2))
  //   console.log('sbd', scrollY.value.toFixed(2))
  // })

  // console.log(style.value, 'my-value')

  // useEffect(() => {
  //   dispatch(fetchNews({ type, params }))
  // }, [])

  return (
    <ScrollView
      scrollEventThrottle={16}
      // boun
      style={styles.container}
    >
      <NewsLargeBlock />
      <Spacer space="sm" />
      <NewsSmallSection />

      <Spacer space="lg" />
      <Heading
        text={'Latest News'}
        type="h5"
        containerStyle={{ marginTop: -5 }}
      />
      <Spacer space="md" />
      <NewsLargeBlock />

      <Spacer space="lg" />
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
    paddingTop: spacing.xl,
    marginTop: -spacing.sm,
  },
})

export default React.memo(NewsSection)

{
  /* <FlatList
        horizontal
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        legacyImplementation={false}
        data={['', '', '', '']}
        renderItem={(item) => <PostBlock />}
        style={{ marginTop: -8, width: 'auto' }}
        // ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        // keyExtractor={(photo) => photo.id}
        style={{ height: '70%' }}
      /> */
}
{
  /* <ScrollView horizontal>
        <View style={{ marginRight: 20 }}>
          <PostBlock />
        </View>
        <View style={{ marginRight: 20 }}>
          <PostBlock />
        </View>
      </ScrollView> */
}
