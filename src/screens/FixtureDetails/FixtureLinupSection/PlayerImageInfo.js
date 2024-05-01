/* eslint-disable no-dupe-else-if */
/* eslint-disable react/prop-types */
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import NormalText from '../../../components/NormalText'
import Spacer from '../../../components/common/Spacer'
import footballIcon from '../../../../assets/football.png'
import yellowCardIcon from '../../../../assets/yellowcard.png'
import redCardIcon from '../../../../assets/redcard.png'
import { colors } from '../../../utils/UIRules/colors'
import Modal from '../../../components/common/Modal'
import { Button } from 'react-native-paper'
import PlayerFixtureStats from './PlayerFixtureStats'
import { useNavigation } from '@react-navigation/native'

const PlayerImageInfo = ({
  name,
  playerId,
  textColor = 'white',
  fontSize = 'body2',
  statisticsPlayersAccessFound,
  getPlayerStats,
  teamSide,
  fullName,
}) => {
  const [playerStats, setPlayerStats] = useState(null)
  const [fixturePlayerStatsModal, setVisibleFixturePlayerStatsModal] =
    useState(false)

  const navigation = useNavigation()

  // TODO: If this is slowing app please inject playerStat with lineup
  useEffect(() => {
    if (statisticsPlayersAccessFound && playerId) {
      setPlayerStats(getPlayerStats(playerId, teamSide)?.statistics[0])
    }
  }, [statisticsPlayersAccessFound, playerId])

  // if (statisticsPlayersAccessFound) {
  //   var rating = Number().toFixed(1)
  // }

  const getGoalsResult = () => {
    if (playerStats?.goals?.total > 0 && playerStats?.goals?.conceded > 0) {
      return [
        ...Array(playerStats?.goals?.total).fill('G'),
        ...Array(playerStats?.goals?.conceded).fill('C'),
      ]
    } else if (playerStats?.goals?.total > 0) {
      return [...Array(playerStats?.goals?.total).fill('G')]
    } else if (playerStats?.goals?.conceded > 0) {
      return [...Array(playerStats?.goals?.conceded).fill('C')]
    }
  }

  const navigateToProfilePage = (playerId) => {
    setVisibleFixturePlayerStatsModal(false)
    navigation.navigate('PlayerProfile', { playerId })
  }

  return (
    <View>
      <View style={styles.container}>
        {/* <View
          style={{
            backgroundColor: bgColor,
            borderRadius: 16,
            height: 32,
            width: 32,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: color,
            borderWidth: 2,
          }}
        >
          <NormalText
            fontSize="body2"
            color={color === '#ffffff' ? 'white' : 'dark'}
            fontFamily="bold"
          >
            {number || '-'}
          </NormalText> */}
        <TouchableOpacity
          style={{ position: 'relative' }}
          onPress={() =>
            playerStats
              ? setVisibleFixturePlayerStatsModal(true)
              : navigation.navigate('PlayerProfile', { playerId })
          }
        >
          <Image
            source={{
              uri: `https://media-2.api-sports.io/football/players/${playerId}.png`,
            }}
            style={styles.playerPhoto}
          />
          {/* Goals */}
          {(playerStats?.goals?.total > 0 ||
            playerStats?.goals?.conceded > 0) && (
            <>
              {getGoalsResult().map((state, i) => (
                <View
                  key={i}
                  style={[
                    styles.eventContainer,
                    {
                      bottom: 0,
                      left: -6 * (i + 1),
                      backgroundColor:
                        state === 'G' ? colors.white : colors.danger,
                    },
                  ]}
                >
                  <Image source={footballIcon} style={styles.icon} />
                </View>
              ))}
            </>
          )}
          {/* Yellow Card */}
          {playerStats?.cards?.yellow > 0 && (
            <View style={[styles.eventContainer, { bottom: 0, right: -5 }]}>
              <Image source={yellowCardIcon} style={styles.icon} />
            </View>
          )}

          {/* Red Card */}
          {playerStats?.cards?.red > 0 && (
            <View style={[styles.eventContainer, { bottom: 0, right: -5 }]}>
              <Image source={redCardIcon} style={styles.icon} />
            </View>
          )}
          {/* Match Rating */}
          {/* {statisticsPlayersAccessFound && (
            <View style={[styles.ratingContainer, { top: 0, right: -14 }]}>
              <NormalText fontSize={'body3'}>
                {Number(
                  getPlayerStats(playerId, teamSide)?.statistics[0]?.games
                    ?.rating
                ).toFixed(1)}
              </NormalText>
            </View>
          )} */}
          {playerStats?.games?.rating && (
            <View
              style={[
                styles.ratingContainer(
                  Number(playerStats?.games?.rating).toFixed(1)
                ),
                { top: 0, right: -14 },
              ]}
            >
              <NormalText fontSize={'body3'} color="white" fontFamily="bold">
                {Number(playerStats?.games?.rating).toFixed(1)}
              </NormalText>
            </View>
          )}
        </TouchableOpacity>
        {/* </View> */}
        <Spacer space="sm" />
        <NormalText
          color={textColor}
          containerMarginRight={0}
          fontSize={fontSize}
          textAlign="center"
          fontFamily="semiBold"
        >
          {name}
        </NormalText>
      </View>

      {/*Fixture Player Stats OverView*/}
      <Modal
        setVisible={setVisibleFixturePlayerStatsModal}
        visible={fixturePlayerStatsModal}
        actions={
          <>
            <Button
              onPress={() => {
                setVisibleFixturePlayerStatsModal(false)
              }}
              textColor={colors.danger}
            >
              Cancel
            </Button>
          </>
        }
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <PlayerFixtureStats
            playerId={playerId}
            playerStats={playerStats}
            fullName={fullName}
            navigateToProfilePage={navigateToProfilePage}
          />
        </ScrollView>
      </Modal>
    </View>
  )
}

export default PlayerImageInfo

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerPhoto: {
    height: 42,
    width: 42,
    borderRadius: 21,
    resizeMode: 'cover',
    backgroundColor: 'white',
  },
  // goalContainer: (bgColor) => ({
  //   backgroundColor: bgColor,
  //   height: 16,
  //   width: 16,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   borderRadius: 7,
  //   position: 'absolute',
  // }),
  eventContainer: {
    backgroundColor: colors.white,
    height: 16,
    width: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    position: 'absolute',
  },
  ratingContainer: (rating) => ({
    backgroundColor: rating >= 7 ? 'green' : colors.warning,
    paddingVertical: 2,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    position: 'absolute',
  }),
  icon: {
    height: 12,
    width: 12,
    resizeMode: 'contain',
  },
})
