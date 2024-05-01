/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native'
import React, { memo } from 'react'
import { useOrientation } from '../../../hooks/useOrientation'
import { spacing } from '../../../utils/UIRules/spacing'
import NormalText from '../../NormalText'
import { colors } from '../../../utils/UIRules/colors'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'

const FixtureAccordianBlock = ({
  team1,
  team2,
  matchStatus, // 12:00am => time, 2 - 2 => Match Result
  matchTime, // elapsed time => like "35" minutes, "FT", "TBD" etc...
  penalty,
  fixtureId,
  leagueId,
  shortStatus, // FT", "TBD", "ET", "1H", "2H" etc...
  date,
  paddingTopEnabled = true,
}) => {
  const navigation = useNavigation()
  const screenWidth = Dimensions.get('screen').width
  const { orientation } = useOrientation()

  console.log('Re-rendering', matchTime, shortStatus)

  const parsedTime = moment(matchStatus, 'hh:mm a', true)

  const isMatchTimeExists = parsedTime.isValid()

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push('FixtureDetails', {
          fixtureId,
          leagueId,
          shortStatus,
          date,
        })
      }
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: orientation === 'PORTRAIT' ? 'flex-start' : 'center',
          // paddingLeft: spacing.md,
          width: '100%',
          paddingTop: paddingTopEnabled ? spacing.lg : 0,
          // backgroundColor: 'gray',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // backgroundColor: 'red',
            transform: [{ translateX: -4 }],
          }}
        >
          <View
            style={{
              width: screenWidth / 3.9,
              alignItems: 'flex-end',
              // backgroundColor: 'red',
              // width: '100%',
              // flexDirection: 'row',
            }}
          >
            <NormalText
              fontSize={'body13'}
              // width={orientation === 'PORTRAIT' ? 85 : 'auto'}
              textAlign="right"
              // transform={[{ translateX: -8 }]}

              paddingRight={4}
            >
              {/* {team2} */}
              {team1.name}
            </NormalText>
          </View>

          <Image
            source={{ uri: team1?.logo }}
            style={{
              marginLeft: 4,
              // transform: [{ translateX: -8 }],
              marginRight: 4,
              // marginRight: 12,
              height: 22,
              width: 22,
              resizeMode: 'contain',
            }}
          />
        </View>

        {/* <Image
          source={require('../../../assets/manunited.png')}
          style={{
            // transform: [{ translateX: 8 }],
            height: 22,
            width: 22,
          }}
        />
        <NormalText
          fontSize={'body2'}
          // width={orientation === 'PORTRAIT' ? 85 : 'auto'}
          textAlign="right"
          transform={[{ translateX: 8 }]}
        >
          {team1}
        </NormalText> */}
        <View style={{ flex: 1, alignItems: 'center' }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              transform: [{ translateX: matchTime ? -6 : -4 }],
            }}
          >
            {!isMatchTimeExists && matchTime && (
              <View
                style={{
                  height: 25,
                  width: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 12,
                  backgroundColor: colors.primary,
                  marginRight: 8,
                }}
              >
                <NormalText
                  fontSize={'body3'}
                  containerMarginRight={0}
                  color="white"
                  fontFamily="bold"
                >
                  {matchTime}
                </NormalText>
              </View>
            )}

            <NormalText
              fontSize={'body2'}
              fontFamily="semiBold"
              // marginHorizontal={4}
            >
              {matchStatus}
            </NormalText>
          </View>
          {penalty?.home !== null && penalty?.away !== null && (
            <NormalText color="bodyCopy" fontSize={'body13'} marginTop={4}>
              {`(Pen ${penalty.home}-${penalty.away})`}
            </NormalText>
          )}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // width: screenWidth / 3,
          }}
        >
          <Image
            source={{ uri: team2?.logo }}
            style={{
              // transform: [{ translateX: -8 }],
              marginRight: 4,
              // marginRight: 12,
              height: 22,
              width: 22,
              resizeMode: 'contain',
            }}
          />
          <NormalText
            fontSize={'body13'}
            // width={orientation === 'PORTRAIT' ? 85 : 'auto'}
            textAlign="left"
            paddingLeft={4}
            // transform={[{ translateX: -8 }]}
            width={screenWidth / 3.9}
          >
            {/* {team2} */}
            {team2.name}
          </NormalText>
        </View>

        {/* {matchTime && (
          <View
            style={{
              height: 30,
              width: 30,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 15,
              backgroundColor: colors.primary,
            }}
          >
            <NormalText
              fontSize={'body3'}
              containerMarginRight={0}
              color="white"
            >
              {matchTime}
            </NormalText>
          </View>
        )} */}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})

const isEqual = (prevProps, nextProps) => {
  return (
    prevProps.date === nextProps.date &&
    prevProps.fixtureId === nextProps.fixtureId &&
    prevProps.leagueId === nextProps.leagueId &&
    prevProps.matchStatus === nextProps.matchStatus &&
    prevProps.matchTime === nextProps.matchTime &&
    prevProps.team1.id === nextProps.team1.id &&
    prevProps.team2.id === nextProps.team2.id
  )
  // return false
}

export default memo(FixtureAccordianBlock, isEqual)
