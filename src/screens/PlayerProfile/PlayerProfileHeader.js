import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { spacing } from '../../utils/UIRules/spacing'
import { colors } from '../../utils/UIRules/colors'
import Spacer from '../../components/common/Spacer'
import Heading from '../../components/common/Heading'

import { IconButton } from 'react-native-paper'
import NormalText from '../../components/NormalText'
import { useNavigation } from '@react-navigation/native'
import { getCountryCode } from '../../utils/functions'

const PlayerProfileHeader = ({ playerInfo, playerClub }) => {
  console.log(playerInfo, 'infoo')

  const navigation = useNavigation()

  // Pos, Age, Rshirt, Goals/Conceded

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
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: spacing.sm,
        }}
      >
        <View style={{ position: 'relative' }}>
          <Image
            source={{
              uri: playerInfo?.photo,
            }}
            style={{
              height: 75,
              width: 75,
              resizeMode: 'contain',
              borderRadius: 75 / 2,
            }}
          />
          <Image
            source={{
              uri: `https://cdn.ipregistry.co/flags/emojitwo/${getCountryCode(
                playerInfo?.nationality
              )}.png`,
            }}
            style={{
              height: 25,
              width: 25,
              resizeMode: 'contain',
              borderRadius: 25 / 2,
              position: 'absolute',
              bottom: -5,
              right: 0,
            }}
          />
        </View>

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
            text={playerInfo?.name}
            fontType="bold"
            color={colors.white}
            // lineHeight={}
          />
          <Spacer space="sm" />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{
                uri: playerInfo?.clubLogo,
              }}
              style={{
                height: 25,
                width: 25,
                resizeMode: 'contain',
                borderRadius: 25 / 2,
              }}
            />
            <Spacer space="sm" direction="row" />
            <NormalText color="white" fontSize="body2">
              {playerInfo?.clubName}
              {/* {'Paris Saint Germain'} */}
            </NormalText>
          </View>

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
    </View>
  )
}

export default PlayerProfileHeader

const styles = StyleSheet.create({})
