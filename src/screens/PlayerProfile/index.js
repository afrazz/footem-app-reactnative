import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PlayerProfileHeader from './PlayerProfileHeader'
import { colors } from '../../utils/UIRules/colors'
import TopTabView from '../../components/common/TopTabView'
import ProfileInfoSection from './ProfileInfoSection'
import footballApiPlayerService from '../../service/footballApi/playersService'
import { playerDetailsDummy } from '../../dummyDatas/player'
import PlayerLeagueStats from './PlayerLeagueStats'
import { ActivityIndicator } from 'react-native-paper'
import { removeNullValues } from '../../utils/functions'
import FullScreenLoader from '../../components/common/FullScreenLoader'

const PlayerProfile = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false)
  const [playerInfo, setPlayerInfo] = useState({ player: {}, statistics: [] })

  const { playerId } = route.params

  useEffect(() => {
    getPlayerInfo()
  }, [])
  // const playerId = 154

  const playerInfoApiFetcher = async (season) => {
    const playerInfoData = await footballApiPlayerService.getPlayers({
      id: playerId,
      season: season,
    })
    const filteredData = playerInfoData[0]?.statistics
      ?.map(removeNullValues)
      .filter((item) => item !== null)

    const formattedPlayerDetails = {
      player: {
        ...playerInfoData[0]?.player,
        birth: playerInfoData[0]?.player?.birth?.date,
      },
      statistics: filteredData,
    }
    return formattedPlayerDetails
  }

  const getPlayerInfo = async () => {
    setLoading(true)
    // TODO: Uncommit in production
    // First We are geeting latest Player Season...
    const playerSeasons = await footballApiPlayerService.getPlayerSeason({
      player: playerId,
    })

    if (playerSeasons) {
      // First Call
      const latestPlayerSeason = playerSeasons[playerSeasons.length - 1]
      if (latestPlayerSeason) {
        // const playerInfoData = await footballApiPlayerService.getPlayers({
        //   id: playerId,
        //   season: latestPlayerSeason,
        // })
        // const filteredData = playerInfoData[0]?.statistics
        //   ?.map(removeNullValues)
        //   .filter((item) => item !== null)

        // const formattedPlayerDetails = {
        //   player: {
        //     ...playerInfoData[0]?.player,
        //     birth: playerInfoData[0]?.player?.birth?.date,
        //   },
        //   statistics: filteredData,
        // }
        const seasonLatestData = await playerInfoApiFetcher(latestPlayerSeason)

        if (seasonLatestData) {
          const previousPlayerSeason = playerSeasons[playerSeasons.length - 2]
          const seasonPreviousData = await playerInfoApiFetcher(
            previousPlayerSeason
          )

          const seasonStatics = [
            ...seasonLatestData.statistics,
            ...seasonPreviousData.statistics,
          ]

          const club = seasonStatics.find(
            (cur) => cur.league.country && cur.league.country !== 'World'
          )

          setPlayerInfo({
            player: {
              ...seasonLatestData.player,
              clubName: club?.team?.name,
              clubLogo: club?.team?.logo,
              goals: seasonLatestData.statistics?.reduce((acc, cur) => {
                if (typeof cur?.goals?.total === 'number') {
                  acc += cur?.goals?.total
                }
                return acc
              }, 0),
              goalsConceded: seasonLatestData.statistics?.reduce((acc, cur) => {
                if (typeof cur?.goals?.conceded === 'number') {
                  acc += cur?.goals?.conceded
                }
                return acc
              }, 0),
              // club: {}
              // birth: seasonLatestData[0]?.player?.birth?.date,
            },
            statistics: [
              ...seasonLatestData.statistics,
              ...seasonPreviousData.statistics,
            ],
          })
        }

        // setPlayerInfo(formattedPlayerDetails)
      } else {
        navigation.goBack()
      }
    }

    // const filteredData = playerDetailsDummy[0]?.statistics
    //   ?.map(removeNullValues)
    //   .filter((item) => item !== null)

    // const formattedPlayerDetails = {
    //   player: {
    //     ...playerDetailsDummy[0]?.player,
    //     birth: playerDetailsDummy[0]?.player?.birth?.date,
    //   },
    //   statistics: filteredData,
    // }

    // alert(JSON.stringify(formattedPlayerDetails))

    // setPlayerInfo(formattedPlayerDetails)

    setLoading(false)
  }

  console.log(playerInfo, 'hehh')

  const LeagueHeader = () => {
    return (
      <PlayerProfileHeader
        playerInfo={playerInfo?.player}
        playerClub={playerInfo?.statistics[0]?.team}
      />
    )
  }

  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.dark}
        // style={{ color: colors.white, backgroundColor: colors.dark }}
      />

      <TopTabView
        TabsSpacingTop="sm"
        // removeShadow
        Header={LeagueHeader}
        activeBgColor={colors.dark}
        variant="dark"
        variantColor={colors.dark}
        TabViewData={[
          {
            name: 'Info',
            component: (
              <>
                {loading ? (
                  <FullScreenLoader />
                ) : (
                  <ProfileInfoSection
                    playerInfo={playerInfo?.player}
                    position={playerInfo?.statistics[0]?.games?.position}
                    number={playerInfo?.statistics[0]?.games?.number || '-'}
                    goals={playerInfo?.player?.goals}
                    // conceded={playerInfo?.statistics?.reduce((acc, cur) => {
                    //   if (typeof cur?.goals?.conceded === 'number') {
                    //     acc += cur?.goals?.conceded
                    //   }

                    //   return acc
                    // }, 0)}
                    conceded={playerInfo?.player?.goalsConceded}
                    // leagueSeason={leagueSeason?.year}
                    // leagueId={leagueId}
                  />
                )}
              </>
            ),
          },
          {
            name: 'Statistics',
            component: (
              <PlayerLeagueStats
                // playerCurrentSeason={playerCurrentSeason}
                // playerId={playerId}

                playerStats={playerInfo?.statistics}

                // playerInfo={playerInfo?.player}
                // leagueSeason={leagueSeason?.year}
                // leagueId={leagueId}
              />
            ),
          },
        ]}
      />
    </>
  )
}

export default PlayerProfile

const styles = StyleSheet.create({})
