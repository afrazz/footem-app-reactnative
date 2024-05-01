import { RefreshControl, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import footballApiStandingService from '../../service/footballApi/standingService'
import FootballPointTable from '../../components/common/PointTable'
import { Tabs } from 'react-native-collapsible-tab-view'
import Spacer from '../../components/common/Spacer'
import FullScreenLoader from '../../components/common/FullScreenLoader'

const LeagueTableSection = ({ leagueSeason, leagueId }) => {
  const [teamStanding, setTeamStanding] = useState([])
  const [loading, setLoading] = useState(false)

  const getTeamStanding = async () => {
    setLoading(true)
    try {
      const teamStanding = await footballApiStandingService.getStandings({
        season: leagueSeason,
        league: leagueId,
      })

      setTeamStanding(teamStanding?.standings)
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTeamStanding()
  }, [])

  return (
    <Tabs.ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={getTeamStanding} />
      }
    >
      <>
        {teamStanding?.map((standing, key) => (
          <>
            <FootballPointTable key={key} data={standing} />
            <Spacer space="xl" />
          </>
        ))}
      </>
    </Tabs.ScrollView>
  )
}

export default LeagueTableSection

const styles = StyleSheet.create({})
