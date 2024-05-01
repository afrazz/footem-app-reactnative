/* eslint-disable react/prop-types */
import { Image, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { List, useTheme } from 'react-native-paper'
import NormalText from '../../NormalText'
import { spacing } from '../../../utils/UIRules/spacing'
import { colors } from '../../../utils/UIRules/colors'
import Button from '../Button/Button'
import {
  addTeamFollow,
  removeTeamFollow,
} from '../../../redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import SignInPopup from '../SignInPopup'

const FollowListItem = ({
  name,
  isRemoveText,
  imageUrl,
  followingId,
  isActive,
  onPress,
  onContainerPress,
  extraProps = {},
}) => {
  const [isLoadingCurrentFollow, setIsLoadingCurrentFollow] = useState(false)
  const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(false)

  const theme = useTheme()

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (user) {
      setIsSignInPopupOpen(false)
    }
  }, [user])

  // const { teamFollowLoading } = useSelector((state) => state.auth)

  // useEffect(() => {
  //   if (!teamFollowLoading) {
  //     setIsLoadingCurrentFollow(false)
  //   }
  // }, [teamFollowLoading])

  return (
    <>
      <List.Item
        title={
          <NormalText
            containerMarginRight={0}
            fontFamily="regular"
            fontSize={'body2'}
          >
            {name}
          </NormalText>
          // <Text>{name}</Text>
        }
        left={() => <Image source={{ uri: imageUrl }} style={styles.image} />}
        style={[
          styles.container,
          { backgroundColor: theme.colors.secondaryBg },
        ]}
        right={() => (
          <Button
            // icon="camera"
            textColor={isActive ? colors.white : colors.dark}
            buttonColor={isActive ? colors.dark : colors.unActiveButton}
            style={styles.btn(isLoadingCurrentFollow)}
            // onPress={isActive ? removeTeamFollowHandler : addTeamFollowHandler}
            onPress={
              () => {
                if (!user) {
                  return setIsSignInPopupOpen(true)
                }
                onPress(followingId.toString(), imageUrl, name, extraProps)
              }
              // ? onPress()
              // : isActive
              // ? addFollow(followingId, logo, name)
              // : removeFollow(followingId)
            }
            label={
              isActive ? (isRemoveText ? 'Remove' : 'Following') : 'Follow'
            }
            btnType="small"
            disabled={isLoadingCurrentFollow}
          />
        )}
        onPress={onContainerPress || null}
      />

      <SignInPopup
        message="Signin To Follow"
        isOpen={isSignInPopupOpen}
        setIsOpen={setIsSignInPopupOpen}
      />
    </>
  )
}

export default memo(FollowListItem)

const styles = StyleSheet.create({
  container: {
    marginBottom: -spacing.md + 8,
    // height: 40,
  },
  image: {
    // transform: [{ translateX: -6 }],
    height: 32,
    width: 32,
    resizeMode: 'contain',
  },
  btn: (loading) => ({
    // opacity: loading ? 0.4 : 1,
    borderColor: colors.unActiveButton,
    marginRight: -spacing.lg,
  }),
})
