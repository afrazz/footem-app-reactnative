/* eslint-disable no-undef */
import {
  ImageBackground,
  StyleSheet,
  View,
  Dimensions,
  Image,
  RefreshControl,
  TouchableWithoutFeedback,
} from 'react-native'
import React from 'react'
import PlayerImageInfo from './PlayerImageInfo'
import { spacing } from '../../../utils/UIRules/spacing'
import { useEffect } from 'react'
import { useState } from 'react'

import Spacer from '../../../components/common/Spacer'
import { Tabs } from 'react-native-collapsible-tab-view'
import { useDispatch, useSelector } from 'react-redux'
import NormalText from '../../../components/NormalText'
import Nodata from '../../../components/common/Nodata'
import { fetchFixtureDetails } from '../../../redux/slices/footballApi/fixtureDetailsSlice'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'
// const lineupData = [
//   {
//     team: {
//       id: 50,
//       name: 'Manchester City',
//       logo: 'https://media.api-sports.io/football/teams/50.png',
//       colors: {
//         player: {
//           primary: '5badff',
//           number: 'ffffff',
//           border: '99ff99',
//         },
//         goalkeeper: {
//           primary: '99ff99',
//           number: '000000',
//           border: '99ff99',
//         },
//       },
//     },
//     formation: '4-3-3',
//     startXI: [
//       {
//         player: {
//           id: 617,
//           name: 'Ederson',
//           number: 31,
//           pos: 'G',
//           grid: '1:1',
//         },
//       },
//       {
//         player: {
//           id: 627,
//           name: 'Kyle Walker',
//           number: 2,
//           pos: 'D',
//           grid: '2:4',
//         },
//       },
//       {
//         player: {
//           id: 627,
//           name: 'Kyle Walker',
//           number: 2,
//           pos: 'D',
//           grid: '2:4',
//         },
//       },
//       {
//         player: {
//           id: 626,
//           name: 'John Stones',
//           number: 5,
//           pos: 'D',
//           grid: '2:3',
//         },
//       },
//       {
//         player: {
//           id: 567,
//           name: 'Rúben Dias',
//           number: 3,
//           pos: 'D',
//           grid: '2:2',
//         },
//       },
//       {
//         player: {
//           id: 641,
//           name: 'Oleksandr Zinchenko',
//           number: 11,
//           pos: 'D',
//           grid: '2:1',
//         },
//       },
//       {
//         player: {
//           id: 629,
//           name: 'Kevin De Bruyne',
//           number: 17,
//           pos: 'M',
//           grid: '3:3',
//         },
//       },
//       {
//         player: {
//           id: 640,
//           name: 'Fernandinho',
//           number: 25,
//           pos: 'M',
//           grid: '3:2',
//         },
//       },
//       {
//         player: {
//           id: 631,
//           name: 'Phil Foden',
//           number: 47,
//           pos: 'M',
//           grid: '3:1',
//         },
//       },
//       {
//         player: {
//           id: 635,
//           name: 'Riyad Mahrez',
//           number: 26,
//           pos: 'F',
//           grid: '4:3',
//         },
//       },
//       // {
//       //   player: {
//       //     id: 643,
//       //     name: 'Gabriel Jesus',
//       //     number: 9,
//       //     pos: 'F',
//       //     grid: '4:2',
//       //   },
//       // },
//       {
//         player: {
//           id: 645,
//           name: 'Raheem Sterling',
//           number: 7,
//           pos: 'F',
//           grid: '4:1',
//         },
//       },
//       {
//         player: {
//           id: 645,
//           name: 'Raheem Sterling',
//           number: 7,
//           pos: 'F',
//           grid: '4:2',
//         },
//       },
//     ],
//     substitutes: [
//       {
//         player: {
//           id: 50828,
//           name: 'Zack Steffen',
//           number: 13,
//           pos: 'G',
//           grid: null,
//         },
//       },
//       {
//         player: {
//           id: 623,
//           name: 'Benjamin Mendy',
//           number: 22,
//           pos: 'D',
//           grid: null,
//         },
//       },
//       {
//         player: {
//           id: 18861,
//           name: 'Nathan Aké',
//           number: 6,
//           pos: 'D',
//           grid: null,
//         },
//       },
//       {
//         player: {
//           id: 622,
//           name: 'Aymeric Laporte',
//           number: 14,
//           pos: 'D',
//           grid: null,
//         },
//       },
//       {
//         player: {
//           id: 633,
//           name: 'İlkay Gündoğan',
//           number: 8,
//           pos: 'M',
//           grid: null,
//         },
//       },
//       {
//         player: {
//           id: 44,
//           name: 'Rodri',
//           number: 16,
//           pos: 'M',
//           grid: null,
//         },
//       },
//       {
//         player: {
//           id: 931,
//           name: 'Ferrán Torres',
//           number: 21,
//           pos: 'F',
//           grid: null,
//         },
//       },
//       {
//         player: {
//           id: 636,
//           name: 'Bernardo Silva',
//           number: 20,
//           pos: 'M',
//           grid: null,
//         },
//       },
//       {
//         player: {
//           id: 642,
//           name: 'Sergio Agüero',
//           number: 10,
//           pos: 'F',
//           grid: null,
//         },
//       },
//     ],
//     coach: {
//       id: 4,
//       name: 'Guardiola',
//       photo: 'https://media.api-sports.io/football/coachs/4.png',
//     },
//   },
//   {
//     team: {
//       id: 45,
//       name: 'Everton',
//       logo: 'https://media.api-sports.io/football/teams/45.png',
//       colors: {
//         player: {
//           primary: '070707',
//           number: 'ffffff',
//           border: '66ff00',
//         },
//         goalkeeper: {
//           primary: '66ff00',
//           number: '000000',
//           border: '66ff00',
//         },
//       },
//     },
//     formation: '4-3-1-2',
//     startXI: [
//       {
//         player: {
//           id: 2932,
//           name: 'Jordan Pickford',
//           number: 1,
//           pos: 'G',
//           grid: '1:1',
//         },
//       },
//       {
//         player: {
//           id: 19150,
//           name: 'Mason Holgate',
//           number: 4,
//           pos: 'D',
//           grid: '2:4',
//         },
//       },
//       {
//         player: {
//           id: 2934,
//           name: 'Michael Keane',
//           number: 5,
//           pos: 'D',
//           grid: '2:3',
//         },
//       },
//       {
//         player: {
//           id: 19073,
//           name: 'Ben Godfrey',
//           number: 22,
//           pos: 'D',
//           grid: '2:2',
//         },
//       },
//       {
//         player: {
//           id: 2724,
//           name: 'Lucas Digne',
//           number: 12,
//           pos: 'D',
//           grid: '2:1',
//         },
//       },
//       {
//         player: {
//           id: 18805,
//           name: 'Abdoulaye Doucouré',
//           number: 16,
//           pos: 'M',
//           grid: '3:3',
//         },
//       },
//       {
//         player: {
//           id: 326,
//           name: 'Allan',
//           number: 6,
//           pos: 'M',
//           grid: '3:2',
//         },
//       },
//       {
//         player: {
//           id: 18762,
//           name: 'Tom Davies',
//           number: 26,
//           pos: 'M',
//           grid: '3:1',
//         },
//       },
//       {
//         player: {
//           id: 2795,
//           name: 'Gylfi Sigurðsson',
//           number: 10,
//           pos: 'M',
//           grid: '4:1',
//         },
//       },
//       {
//         player: {
//           id: 18766,
//           name: 'Dominic Calvert-Lewin',
//           number: 9,
//           pos: 'F',
//           grid: '5:2',
//         },
//       },
//       {
//         player: {
//           id: 2413,
//           name: 'Richarlison',
//           number: 7,
//           pos: 'F',
//           grid: '5:1',
//         },
//       },
//     ],
//     substitutes: [
//       {
//         player: {
//           id: 18755,
//           name: 'João Virgínia',
//           number: 31,
//           pos: 'G',
//           grid: null,
//         },
//       },
//       {
//         player: {
//           id: 766,
//           name: 'Robin Olsen',
//           number: 33,
//           pos: 'G',
//           grid: null,
//         },
//       },
//       {
//         player: {
//           id: 156490,
//           name: 'Niels Nkounkou',
//           number: 18,
//           pos: 'D',
//           grid: null,
//         },
//       },
//       {
//         player: {
//           id: 18758,
//           name: 'Séamus Coleman',
//           number: 23,
//           pos: 'D',
//           grid: null,
//         },
//       },
//       {
//         player: {
//           id: 138849,
//           name: 'Kyle John',
//           number: 48,
//           pos: 'D',
//           grid: null,
//         },
//       },
//       {
//         player: {
//           id: 18765,
//           name: 'André Gomes',
//           number: 21,
//           pos: 'M',
//           grid: null,
//         },
//       },
//       {
//         player: {
//           id: 1455,
//           name: 'Alex Iwobi',
//           number: 17,
//           pos: 'F',
//           grid: null,
//         },
//       },
//       {
//         player: {
//           id: 18761,
//           name: 'Bernard',
//           number: 20,
//           pos: 'F',
//           grid: null,
//         },
//       },
//     ],
//     coach: {
//       id: 2407,
//       name: 'C. Ancelotti',
//       photo: 'https://media.api-sports.io/football/coachs/2407.png',
//     },
//   },
// ]

