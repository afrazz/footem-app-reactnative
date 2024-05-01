import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { spacing } from '../../utils/UIRules/spacing'
import { colors } from '../../utils/UIRules/colors'
import Spacer from '../../components/common/Spacer'
import Heading from '../../components/common/Heading'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/common/Button/Button'
import { addTeamFollow, removeTeamFollow } from '../../redux/slices/followSlice'
import { getColors } from 'react-native-image-colors'
import { IconButton } from 'react-native-paper'
import NormalText from '../../components/NormalText'
import { useNavigation } from '@react-navigation/native'
import SignInPopup from '../../components/common/SignInPopup'
import footballApiteamService from '../../service/footballApi/teamService'

const PageFollowHeader = ({
  teamId,
  teamName,
  teamLogo,
  teamCountry,
  teamNational,
  teamCode,
  // setPrimaryColor,
  // primaryColor,
}) => {
  // TODO: Make a API Call fetch team Details Country>>Isnational>>etc...
  const [teamInfo, setTeamInfo] = useState(null)
  const [isFollowing, setIsFollowing] = useState(false)
  const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(false)

  const { followingTeams } = useSelector((state) => state.follow)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  useEffect(() => {
    if (followingTeams) {
      const isFollowingId = followingTeams.findIndex(
        (team) => team?.followingId == teamId
      )

      if (isFollowingId > -1) {
        setIsFollowing(true)
      } else {
        setIsFollowing(false)
      }
    }
  }, [followingTeams])

  useEffect(() => {
    if (user) {
      setIsSignInPopupOpen(false)
    }
  }, [user])

  useEffect(() => {
    if (!teamCountry || !teamNational || (!teamCode && teamId)) {
      fetchTeamInfo()
    }
  }, [teamCountry, teamNational, teamCode, teamId])

  const fetchTeamInfo = async () => {
    const teamInfoData = await footballApiteamService.getTeams({
      id: teamId,
    })
    setTeamInfo(teamInfoData[0]?.team)
  }

  // useEffect(() => {
  //   const fetchColors = async () => {
  //     try {
  //       const colors = await getColors(teamLogo)
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
      dispatch(removeTeamFollow(teamId))
    } else {
      dispatch(
        addTeamFollow({
          followingId: teamId,
          logo: teamLogo || teamInfo?.logo,
          name: teamName || teamInfo?.name,
          country: teamCountry || teamInfo?.country,
          code: teamCode || teamInfo?.code,
          national: teamNational || teamInfo?.national,
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
            uri: teamLogo,
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
            text={teamName}
            fontType="bold"
            color={colors.white}
            // lineHeight={}
          />
          <Spacer space="sm" />
          <NormalText color="white" fontSize="body2">
            {teamCountry && teamNational
              ? !teamNational
                ? teamCountry
                : teamCode
              : !teamInfo?.national
              ? teamInfo?.country
              : teamInfo?.code}
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

export default PageFollowHeader

const styles = StyleSheet.create({})
