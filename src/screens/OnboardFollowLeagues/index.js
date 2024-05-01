import {
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { spacing } from '../../utils/UIRules/spacing'
import NormalText from '../../components/NormalText'
import Heading from '../../components/common/Heading'
import Spacer from '../../components/common/Spacer'
import SearchInput from '../../components/common/SearchInput'
import { colors } from '../../utils/UIRules/colors'
import SecondaryCard from '../../components/common/SecondaryCard'
// import Button from '../../components/common/Button/Button'
import { StackActions, useNavigation } from '@react-navigation/native'
import { Button, Text } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLeagues } from '../../redux/slices/onBoardFollowSlice'
import {
  setGroupOfLeagueFollows,
  setLeaguesFollow,
} from '../../redux/slices/followSlice'

// TODO: admin categories name should from football api leagues
// TODO: Also give option to add Teams
// TODO: Pass Country and current season for setting League
const OnBoardFollowLeaguesScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [selectedFollowingLeagues, setSelectedFollowingLeagues] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const { leagues, leagueLoading } = useSelector((state) => state.onBoardFollow)
  const { setLeaguesFollowLoading } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchLeagues())
  }, [])

  const onSelectOrRemoveLeagueHandler = (leagueDataObj) => {
    const followedLeaguesArray = [...selectedFollowingLeagues]
    console.log(followedLeaguesArray, leagueDataObj, 'gettssmee')

    const index = followedLeaguesArray.findIndex(
      (cur) => cur?.followingId === leagueDataObj?.followingId
    )

    if (index === -1) {
      followedLeaguesArray.push(leagueDataObj)
    } else {
      followedLeaguesArray.splice(index, 1)
    }

    setSelectedFollowingLeagues(followedLeaguesArray)

    // var index = followedLeaguesArray.findIndex(
    //   (o) => o[followingId] === leagueDataObj[followingId]
    // )
    // else followedLeaguesArray.splice(index, 1)
    // setFollowedLeagues(followedLeaguesArray)
  }

  const isUserFollowedByLeague = (leagueId) => {
    const isFollowingLeague = selectedFollowingLeagues.find(
      (team) => team.followingId == leagueId
    )

    return isFollowingLeague ? true : false
  }

  // TODO: Only add redirect case for success
  const onLeaguesSelectionSubmit = async () => {
    dispatch(setGroupOfLeagueFollows(selectedFollowingLeagues))

    navigation.dispatch(StackActions.replace('OnBoardFollowTeamsScreen'))
  }

  console.log(selectedFollowingLeagues, 'jeuu')

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        {/* <NormalText fontFamily="bold">Footem</NormalText> */}
        <TouchableOpacity
          onPress={() =>
            navigation.dispatch(
              StackActions.replace('OnBoardFollowTeamsScreen')
            )
          }
        >
          <NormalText
            containerMarginRight={0}
            fontSize={'body1'}
            underlined
            fontFamily="bold"
            // padding={spacing.sm}
          >
            Skip Now
          </NormalText>
        </TouchableOpacity>
      </View>
      <Spacer space="lg" />
      <Heading
        text="Please Select Your Favourite League/Cup"
        type="h3"
        lineHeight={40}
        // alignment="center"
      />
      <Spacer space="lg" />
      <SearchInput
        placeholder="Search League"
        onChangeText={(text) => setSearchTerm(text)}
        style={{ backgroundColor: colors.lightGray }}
        // onChangeText={(text) => setSearchTerm(text)}
        // onClearIconPress={() => setSearchTerm('')}
        // searchLoading={searchLoading}
        // suggestions={leagueSuggestionBlock()}
        // value={searchTerm}
        // containerStyle={{ marginTop: spacing.}}
      />

      <Spacer space="lg" />
      {/* <ScrollView> */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={
          searchTerm?.trim()?.length > 0
            ? leagues.filter((league) =>
                league.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : leagues
        }
        numColumns={3}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        renderItem={({ item, index }) => (
          <>
            {/* <View style={{ paddingLeft: spacing.sm }}></View> */}
            <SecondaryCard
              leagueId={item?._id}
              name={item?.name}
              logo={item?.logo}
              // extraProps={item?.}
              onSelectOrRemoveHandler={onSelectOrRemoveLeagueHandler}
              isActive={isUserFollowedByLeague(item?._id)}
            />
            {/* <View style={{ paddingRight: spacing.sm }}></View> */}
            <Spacer direction="row" space="sm" />
          </>
        )}
        // columnWrapperStyle={{ marginRight: spacing.md }}
        // style={styles.cardContainer}
        contentContainerStyle={styles.cardContainer}
        // keyExtractor={(photo) => photo.id}
        // style={{ height: '70%' }}
      />

      {/* <View style={styles.cardContainer}>
          <SecondaryCard />
          <Spacer space="md" direction="row" />
          <SecondaryCard />
          <Spacer space="md" direction="row" />
          <SecondaryCard isActive />
        </View>
        <View style={styles.cardContainer}>
          <SecondaryCard />
          <Spacer space="md" direction="row" />
          <SecondaryCard />
          <Spacer space="md" direction="row" />
          <SecondaryCard />
        </View>
        <View style={styles.cardContainer}>
          <SecondaryCard />
          <Spacer space="md" direction="row" />
          <SecondaryCard />
          <Spacer space="md" direction="row" />
          <SecondaryCard />
        </View>
        <View style={styles.cardContainer}>
          <SecondaryCard />
          <Spacer space="md" direction="row" />
          <SecondaryCard />
          <Spacer space="md" direction="row" />
          <SecondaryCard />
        </View>
      </ScrollView> */}
      <View style={{ backgroundColor: '#fff', paddingVertical: spacing.md }}>
        <Button
          onPress={onLeaguesSelectionSubmit}
          mode="outlined"
          buttonColor={colors.primary}
          textColor={colors.white}
        >
          <Text style={{ paddingVertical: 6 }}>
            <NormalText fontSize={'body1'} fontFamily="semiBold" color="white">
              Go To Teams Selection Page
            </NormalText>
          </Text>
        </Button>
      </View>
    </View>
  )
}

export default OnBoardFollowLeaguesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: colors.white,
  },
  cardContainer: {
    flexDirection: 'column',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // marginBottom: spacing.md,
    // flexWrap: 'wrap',
  },
  card: () => ({
    flex: 0.5,

    backgroundColor: 'red',
  }),
})
