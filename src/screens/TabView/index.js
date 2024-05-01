/* eslint-disable react/prop-types */
import * as React from 'react'

import { colors } from '../../utils/UIRules/colors'
import fontFamily from '../../utils/UIRules/fontFamily'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { TabView as RNTabView, TabBar } from 'react-native-tab-view'
import Heading from '../../components/common/Heading'
import { spacing } from '../../utils/UIRules/spacing'
import Animated from 'react-native-reanimated'
import { useState } from 'react'

// const FirstRoute = () => (
//   <View style={{ height: 800, backgroundColor: '#ff4081' }} />
// )

// const SecondRoute = () => (
//   <View style={{ height: 800, backgroundColor: '#673ab7' }} />
// )

const TabView = ({ TabViewData, headerY, newsSectionHeight }) => {
  // [{key: first, title: 'This Day', component: <Component />}]
  const [index, setIndex] = React.useState(0)
  const [height, setHeight] = useState(Dimensions.get('window').height * 10)
  const [done, setDone] = useState(false)

  React.useEffect(() => {
    if (newsSectionHeight) {
      setHeight(newsSectionHeight)
    }
  }, [newsSectionHeight])

  // const [renderScene, setRenderScene] = React.useState(null)
  // const [routes] = React.useState([
  //   { key: 'first', title: 'This Day' },
  //   { key: 'second', title: 'Next Day' },
  // ])

  // const renderScene1 = SceneMap({
  //   first: FirstRoute,
  //   second: SecondRoute,
  // })

  // React.useEffect(() => {
  //   if (TabViewData?.length > 0) {
  //     const renderSceneTabData = TabViewData?.map((data) => {
  //       // console.log('afaf', data)
  //       return {
  //         [data.key]: data.component,
  //       }
  //     })

  //     // const formatedRenderScene = renderSceneTabData.reduce(
  //     //   (r, c) => Object.assign(r, c),
  //     //   {}
  //     // )

  //     // setRenderScene(formatedRenderScene)
  //   }
  // }, [TabViewData])

  const renderTabBar = (props) => {
    return (
      <View>
        {/* <Animated.View
          style={{
            position: 'absolute',
            width: '100%',
            height: 136,
            backgroundColor: 'red',

            left: 0,
            right: 0,
            zIndex: 100,
            // transform: [{ translate: headerY }],
            // marginTop: ,
          }}
        >
          <View
            style={{
              height: 70,
              backgroundColor: 'green',
              paddingTop: spacing.md,
            }}
          >
            <Heading text={'News'} type="h3" fontType="semiBold" />
          </View> */}
        {/*Upper Header*/}
        <TabBar
          tabStyle={styles.tabStyle}
          {...props}
          indicatorStyle={{ backgroundColor: 'white' }}
          pressOpacity={0}
          pressColor="white"
          style={{
            backgroundColor: 'white',
            // paddingTop: 40,
            height: 66,
            // transform: [{ translateY: -70 }],
            // paddingBottom:
          }}
          scrollEnabled
          renderIndicator={() => <></>}
          renderLabel={(prop) => {
            console.log(prop.focused, 'focuss')
            return (
              <Text style={styles.tabBarLabel(prop.focused)}>
                {prop.route.title}
              </Text>
            )
          }}
        />
        {/* </Animated.View> */}

        {/* <View style={{ height: headerY }}></View> */}
      </View>
    )
  }

  const renderScene = ({ route, jumpTo }) => {
    for (let i = 0; i < TabViewData.length; i++) {
      console.log(TabViewData[i].key, 'kljdjl', TabViewData[i].key)
      if (route.key === TabViewData[i].key) {
        console.log('sdss', route.key)
        return TabViewData[i].component
      }
    }
  }
  return (
    <>
      <RNTabView
        // style={{ height: heights }}
        // style={{ flex: 1, overflow: 'visible' }}

        lazy
        renderTabBar={renderTabBar}
        navigationState={{ index, routes: TabViewData }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderLazyPlaceholder={() => (
          <View style={{ height: 200, backgroundColor: 'red' }}>
            <Text>Loading...</Text>
          </View>
        )}
        // pagerStyle={{ height: height }}
        pagerStyle={{ height: height }}
        // style={{ height: 1400 }}
        // onLayout={(event) => {
        //   var { x, y, width, height } = event.nativeEvent.layout
        //   console.log(height, 'lkj')
        // }}

        // overScrollMode="always"
        swipeEnabled={false}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabStyle: {
    width: 'auto',
    // transform: [{ translateX: -25 }],
    marginLeft: -8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarLabel: (focused) => ({
    fontFamily: fontFamily.fontSemiBold,
    color: focused ? colors.white : colors.bodyCopy,
    backgroundColor: focused ? colors.primary : '#EDF1EE',
    margin: 8,
    textAlign: 'center',
    paddingHorizontal: 4,
    paddingVertical: 10,
    width: '100%',
    fontSize: 13,
    borderRadius: 10,
  }),
})

export default TabView
