/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
// import { useCurrentTabScrollY } from 'react-native-collapsible-tab-view'
// import { useDerivedValue } from 'react-native-reanimated'
import Spacer from '../../components/common/Spacer'
import NormalText from '../../components/NormalText'
import Heading from '../../components/common/Heading'
import { colors } from '../../utils/UIRules/colors'
import { spacing } from '../../utils/UIRules/spacing'
import footballApiFixturesService from '../../service/footballApi/fixture'
import { useSelector } from 'react-redux'
import footballImage from '../../../assets/football.png'
import moment from 'moment'
import Icon from 'react-native-paper/src/components/Icon'
import { useNavigation } from '@react-navigation/native'
import { Button, Text, useTheme } from 'react-native-paper'

const FixtureHeaderSection = () => {
  const theme = useTheme()
  // timezone=Asia/Calcutta&date=2023-07-19&groupByLeague=true&groupByFollowingTeams=true
  const { fixtureDetails } = useSelector((state) => state.fixtureDetails)
  const navigation = useNavigation()

  // const scrollY = useCurrentTabScrollY()

  // useDerivedValue(() => {
  //   // yOffsetCallback(scrollY.value.toFixed(2))
  //   // console.log('abd', scrollY.value.toFixed(2))
  // })
  const getCurrentStatus = (status, elapsed, description) => {
    switch (status) {
      case '1H':
        return Number(elapsed)
      case '2H':
        return Number(elapsed)
      case 'ET':
        return Number(elapsed)
      default:
        return description
    }
  }

  const getCurrentMatchTime = (date) => {
    const today = new Date()
    if (moment(date).isSame(today, 'day')) {
      return moment(date).format('hh:mm a')
    } else {
      return moment(date).format('MMM D, YYYY hh:mmA')
    }
  }

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.secondaryBg }]}
    >
      <View style={styles.matchScoreContainer}>
        <View style={styles.matchScore}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TeamDetails', {
                teamId: fixtureDetails?.teams?.home?.id,
                teamName: fixtureDetails?.teams?.home?.name,
                teamLogo: fixtureDetails?.teams?.home?.logo,
                teamCountry: null,
                teamCode: null,
                teamNational: null,
              })
            }}
          >
            <Image
              source={{ uri: fixtureDetails?.teams?.home?.logo }}
              style={{ height: 80, width: 80, resizeMode: 'contain' }}
            />

            <Spacer space="sm" />

            <NormalText
              fontFamily="semiBold"
              color="dark"
              containerMarginRight={0}
              fontSize={'body2'}
            >
              {fixtureDetails?.teams?.home?.name}
            </NormalText>
            {fixtureDetails?.fixture?.status?.short === 'FT' &&
              fixtureDetails?.teams?.home?.winner && (
                <NormalText fontFamily="bold" color="primary" fontSize="body2">
                  Winner
                </NormalText>
              )}
          </TouchableOpacity>

          <Spacer space="sm" />
          {fixtureDetails?.events?.map(
            (cur, index) =>
              cur?.type === 'Goal' &&
              cur?.comments !== 'Penalty Shootout' &&
              cur?.team?.name === fixtureDetails?.teams?.home?.name &&
              cur?.player?.name && (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    source={footballImage}
                    style={{ height: 13, width: 13 }}
                  />
                  <Spacer space="sm" direction="row" />
                  <NormalText
                    color="bodyCopy"
                    containerMarginRight={0}
                    fontSize="body3"
                    fontFamily="semiBold"
                    // textAlign={'right'}
                  >
                    {`${cur?.player?.name}  ${cur?.time?.elapsed}'`}
                  </NormalText>
                  <Spacer space="sm" />
                </View>
              )
          )}
          {/* <NormalText
            color="bodyCopy"
            containerMarginRight={0}
            fontSize="body3"
          >
            L.Messi 32'
          </NormalText>
          <Spacer space="sm" />
          <NormalText
            color="bodyCopy"
            containerMarginRight={0}
            fontSize="body3"
          >
            L.Messi 65'
          </NormalText> */}
        </View>
        <Spacer direction="row" space="md" />
        <View style={[styles.matchScore, styles.scoreContainer]}>
          {/* <View
            style={{
              backgroundColor: colors.primary,
              padding: spacing.sm,
              borderRadius: spacing.sm,
            }}
          > */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {!isNaN(
              getCurrentStatus(
                fixtureDetails?.fixture?.status?.short,
                fixtureDetails?.fixture?.status?.elapsed,
                fixtureDetails?.fixture?.status?.long
              )
            ) && (
              <Icon source="timer-outline" color={colors.primary} size={20} />
            )}

            <NormalText
              containerMarginRight={0}
              fontSize="body2"
              fontFamily="bold"
              color="primary"
              marginLeft={2}
            >
              {getCurrentStatus(
                fixtureDetails?.fixture?.status?.short,
                fixtureDetails?.fixture?.status?.elapsed,
                fixtureDetails?.fixture?.status?.long
              )}
            </NormalText>
          </View>

          {/* </View> */}
          <Spacer space="md" />
          <View
            style={{
              // flexDirection: 'row',
              justifyContent: 'center',
              // alignItems: 'flex-start',
              flexDirection: 'row',
            }}
          >
            {/* <Heading text="2" fontType="semi-bold" type="h3" lineHeight={28} /> */}
            {/* <Spacer direction="row" space="md" /> */}
            {/* <Heading text="-" fontType="semi-bold" type="h3" lineHeight={28} /> */}
            {/* <Spacer direction="row" space="md" /> */}
            <Heading
              text={`${fixtureDetails?.goals?.home || 0} - ${
                fixtureDetails?.goals?.away || 0
              }`}
              alignment="center"
              fontType="semi-bold"
              type="h3"
              lineHeight={28}
            />
          </View>
          <Spacer space="sm" />
          <NormalText
            containerMarginRight={0}
            fontSize="body3"
            textAlign="center"
            fontFamily="semiBold"
          >
            {getCurrentMatchTime(fixtureDetails?.fixture?.date)}
          </NormalText>
        </View>
        <Spacer direction="row" space="md" />
        <View style={styles.matchScore}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TeamDetails', {
                teamId: fixtureDetails?.teams?.away?.id,
                teamName: fixtureDetails?.teams?.away?.name,
                teamLogo: fixtureDetails?.teams?.away?.logo,
                teamCountry: null,
                teamCode: null,
                teamNational: null,
              })
            }}
          >
            <Image
              source={{ uri: fixtureDetails?.teams?.away?.logo }}
              style={{
                height: 80,
                width: 80,
                marginLeft: 'auto',
                resizeMode: 'contain',
              }}
            />
            <Spacer space="sm" />

            <NormalText
              fontFamily="semiBold"
              color="dark"
              containerMarginRight={0}
              textAlign="right"
              fontSize={'body2'}
            >
              {fixtureDetails?.teams?.away?.name}
            </NormalText>
            {fixtureDetails?.fixture?.status?.short === 'FT' &&
              fixtureDetails?.teams?.away?.winner && (
                <NormalText
                  fontFamily="bold"
                  color="primary"
                  fontSize="body2"
                  textAlign="right"
                >
                  Winner
                </NormalText>
              )}
          </TouchableOpacity>
          <Spacer space="sm" />
          {fixtureDetails?.events?.map(
            (cur, index) =>
              cur?.type === 'Goal' &&
              cur?.comments !== 'Penalty Shootout' &&
              cur?.team?.name === fixtureDetails?.teams?.away?.name &&
              cur?.player?.name && (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Image
                    source={footballImage}
                    style={{ height: 13, width: 13 }}
                  />
                  <Spacer space="sm" direction="row" />
                  <NormalText
                    color="bodyCopy"
                    containerMarginRight={0}
                    fontSize="body3"
                    fontFamily="semiBold"
                    // textAlign={'right'}
                  >
                    {`${cur?.player?.name}  ${cur?.time?.elapsed}'`}
                  </NormalText>
                  <Spacer space="sm" />
                </View>
              )
          )}
          {/* <NormalText
            color="bodyCopy"
            containerMarginRight={0}
            fontSize="body3"
            textAlign="right"
          >
            L.Messi 32'
          </NormalText>
          <Spacer space="sm" />
          <NormalText
            color="bodyCopy"
            containerMarginRight={0}
            fontSize="body3"
            textAlign="right"
          >
            L.Messi 65'
          </NormalText> */}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

    paddingHorizontal: spacing.md,
    height: '100%',
    paddingTop: spacing.md,
    position: 'relative',
    zIndex: 1000,
  },
  matchScoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  scoreContainer: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  matchScore: {
    flex: 1 / 3,
  },
})

export default FixtureHeaderSection
