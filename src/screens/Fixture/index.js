import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Alert,
  TouchableOpacity,
} from 'react-native'
import React, { memo, useRef } from 'react'
import Spacer from '../../components/common/Spacer'
import Heading from '../../components/common/Heading'
import { spacing } from '../../utils/UIRules/spacing'
import { Button, List, useTheme } from 'react-native-paper'
import TabView from '../TabView'
import AccordianBlock from '../../components/common/AccordianBlock'
import FixtureHeader from './FixtureHeader'
import TopTabView from '../../components/common/TopTabView'
import { useEffect } from 'react'

import Calendar from '../../components/common/Calendar'
import { useState } from 'react'
import Modal from '../../components/common/Modal'
import { colors } from '../../utils/UIRules/colors'
import { useNavigation } from '@react-navigation/native'
import FixtureSection from './FixtureSection'
import moment from 'moment'
import { useFocusedTab } from 'react-native-collapsible-tab-view'

const INITIALTABDATA = [
  {
    name: 'Live',
    component: <FixtureSection isLive />,
  },
  {
    name: 'Today',
    component: <FixtureSection date={moment().format('YYYY-MM-DD')} />,
  },
  {
    name: 'Tommorrow',
    component: (
      <FixtureSection date={moment().add(1, 'day').format('YYYY-MM-DD')} />
    ),
  },
  {
    name: 'Yesterday',
    component: (
      <FixtureSection date={moment().subtract(1, 'day').format('YYYY-MM-DD')} />
    ),
  },
]

const FixtureScreen = () => {
  const theme = useTheme()
  const tabRef = useRef()
  const navigation = useNavigation()
  const [expanded, setExpanded] = React.useState(true)
  const [IscalendarOpen, setIsCalendarOpen] = useState(false)
  const [tabData, setTabData] = useState(INITIALTABDATA)

  const handlePress = () => setExpanded(!expanded)

  const onDone = async (selectedDate) => {
    // setSelectedCalendarDate(selectedDate)
    // setVisibleModal(false)

    // await setTabData([])

    const isFindFound = tabData.find((tab) => tab.name === selectedDate)

    if (!isFindFound) {
      await setTabData([
        // ...tabDataCloned,
        // ...INITIALTABDATA,
        ...tabData,
        {
          name: selectedDate,
          component: <FixtureSection date={selectedDate} />,
        },

        // {
        //   name: 'Live',
        //   component: <FixtureSection isLive />,
        // },
        // {
        //   name: 'Today',
        //   component: <FixtureSection date={moment().format('YYYY-MM-DD')} />,
        // },
        // {
        //   name: 'Tommorrow',
        //   component: (
        //     <FixtureSection date={moment().add(1, 'day').format('YYYY-MM-DD')} />
        //   ),
        // },
        // {
        //   name: 'Yesterday',
        //   component: (
        //     <FixtureSection
        //       date={moment().subtract(1, 'day').format('YYYY-MM-DD')}
        //     />
        //   ),
        // },
      ])

      jumpTo(selectedDate)
    } else {
      jumpTo(selectedDate)
    }
  }

  const jumpTo = (selectedDate) => {
    setTimeout(() => {
      tabRef?.current?.jumpToTab(selectedDate)
    }, 500)
  }

  // useEffect(() => {
  //   if (selectedCalendarDate) {
  //     console.log('selectedCalcendar', selectedCalendarDate)
  //   }
  // }, [selectedCalendarDate])

  return (
    <>
      {/* <StatusBar backgroundColor={theme.colors.background} barStyle="default" /> */}
      <TopTabView
        tabRef={tabRef}
        Header={() => (
          <FixtureHeader
            setTabData={setTabData}
            tabData={tabData}
            onDone={onDone}
            // setSelectedDate={setSelectedDate}
            // selectedDate={selectedDate}
          />
        )}
        TabsSpacingTop="sm"
        TabViewData={tabData}
      />
    </>
  )
}

