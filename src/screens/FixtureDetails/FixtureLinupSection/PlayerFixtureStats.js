import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NormalText from '../../../components/NormalText'
import Spacer from '../../../components/common/Spacer'
import Button from '../../../components/common/Button/Button'
import Heading from '../../../components/common/Heading'
import PlayerFixtureStatRow from './PlayerFixtureStatRow'
import { Divider } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const PlayerFixtureStats = ({
  playerId,
  playerStats,
  fullName,
  navigateToProfilePage,
}) => {
  const getPosition = (pos) => {
    switch (pos) {
      case 'G':
        return 'GoalKeeper'
      case 'D':
        return 'Defender'
      case 'M':
        return 'Mid-Fielder'
      case 'F':
        return 'Forward'
      default:
        return pos
    }
  }

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View>
          <Image
            source={{
              uri: `https://media-2.api-sports.io/football/players/${playerId}.png`,
            }}
            style={{ height: 50, width: 50, borderRadius: 25 }}
          />
          <Spacer space="sm" />

          <NormalText fontSize={'body1'} fontFamily="semiBold" color="dark">
            {fullName}
          </NormalText>
          <NormalText fontSize={'body3'} color="bodyCopy">
            {getPosition(playerStats?.games?.position)}
          </NormalText>
        </View>

        <Button
          label="Visit Profile"
          btnType="small"
          onPress={() => navigateToProfilePage(playerId)}
        />
      </View>
      <Spacer space="lg" />

      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}> */}
      <NormalText fontSize="body2" fontFamily="bold">
        {playerStats?.games?.position === 'G'
          ? 'Keeping Stats'
          : 'General Stats'}
      </NormalText>
      <Spacer space="md" />
      <PlayerFixtureStatRow label="Rating" value={playerStats?.games?.rating} />
      <Spacer space="md" />
      <PlayerFixtureStatRow
        label="Minute Played"
        value={playerStats?.games?.minutes}
      />
      <Spacer space="md" />

      {playerStats?.games?.position === 'G' && (
        <>
          <PlayerFixtureStatRow
            label="Saves"
            value={playerStats?.goals?.saves || '-'}
          />
          <Spacer space="md" />
        </>
      )}

      {playerStats?.games?.position === 'G' && (
        <>
          <PlayerFixtureStatRow
            label="Goals Conceded"
            value={playerStats?.goals?.conceded || '-'}
          />
          <Spacer space="md" />
        </>
      )}

      {playerStats?.games?.position === 'G' && (
        <>
          <NormalText fontSize="body2" fontFamily="bold">
            General
          </NormalText>
          <Spacer space="md" />
        </>
      )}

      <PlayerFixtureStatRow
        label="Goals"
        value={playerStats?.goals?.total || '-'}
      />
      <Spacer space="md" />
      <PlayerFixtureStatRow
        label="Assists"
        value={playerStats?.goals?.assists || '-'}
      />
      <Spacer space="md" />
      <PlayerFixtureStatRow
        label="Total Passes"
        value={playerStats?.passes?.total || '-'}
      />
      <Spacer space="md" />
      <PlayerFixtureStatRow
        label="Accuracy Passes"
        value={playerStats?.passes?.accuracy || '-'}
      />
      <Spacer space="md" />
      <PlayerFixtureStatRow
        label="Total Shots"
        value={playerStats?.shots?.total || '-'}
      />
      <Spacer space="md" />
      {/* Tackles */}
      <NormalText fontSize="body2" fontFamily="bold">
        Tackles
      </NormalText>
      <Spacer space="md" />
      <PlayerFixtureStatRow
        label="Total"
        value={playerStats?.tackles?.total || '-'}
      />
      <Spacer space="md" />
      <PlayerFixtureStatRow
        label="Blocks"
        value={playerStats?.tackles?.blocks || '-'}
      />
      <Spacer space="md" />
      <PlayerFixtureStatRow
        label="Interceptions"
        value={playerStats?.tackles?.interceptions || '-'}
      />
      <Spacer space="md" />

      {/* Duels */}
      <NormalText fontSize="body2" fontFamily="bold">
        Duels
      </NormalText>
      <Spacer space="md" />
      <PlayerFixtureStatRow
        label="Total"
        value={playerStats?.duels?.total || '-'}
      />
      <Spacer space="md" />
      <PlayerFixtureStatRow
        label="Won"
        value={playerStats?.duels?.won || '-'}
      />
      <Spacer space="md" />

      {/* Dribbles */}
      <NormalText fontSize="body2" fontFamily="bold">
        Dribbles
      </NormalText>
      <Spacer space="md" />
      <PlayerFixtureStatRow
        label="Attempts"
        value={playerStats?.dribbles?.attempts || '-'}
      />
      <Spacer space="md" />
      <PlayerFixtureStatRow
        label="Success"
        value={playerStats?.dribbles?.success || '-'}
      />
      <Spacer space="md" />
      <PlayerFixtureStatRow
        label="Past"
        value={playerStats?.dribbles?.past || '-'}
      />
      <Spacer space="md" />

      {/* Fouls */}
      <NormalText fontSize="body2" fontFamily="bold">
        Fouls
      </NormalText>
      <Spacer space="md" />
      <PlayerFixtureStatRow
        label="Drawn"
        value={playerStats?.fouls?.drawn || '-'}
      />
      <Spacer space="md" />
      <PlayerFixtureStatRow
        label="Committed"
        value={playerStats?.fouls?.committed || '-'}
      />
      <Spacer space="md" />

      {/* Cards */}
      <NormalText fontSize="body2" fontFamily="bold">
        Cards
      </NormalText>
      <Spacer space="md" />
      <PlayerFixtureStatRow
        label="Yellow"
        value={playerStats?.cards?.yellow || '-'}
      />
      <Spacer space="md" />
      <PlayerFixtureStatRow
        label="Red"
        value={playerStats?.cards?.red || '-'}
      />
      <Spacer space="md" />

      {/* Penalty */}
      <NormalText fontSize="body2" fontFamily="bold">
        Penalty
      </NormalText>
      <Spacer space="md" />

      <PlayerFixtureStatRow
        label="Saved"
        value={playerStats?.penalty?.saved || '-'}
      />
      <Spacer space="md" />
      <PlayerFixtureStatRow
        label="Won"
        value={playerStats?.penalty?.won || '-'}
      />
      <Spacer space="md" />
      <PlayerFixtureStatRow
        label="Commited"
        value={playerStats?.penalty?.commited || '-'}
      />
      <Spacer space="md" />
      <PlayerFixtureStatRow
        label="Scored"
        value={playerStats?.penalty?.scored || '-'}
      />
      <Spacer space="md" />
      <PlayerFixtureStatRow
        label="Missed"
        value={playerStats?.penalty?.missed || '-'}
      />
      <Spacer space="md" />

      {/* <NormalText>{playerStats?.games?.rating}</NormalText>
      </View> */}
    </View>
  )
}

export default PlayerFixtureStats

const styles = StyleSheet.create({})