const FixtureLineupSection = ({ statisticsPlayersAccessFound, fixtureId }) => {
  const theme = useTheme()
  const { height } = Dimensions.get('window')
  const [team1LineUp, setTeam1LineUp] = useState([])
  const [team2LineUp, setTeam2LineUp] = useState([])

  const dispatch = useDispatch()

  const navigation = useNavigation()

  const { fixtureDetails, fixtureDetailsLoading } = useSelector(
    (state) => state.fixtureDetails
  )

  useEffect(() => {
    if (fixtureDetails?.lineups?.length > 0) {
      if (fixtureDetails?.lineups[0]?.startXI[0]?.player?.grid !== null) {
        const result = Object.values(
          fixtureDetails?.lineups[0]?.startXI?.reduce((acc, obj) => {
            const [row] = obj.player.grid.split(':')
            acc[row] = acc[row] ? [...acc[row], obj] : [obj]
            return acc
          }, {})
        )

        setTeam1LineUp(result)
      }
      if (fixtureDetails?.lineups[1]?.startXI[0]?.player?.grid !== null) {
        const result2 = Object.values(
          fixtureDetails?.lineups[1]?.startXI?.reduce((acc, obj) => {
            const [row] = obj.player.grid.split(':')

            console.log(acc[row], 'shhh')

            acc[row] = acc[row] ? [...acc[row], obj] : [obj]
            return acc
          }, {})
        )

        setTeam2LineUp(result2.reverse())
      }
    }
  }, [fixtureDetails])

  console.log(team1LineUp, 'weeere')

  const getPositionSpacing = (posLength) => {
    switch (posLength) {
      case 1:
        return 0
      case 2:
        return spacing.xl
      case 3:
        return spacing.lg
      case 4:
        return spacing.md
      case 5:
        return spacing.sm
      default:
        return spacing.md
    }
  }

  const getPlayerStats = (playerId, teamSide) => {
    const index = teamSide === 'home' ? 0 : 1
    const playerStats = fixtureDetails?.players[index]?.players?.find(
      (player) => player.player.id === playerId
    )

    return playerStats
    // player.statistics[0].games.rating
  }

  return (
    <Tabs.ScrollView
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        marginTop: -4,
        backgroundColor: theme.colors.background,
      }}
      refreshControl={
        <RefreshControl
          refreshing={fixtureDetailsLoading}
          onRefresh={() => dispatch(fetchFixtureDetails(fixtureId))}
        />
      }
    >
      {fixtureDetails?.lineups?.length > 0 &&
      fixtureDetails?.lineups[0]?.startXI[0]?.player?.grid !== null ? (
        <>
          {/* Home Team Formation Block */}
          <View style={styles.formationBlock}>
            <Image
              source={{ uri: fixtureDetails?.statistics[0]?.team?.logo }}
              style={{ height: 30, width: 30, resizeMode: 'contain' }}
            />
            <Spacer direction="row" space="md" />
            <NormalText color="white" fontFamily="semiBold" fontSize="body2">
              {fixtureDetails?.statistics[0]?.team?.name}
            </NormalText>
            <NormalText
              color="white"
              fontFamily="semiBold"
              fontSize="body2"
              marginLeft="auto"
            >
              {fixtureDetails?.lineups[0]?.formation}
            </NormalText>
          </View>

          <ImageBackground
            style={styles.imgBackground(height)}
            resizeMode="cover"
            source={require('../../../../assets/ground-5.png')}
            resizeMethod="scale"
          >
            <View style={{ flex: 0.5 }}>
              {team1LineUp.map((pos, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row',
                    alignContent: 'space-between',
                    justifyContent: 'center',
                    flex: 1,
                  }}
                >
                  {pos.map(({ player }) => {
                    const playerName = player.name.split(' ')

                    const playerLastName = playerName[playerName.length - 1]
                    return (
                      <View
                        key={player.id}
                        style={{
                          marginHorizontal: getPositionSpacing(pos.length),

                          // marginTop: index === 0 ? spacing.sm : 0,
                        }}
                      >
                        <PlayerImageInfo
                          name={playerLastName}
                          fullName={player?.name}
                          fontSize="body3"
                          bgColor={`#${fixtureDetails?.lineups[0]?.team?.colors?.player?.primary}`}
                          color={`#${fixtureDetails?.lineups[0]?.team?.colors?.player?.number}`}
                          borderColor={`#${fixtureDetails?.lineups[0]?.team?.colors?.player?.border}`}
                          number={player?.number}
                          playerId={player?.id}
                          statisticsPlayersAccessFound={
                            statisticsPlayersAccessFound
                          }
                          teamSide="home"
                          getPlayerStats={getPlayerStats}
                        />
                      </View>
                    )
                  })}
                </View>
              ))}
            </View>
            <View style={{ flex: 0.5 }}>
              {team2LineUp.map((pos, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row',
                    alignContent: 'space-between',
                    justifyContent: 'center',
                    flex: 1,
                  }}
                >
                  {pos.map(({ player }, index) => {
                    const playerName = player.name.split(' ')

                    const playerLastName = playerName[playerName.length - 1]
                    return (
                      <View
                        key={player.id}
                        style={{
                          marginHorizontal: getPositionSpacing(pos.length),
                          // marginTop: index === 0 ? spacing.sm : 'auto',
                        }}
                      >
                        <PlayerImageInfo
                          name={playerLastName}
                          fullName={player?.name}
                          fontSize="body3"
                          bgColor={`#${fixtureDetails?.lineups[1]?.team?.colors?.player?.primary}`}
                          color={`#${fixtureDetails?.lineups[1]?.team?.colors?.player?.number}`}
                          borderColor={`#${fixtureDetails?.lineups[1]?.team?.colors?.player?.border}`}
                          number={player?.number}
                          playerId={player?.id}
                          statisticsPlayersAccessFound={
                            statisticsPlayersAccessFound
                          }
                          teamSide="away"
                          getPlayerStats={getPlayerStats}
                          // color={team2Color}
                          // number={player?.}
                        />
                      </View>
                    )
                  })}
                </View>
              ))}
            </View>
          </ImageBackground>
          {/* Away Team Formation Block */}
          <View style={styles.formationBlock}>
            <Image
              source={{ uri: fixtureDetails?.statistics[1]?.team?.logo }}
              style={{ height: 30, width: 30, resizeMode: 'contain' }}
            />
            <Spacer direction="row" space="md" />
            <NormalText color="white" fontFamily="semiBold" fontSize="body2">
              {fixtureDetails?.statistics[1]?.team?.name}
            </NormalText>
            <NormalText
              color="white"
              fontFamily="semiBold"
              fontSize="body2"
              marginLeft="auto"
            >
              {fixtureDetails?.lineups[1]?.formation}
            </NormalText>
          </View>
        </>
      ) : (
        <Nodata
          // isImageShow={false}
          title="No Results To Show"
          description="Currently We are not Having Lineup Info"
        />
      )}

      {/* Manager Section */}
      {/* <View
        style={{
          paddingHorizontal: spacing.md,
          backgroundColor: colors.lightGray,
          paddingBottom: spacing.md,
        }}
      >
        <Spacer space="md" />

        <View>
          <Card marginRight={0}>
            <Heading text="Managers" type="h5" />
            <Spacer space="md" />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-around' }}
            >
              <PlayerImageInfo name={'pep Gaudialo'} textColor="dark" />
              <PlayerImageInfo name={'pep n'} textColor="dark" />
            </View>
          </Card>
        </View>
      </View> */}
    </Tabs.ScrollView>
  )
}

export default FixtureLineupSection

const styles = StyleSheet.create({
  imgBackground: (height) => ({
    width: 'auto',
    height: height + 60,
    paddingTop: spacing.md,

    resizeMode: 'cover',
    flex: 1,
    paddingHorizontal: spacing.md,
  }),
  formationBlock: {
    backgroundColor: '#1F9059',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
})
