/* eslint-disable react/prop-types */
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import React, { useState, useEffect, memo } from 'react'
import Card from '../Card/index.js'
import { IconButton, TextInput } from 'react-native-paper'
import { colors } from '../../../utils/UIRules/colors.js'
import NormalText from '../../NormalText/index.js'
import Spacer from '../Spacer/index.js'
import { spacing } from '../../../utils/UIRules/spacing.js'
import { useDispatch, useSelector } from 'react-redux'
import {
  addTeamFollow,
  removeTeamFollow,
} from '../../../redux/slices/authSlice.js'

const FollowListCardItem = ({
  isActive,
  name,
  logo,
  followingId,
  onPress,
  extraProps,
}) => {
  let deviceWidth = Dimensions.get('window').width

  // const [isLoadingCurrentFollow, setIsLoadingCurrentFollow] = useState(false)

  const dispatch = useDispatch()

  const { teamFollowLoading } = useSelector((state) => state.auth)

  // useEffect(() => {
  //   if (!teamFollowLoading) {
  //     setIsLoadingCurrentFollow(false)
  //   }
  // }, [teamFollowLoading])

  const addTeamFollowHandler = () => {
    // setIsLoadingCurrentFollow(true)
    dispatch(addTeamFollow({ followingId, logo: logo, name }))
  }

  const removeTeamFollowHandler = () => {
    // setIsLoadingCurrentFollow(true)
    dispatch(removeTeamFollow(followingId))
  }

  return (
    <View>
      <Card marginRight={0} width={deviceWidth / 3.5} cardHeight={125}>
        <View style={styles.container}>
          <IconButton
            icon={isActive ? 'heart' : 'heart-outline'}
            size={28}
            // onPress={isActive ? removeTeamFollowHandler : addTeamFollowHandler}
            onPress={() =>
              onPress(followingId.toString(), logo, name, extraProps)
            }
            iconColor={'#fb3958'} //#fb3958
            // disabled={isLoadingCurrentFollow}
            // mode="contained"
            containerColor="white"
            // style={{ marginRight: -spacing.sm }}
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Image source={{ uri: logo }} style={styles.image} />
        </View>
        <Spacer space="sm" />
        <NormalText
          containerMarginRight={0}
          fontFamily="regular"
          fontSize={'body3'}
          textAlign="center"
          lines={2}
        >
          {name}
        </NormalText>
      </Card>
    </View>
  )
}

export default memo(FollowListCardItem)

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: -10,
    top: -25,
    zIndex: 100,
  },
  image: {
    width: 60,
    height: 60,
    marginTop: -4,
    resizeMode: 'contain',
  },
})
