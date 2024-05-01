import {
  Image,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native'
import React, { useEffect } from 'react'
import TopTabView from '../../components/common/TopTabView'
import NewsSection from './NewsSection'
import { spacing } from '../../utils/UIRules/spacing'
import Heading from '../../components/common/Heading'
import Spacer from '../../components/common/Spacer'
import { Button, IconButton, useTheme } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { NEWS_TYPE } from '../../constants'
import AllNewsSection from './AllNewsSection'
import TodayNewsSection from './TodayNewsSection'
import TransferNewsSection from './TransferNewsSection'
import LeagueNewsSection from './leagueNewsSection'
import footemLogo from '../../../assets/footem-logo.jpg'
import { colors } from '../../utils/UIRules/colors'
import { fcmTokenCheckAndSave } from '../../service/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import NewsHeader from './NewsHeader'

const News = () => {
  const { loading, user, language } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!loading) {
      fcmTokenCheckAndSave(user, language)
    }
  }, [user, language, loading])

  return (
    <View style={{ flex: 1 }}>
      <TopTabView
        TabsSpacingTop="sm"
        Header={NewsHeader}
        initialTabName={NEWS_TYPE.all}
        TabViewData={[
          {
            name: NEWS_TYPE.all,
            component: <AllNewsSection />,
          },
          {
            name: NEWS_TYPE.today,
            component: <TodayNewsSection />,
          },
          {
            name: NEWS_TYPE.transfer,
            component: <TransferNewsSection />,
          },
          {
            name: NEWS_TYPE.leagues,
            component: <LeagueNewsSection />,
          },
        ]}
      />
    </View>
  )
}

export default News
