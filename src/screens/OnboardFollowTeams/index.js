import {
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Image,
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
import Header from '../../components/common/Header'
import MatchCard from '../../components/Home/MatchCard'
import {
  ActivityIndicator,
  IconButton,
  List,
  Text,
  Button,
} from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { fetchsuggestedTeams } from '../../redux/slices/onBoardFollowSlice'
import FollowListItem from '../../components/common/FollowListItem'
import OnboardSuggestedTeamsSection from './OnboardSuggestedTeamsSection'
import FollowListCardItem from '../../components/common/FollowListCardItem'
import OnboardLocalTeamsSection from './OnboardLocalTeamsSection'
import { setIsFirstLaunch, setTeamsFollow } from '../../redux/slices/authSlice'
import userService from '../../service/user'
import { addTeamFollow, removeTeamFollow } from '../../redux/slices/followSlice'

// TODO: admin categories name should from football api leagues
// TODO: Also give option to add Teams

const OnBoardFollowTeamsScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const { followingTeams } = useSelector((state) => state.follow)

  const teamFollowHandler = async (followingId, logo, name, extraProps) => {
    const alreadyExistIndex = followingTeams.findIndex(
      (team) => team.followingId == followingId
    )

    if (alreadyExistIndex === -1) {
      dispatch(addTeamFollow({ followingId, logo, name, ...extraProps }))
    } else {
      dispatch(removeTeamFollow(followingId))
    }
  }

  const isUserFollowedByTeam = (id) => {
    const isFollowingTeam = followingTeams.find(
      (team) => team.followingId == id
    )

    return isFollowingTeam ? true : false
  }

  // const isUserFollowedByTeam = (teamId) => {
  //   const isFollowingTeam = followedTeams.find(
  //     (team) => team.followingId == teamId
  //   )

  //   return isFollowingTeam ? true : false
  // }

  // TODO: Only add redirect case for success
  const onTeamsSelectionSubmit = async () => {
    // await dispatch(setTeamsFollow(followedTeams))
    await dispatch(setIsFirstLaunch(false))
    navigation.dispatch(StackActions.replace('Home'))
  }

  return (
    <>
      <Header
        title="Follow Your Teams"
        rightContent={
          <Button
            onPress={onTeamsSelectionSubmit}
            mode="outlined"
            buttonColor={colors.dark}
            textColor={colors.white}
          >
            <Text style={{ paddingVertical: 1 }}>
              <NormalText
                fontSize={'body1'}
                fontFamily="semiBold"
                color="white"
              >
                Get Started
              </NormalText>
            </Text>
          </Button>
          // <Button
          //   textColor={colors.white}
          //   style={{ borderColor: 'transparent' }}
          //   mode="text"
          //   buttonColor={colors.primary}
          //   onPress={onTeamsSelectionSubmit}
          //   label="Get Started"
          //   btnType="large"
          // />
        }
        // subTitle="Get Notified Before Every Followed Team Match"
      />
      <Spacer space="lg" />
      <OnboardLocalTeamsSection
        teamFollowHandler={teamFollowHandler}
        isUserFollowedByTeam={isUserFollowedByTeam}
      />
      {/* <View> */}
      <Spacer space="md" />
      <OnboardSuggestedTeamsSection
        teamFollowHandler={teamFollowHandler}
        isUserFollowedByTeam={isUserFollowedByTeam}
      />
      {/* </View> */}
    </>
  )
}

export default OnBoardFollowTeamsScreen
