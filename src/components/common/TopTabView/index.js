/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native'
import {
  Tabs,
  MaterialTabBar,
  MaterialTabItem,
} from 'react-native-collapsible-tab-view'
import { Text, useTheme } from 'react-native-paper'
import { colors } from '../../../utils/UIRules/colors'
import { spacing } from '../../../utils/UIRules/spacing'
import fontFamily from '../../../utils/UIRules/fontFamily'
import { fontSizes } from '../../../utils/UIRules/fontSize'

const HEADER_HEIGHT = 100

// TabViewData = [{name: 'Name1', component: <wefwe>}]

// const TabHeader = (props) => {
//   // const { yOffsetCallback } = props
//   const scrollY = useCurrentTabScrollY()
//   useDerivedValue(() => {
//     // yOffsetCallback(scrollY.value.toFixed(2))
//     console.log('sbd', scrollY.value.toFixed(2))
//   })
//   return <View style={{ height: 100 }} />
// }

const TopTabView = ({
  Header,
  TabViewData,
  TabsSpacingTop = 'xxl',
  // activeBgColor = colors.primary,
  removeShadow = false,
  variant = 'light',
  variantColor = 'red',
  tabRef,
}) => {
  const theme = useTheme()
  const pageRef = useRef()

  const TabItem = (props) => {
    return (
      <MaterialTabItem
        scrollEnabled
        {...props}
        // onPress={(e) => console.log(e, 'hom')}
        // label={(prop) => {
        //   // Alert.alert(JSON.stringify(prop))
        //   // Alert.alert(JSON.stringify(prop))
        //   return (
        //     <View style={{ marginRight: -8 }}>
        //       <Text
        //         style={styles.tabBarLabel(
        //           activeIndex === prop.index,
        //           activeBgColor
        //         )}
        //       >
        //         {prop.name}
        //       </Text>
        //     </View>
        //   )
        // }}
        activeColor={variant === 'light' ? theme.colors.text : colors.white}
        pressColor="transparent"
        inactiveColor={variant === 'light' ? theme.colors.text : colors.white}
      />
    )
  }

  // useEffect(() => {
  //   pageRef?.current?.jumpToTab('Today')
  // }, [])

  const scrollViewRef = useRef(null)

  const handleTabPress = (index) => {
    const offsetX = index
    scrollViewRef.current?.scrollTo({
      x: (offsetX - 1) * 80,
      y: 0,
      animated: true,
    })
  }
  // pageRef?.current?.jumpToTab('Today')
  const tabBar = (props) => {
    // alert(JSON.stringify(props))
    return (
      <>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled
          style={{
            backgroundColor:
              variant === 'light' ? theme.colors.secondaryBg : variantColor,
          }}
        >
          <MaterialTabBar
            // keepActiveTabCentered
            {...props}
            indicatorStyle={{
              backgroundColor:
                variant === 'light' ? theme.colors.text : colors.white,
              height: 3,
              borderRadius: 100,
              // marginHorizontal: spacing.md,
              // borderBottomWidth: 3,
            }}
            labelStyle={{
              fontFamily: fontFamily.fontSemiBold,
              fontSize: fontSizes.body2,
              textTransform: 'capitalize',
            }}
            style={{
              // paddingTop: 40,
              // paddingBottom: spacing.md,
              width: 'auto',
              marginLeft: spacing.sm,
              paddingTop: TabsSpacingTop ? spacing[TabsSpacingTop] : 0,
              elevation: 0,
              shadowColor: 'transparent',

              // transform: [{ translateY: -10 }],
            }}
            scrollEnabled
            TabItemComponent={TabItem}
          />
        </ScrollView>
      </>
    )
  }

  // useEffect(() => {
  //   const index = pageRef.current?.getCurrentIndex()
  // }, [])
  return (
    <>
      {/* <StatusBar backgroundColor="white" barStyle="dark-content" /> */}
      <Tabs.Container
        ref={tabRef}
        pagerProps={{
          scrollEnabled: true,
          // onPageScrollStateChanged: (hey) =>
          //   console.log(hey.currentTarget.valueOf(), 'weee'),
          // onPageSelected: (e) => {
          //   const pos = e.nativeEvent.position
          //   setActiveIndex(Number(pos))
          // },
        }}
        onIndexChange={(index) => {
          // setActiveIndex(index)

          // activeIndexRef.current = index // Update the active index in the ref
          // setActiveIndex(index)

          handleTabPress(index)
        }}
        renderHeader={Header}
        revealHeaderOnScroll
        // allowHeaderOverscroll
        headerContainerStyle={{
          width: '100%',
          // elevation: 0,
          shadowColor: removeShadow ? 'transparent' : colors.darkGray,
        }}
        containerStyle={{
          width: '100%',
          // elevation: 0,
          // shadowColor: 'transparent',
        }}
        renderTabBar={tabBar}
        lazy

        // onTabChange={(val) => {
        //   const array = []

        //   array.push(val)

        //   console.log(array, 'showme')
        //   // setActiveIndex(3)
        // }}
        // initialTabName="Today"
      >
        {TabViewData.map((data) => (
          <Tabs.Tab key={data.name} name={data.name}>
            {/* <Tabs.ScrollView style={{ height: 100 }}> */}
            {/* <ScrollView> */}
            {data.component}
            {/* </ScrollView> */}
            {/* </Tabs.ScrollView> */}
          </Tabs.Tab>
        ))}
      </Tabs.Container>
    </>
  )
}

const styles = StyleSheet.create({
  box: {
    height: 250,
    width: '100%',
  },
  boxA: {
    backgroundColor: 'white',
  },
  boxB: {
    backgroundColor: '#D8D8D8',
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: '#2196f3',
  },
  tabBarLabel: (focused, activeBgColor) => ({
    fontFamily: fontFamily.fontSemiBold,
    color: focused ? colors.white : colors.bodyCopy,
    backgroundColor: focused ? activeBgColor : colors.unActiveButton,
    // margin: 8,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    // paddingTop: spacing.sm,
    // height: 35,
    width: '100%',
    fontSize: 13,
    borderRadius: 10,
  }),
})

export default TopTabView