// const FixtureScreen = () => {
//   const tabRef = useRef()
//   const navigation = useNavigation()
//   const [expanded, setExpanded] = React.useState(true)
//   const [IscalendarOpen, setIsCalendarOpen] = useState(false)
//   const [selectedCalendarDate, setSelectedCalendarDate] = useState(null)
//   const [selectedDates, setSelectedDates] = useState([])
//   const [dynamicTabs, setDynamicTabs] = useState([])

//   const handlePress = () => setExpanded(!expanded)

//   useEffect(() => {
//     if (selectedCalendarDate && !selectedDates.includes(selectedCalendarDate)) {
//       const newTab = {
//         name: selectedCalendarDate,
//         component: <FixtureSection date={selectedCalendarDate} />,
//       }

//       setDynamicTabs((prevDynamicTabs) => [...prevDynamicTabs, newTab])
//       setSelectedDates((prevSelectedDates) => [
//         ...prevSelectedDates,
//         selectedCalendarDate,
//       ])
//     }
//   }, [selectedCalendarDate, selectedDates])

//   const tabData = [...INITIALTABDATA, ...dynamicTabs]

//   return (
//     <>
//       <StatusBar backgroundColor="white" barStyle="dark-content" />
//       <TopTabView
//         tabRef={tabRef}
//         Header={() => (
//           <FixtureHeader setSelectedCalendarDate={setSelectedCalendarDate} />
//         )}
//         TabsSpacingTop="sm"
//         TabViewData={tabData}
//       />
//     </>
//   )
// }

// {
//   name: 'Nextg Day',
//   component: (
//     <>
//       {accordiandata.map((data, i) => (
//         <AccordianBlock accordiandata={data} key={i} />
//       ))}
//     </>
//   ),
// },
// {
//   name: 'Livssse',
//   component: (
//     <>
//       {accordiandata.map((data, i) => (
//         <AccordianBlock accordiandata={data} key={i} />
//       ))}
//     </>
//   ),
// },
// {
//   name: 'This sDsay',
//   component: (
//     <>
//       {accordiandata.map((data, i) => (
//         <AccordianBlock accordiandata={data} key={i} />
//       ))}
//     </>
//   ),
// },

// {
//   name: 'Livsssddsse',
//   component: (
//     <>
//       {accordiandata.map((data, i) => (
//         <AccordianBlock accordiandata={data} key={i} />
//       ))}
//     </>
//   ),
// },
// {
//   name: 'Thiss sDsay',
//   component: (
//     <>
//       {accordiandata.map((data, i) => (
//         <AccordianBlock accordiandata={data} key={i} />
//       ))}
//     </>
//   ),
// },
// {
//   name: 'Nextssfsss Day',
//   component: (
//     <>
//       {accordiandata.map((data, i) => (
//         <AccordianBlock accordiandata={data} key={i} />
//       ))}
//     </>
//   ),
// },

export default memo(FixtureScreen)

// import { CollapsibleTabView } from 'react-native-collapsible-tab-view'

// const FirstRoute = () => (
//   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//     <Text>First Route</Text>
//   </View>
// )

// const SecondRoute = () => (
//   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//     <Text>Second Route</Text>
//   </View>
// )

// const ThirdRoute = () => (
//   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//     <Text>Third Route</Text>
//   </View>
// )

// const CollapsibleTabExample = () => {
//   const renderTabView = () => (
//     <CollapsibleTabView
//       renderHeader={() => (
//         <View style={{ backgroundColor: 'white', padding: 16 }}>
//           <Text>Header</Text>
//         </View>
//       )}
//     >
//       <CollapsibleTabView.TabView.Tab>
//         <CollapsibleTabView.TabView.Item title="First">
//           <FirstRoute />
//         </CollapsibleTabView.TabView.Item>
//         <CollapsibleTabView.TabView.Item title="Second">
//           <SecondRoute />
//         </CollapsibleTabView.TabView.Item>
//         <CollapsibleTabView.TabView.Item title="Third">
//           <ThirdRoute />
//         </CollapsibleTabView.TabView.Item>
//       </CollapsibleTabView.TabView.Tab>
//     </CollapsibleTabView>
//   )

//   return <View style={{ flex: 1 }}>{renderTabView()}</View>
// }

// export default CollapsibleTabExample
