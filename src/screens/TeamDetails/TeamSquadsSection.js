/* eslint-disable react/prop-types */
import { Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tabs } from 'react-native-collapsible-tab-view'
import { spacing } from '../../utils/UIRules/spacing'
import { colors } from '../../utils/UIRules/colors'
import Card from '../../components/common/Card'
import { List } from 'react-native-paper'
import Heading from '../../components/common/Heading'
import StatsDetailRow from '../../components/common/StatsDetailRow'
// import squadData from '../../dummyDatas/squad'
import footballApiPlayerService from '../../service/footballApi/playersService'
import Spacer from '../../components/common/Spacer'
import FullScreenLoader from '../../components/common/FullScreenLoader'
import { useNavigation } from '@react-navigation/native'
import Nodata from '../../components/common/Nodata'

const TeamPlayersSection = ({ teamId }) => {
  const [squad, setSquad] = useState({})
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()

  const fetchTeamSquad = async () => {
    setLoading(true)
    try {
      const squadData = await footballApiPlayerService.getSquad({
        team: teamId,
      })
      const groupedPostionPlayers = squadData[0].players.reduce(
        (groupedPosition, player) => {
          const { position } = player
          if (groupedPosition[position] == null) {
            groupedPosition[position] = []
            groupedPosition[position].push(player)
          } else {
            groupedPosition[position].push(player)
          }
          return groupedPosition
        },
        {}
      )

      setSquad(groupedPostionPlayers)
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTeamSquad()
  }, [])

  return (
    <Tabs.ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchTeamSquad} />
      }
    >
      {/* <View style={{ marginTop: -spacing.md, zIndex: 100 }}> */}
      {/* </View> */}
      {/* <Card marginRight={0} borderRadius={spacing.md}>
        <List.Section>
          <List.Subheader
            style={{
              paddingLeft: -spacing.md,
              marginTop: -spacing.md,
              marginBottom: -spacing.sm,
            }}
          >
            <Heading
              text={'Manager'}
              type="h5"
              // containerStyle={{ marginTop: -5 }}
            />
          </List.Subheader>
          {[''].map(() => (
            <>
              <StatsDetailRow
                image={require('../../../assets/player.png')}
                rightContent={2}
                title="C. Ronaldo"
                onPress={() => console.log('cliecked')}
              />

            </>
          ))}
        </List.Section>
      </Card> */}

      {/* Object.entries(animals).forEach(([key, value]) => {
    console.log(`${key}: ${value}`)
}); */}
      {!loading && Object.keys(squad).length !== 0 ? (
        <>
          <Spacer space="sm" />
          {Object.entries(squad)?.map(([positionTitle, players]) => (
            <Card
              key={positionTitle}
              marginRight={0}
              // borderRadius={spacing.md}
              marginBottom={spacing.sm}
            >
              <List.Section>
                <List.Subheader
                  style={{
                    paddingLeft: -spacing.md,
                    marginTop: -spacing.md,
                    marginBottom: -spacing.sm,
                  }}
                >
                  <Heading
                    text={positionTitle}
                    type="h5"
                    // containerStyle={{ marginTop: -5 }}
                  />
                </List.Subheader>
                {players?.map((player) => (
                  <>
                    <StatsDetailRow
                      image={player?.photo}
                      rightContent={player?.number}
                      title={player?.name}
                      onPress={() =>
                        navigation.navigate('PlayerProfile', {
                          playerId: player?.id,
                        })
                      }
                    />

                    {/* <Spacer space="sm" /> */}
                  </>
                ))}
              </List.Section>
            </Card>
          ))}
        </>
      ) : (
        !loading &&
        Object.keys(squad).length === 0 && (
          <Nodata isImageShow={false} title="No Data Found" />
        )
      )}
    </Tabs.ScrollView>
  )
}

export default TeamPlayersSection

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.sm,
    // backgroundColor: colors.white,
    // paddingTop: 290,
    // marginTop: spacing.sm,
    // paddingBottom: 60,
  },
})
