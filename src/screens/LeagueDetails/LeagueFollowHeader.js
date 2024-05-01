import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { spacing } from '../../utils/UIRules/spacing'
import { colors } from '../../utils/UIRules/colors'
import Spacer from '../../components/common/Spacer'
import Heading from '../../components/common/Heading'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/common/Button/Button'
import {
  addLeagueFollow,
  removeLeagueFollow,
} from '../../redux/slices/followSlice'
import { getColors } from 'react-native-image-colors'
import { IconButton } from 'react-native-paper'
import NormalText from '../../components/NormalText'
import { useNavigation } from '@react-navigation/native'
import SignInPopup from '../../components/common/SignInPopup'

const LeagueFollowHeader = ({
  leagueId,
  leagueName,
  leagueLogo,
  leagueCountry,
  leagueSeason,
  // setPrimaryColor,
  // primaryColor,
}) => {
  const [isFollowing, setIsFollowing] = useState(false)
  const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(false)

  const { followingLeagues } = useSelector((state) => state.follow)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  useEffect(() => {
    if (followingLeagues) {
      const isFollowingId = followingLeagues.findIndex(
        (league) => league?.followingId == leagueId
      )

      if (isFollowingId > -1) {
        setIsFollowing(true)
      } else {
        setIsFollowing(false)
      }
    }
  }, [followingLeagues])

  // useEffect(() => {
  //   const fetchColors = async () => {
  //     try {
  //       const colors = await getColors(leagueLogo)
  //       if (colors) {
  //         setPrimaryColor(
  //           colors.platform === 'android' ? colors.darkVibrant : colors.primary
  //         )
  //       }
  //     } catch (error) {
  //       console.error('Error extracting image colors:', error)
  //     }
  //   }

  //   fetchColors()
  // }, [])

  const onFollowHandler = () => {
    if (!user) {
      return setIsSignInPopupOpen(true)
    }

    if (isFollowing) {
      dispatch(removeLeagueFollow(leagueId))
    } else {
      dispatch(
        addLeagueFollow({
          followingId: leagueId,
          logo: leagueLogo,
          name: leagueName,
          country: leagueCountry,
          leagueSeason: leagueSeason,
        })
      )
    }
  }

  return (
    <View
      style={{
        // paddingBottom: spacing.sm,
        //   paddingVertical: spacing.md,
        backgroundColor: colors.dark,
        paddingTop: spacing.sm,
        paddingHorizontal: spacing.md,
        // marginBottom: spacing.sm,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <IconButton
          icon="arrow-left"
          size={28}
          iconColor={colors.white}
          onPress={() => navigation.goBack()}
          style={{ marginLeft: -spacing.sm }}
        />
        <Button
          // icon="camera"
          textColor={isFollowing ? colors.dark : colors.white}
          buttonColor={isFollowing ? colors.white : 'transparent'}
          style={{ borderColor: colors.lightGray }}
          onPress={onFollowHandler}
          label={isFollowing ? 'Following' : 'Follow'}
          btnType="small"
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: spacing.sm,
        }}
      >
        <Image
          source={{
            uri: leagueLogo,
          }}
          style={{ height: 75, width: 75, resizeMode: 'contain' }}
        />
        <Spacer direction="row" space="md" />
        <View
          style={{
            alignItems: 'flex-start',
            flex: 1,
          }}
        >
          <Heading
            type="h4"
            additionalSize={2}
            text={leagueName}
            fontType="bold"
            color={colors.white}
            // lineHeight={}
          />
          <Spacer space="sm" />
          <NormalText color="white" fontSize="body2">
            {leagueCountry}
          </NormalText>
          {/* <Button
            // icon="camera"
            textColor={isFollowing ? colors.dark : colors.white}
            buttonColor={isFollowing ? colors.white : 'transparent'}
            style={{ borderColor: colors.lightGray }}
            onPress={onFollowHandler}
            label={isFollowing ? 'Following' : 'Follow'}
            btnType="small"
          /> */}
        </View>
      </View>
      <SignInPopup
        message="Signin To Follow"
        isOpen={isSignInPopupOpen}
        setIsOpen={setIsSignInPopupOpen}
      />
    </View>
  )
}

export default LeagueFollowHeader

const styles = StyleSheet.create({})
