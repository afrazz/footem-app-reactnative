import React from 'react'
import {
  // Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import PostBlock from '../../components/News/NewsLargeBlock'
import { spacing } from '../../utils/UIRules/spacing'
import Spacer from '../../components/common/Spacer'
import Heading from '../../components/common/Heading'
import MatchCard from '../../components/Home/MatchCard'
import LeagueCard from '../../components/common/FollowListCardItem'
import TabView from '../TabView'

const FirstRoute = () => (
  <View style={{ height: 400, backgroundColor: '#ff4081' }} />
)

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
)

const HomeScreen = () => {
  // let deviceWidth = Dimensions.get('window').width
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <Spacer space="md" />

      <Image
        source={require('../../../assets/logo.png')}
        style={{ marginTop: 30, marginLeft: -5 }}
      />
      <Spacer space="lg" />
      {/* Section */}
      <Heading text={'Latest News'} type="h4" secondaryButtonText="View All" />

      <Spacer space="sm" />
      <PostBlock />

      {/* Section */}
      <Heading
        text={'Live Matches'}
        type="h4"
        secondaryButtonText={'View All'}
      />
      {/* <Spacer space="sm" /> */}
      <FlatList
        horizontal
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        legacyImplementation={false}
        data={['', '', '', '']}
        renderItem={(item) => <MatchCard />}
        style={{ marginTop: -8 }}

        // keyExtractor={(photo) => photo.id}
        // style={{ height: '70%' }}
      />
      <Spacer space="md" />

      {/* Section */}
      <Heading
        text={'Popular Leagues'}
        type="h4"
        secondaryButtonText={'View All'}
      />

      {/* <View
        style={{
          height: 80,
          width: 80,
          backgroundColor: 'white',
          alignSelf: 'center',
          // borderRadius: 40,
          elevation: 3,
        }}
      >
        <Text>hi</Text>
      </View> */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 5,
          marginLeft: 4,
        }}
      >
        <LeagueCard />
        <LeagueCard />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 5,
          marginLeft: 4,
        }}
      >
        <LeagueCard />
        <LeagueCard />
      </View>

      <TabView
        TabViewData={[
          { key: 'first', title: 'One', component: FirstRoute },
          { key: 'second', title: 'Second', component: SecondRoute },
        ]}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,

    backgroundColor: '#fff',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
})

export default HomeScreen
