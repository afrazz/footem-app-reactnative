/* eslint-disable react/prop-types */
import { Image, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { Divider, IconButton, List, useTheme } from 'react-native-paper'
import { colors } from '../../../utils/UIRules/colors'
import { spacing } from '../../../utils/UIRules/spacing'
import { useState } from 'react'
import { fontSizes } from '../../../utils/UIRules/fontSize'
import fontFamily from '../../../utils/UIRules/fontFamily'
import NormalText from '../../NormalText'
import Spacer from '../Spacer'
import {
  useCurrentTabScrollY,
  useHeaderMeasurements,
} from 'react-native-collapsible-tab-view'
import { useEffect } from 'react'
import FixtureAccordianBlock from '../FixtureBlock'
import AccordianBlockHeaderLeft from './AccordianBlockHeaderLeft'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import { getMatchStatus } from '../../../utils/functions'

const AccordianBlock = ({ accordiandata }) => {
  const theme = useTheme()
  const [expanded, setExpanded] = React.useState(
    accordiandata.isAccordianOpen || false
  )

  console.log('hitting.........................')

  const handlePress = () => setExpanded(!expanded)

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.secondaryBg }]}
    >
      <List.Accordion
        title={
          <NormalText fontSize={'body2'} fontFamily="semiBold">
            {accordiandata.league.name}
          </NormalText>
        }
        left={() => (
          <Image
            source={{ uri: accordiandata.league.logo }}
            style={{ height: 35, width: 35, resizeMode: 'contain' }}
          />
        )}
        expanded={expanded}
        onPress={handlePress}
        theme={{ colors: { primary: theme.colors.secondaryBg } }}
        descriptionStyle={{ backgroundColor: theme.colors.secondaryBg }}
        style={{ backgroundColor: theme.colors.secondaryBg }}
      >
        <Divider />

        {accordiandata?.matches?.length > 0 ? (
          accordiandata.matches.map((fixture, i) => (
            <FixtureAccordianBlock
              key={i}
              matchStatus={
                fixture?.goals?.home !== null && fixture?.goals?.away !== null
                  ? `${fixture?.goals?.home} - ${fixture?.goals?.away}`
                  : moment(fixture?.fixture?.date).format('hh:mm a')
              }
              team1={fixture.teams.home}
              team2={fixture.teams.away}
              penalty={fixture?.score?.penalty}
              matchTime={getMatchStatus(
                fixture?.fixture?.status?.short,
                fixture?.fixture?.status?.elapsed
              )}
              shortStatus={fixture?.fixture?.status?.short}
              date={fixture?.date}
              logo={fixture.teams.logo}
              fixtureId={fixture?.fixture?.id}
              leagueId={fixture?.league?.id}
            />
          ))
        ) : (
          <>
            <Spacer space="md" />
            <NormalText
              fontFamily="semiBold"
              fontSize={'body13'}
              marginLeft={spacing.sm}
            >
              No Matches Available
            </NormalText>
          </>
        )}
        <Spacer space="lg" />
      </List.Accordion>
    </View>
  )
}
{
  /* {accordiandata.content} */
}

const isEqual = (prevProps, nextProps) => {
  // Extract the 'matches' array from both prevProps and nextProps
  const prevMatches = prevProps.accordiandata.matches
  const nextMatches = nextProps.accordiandata.matches

  if (prevProps.accordiandata.league.id !== nextProps.accordiandata.league.id) {
    return null
  }

  // Compare the 'matches' arrays
  if (prevMatches.length !== nextMatches.length) {
    // If the length of the arrays is different, they are not equal
    return null
  }

  // Check if each match in the 'matches' array is the same
  for (let i = 0; i < prevMatches.length; i++) {
    if (prevMatches[i].fixture.id !== nextMatches[i].fixture.id) {
      // If any match has a different 'fixture.id', the arrays are not equal
      return null
    }

    if (
      prevMatches[i].fixture.status.short !==
      nextMatches[i].fixture.status.short
    ) {
      return null
    }

    if (
      prevMatches[i].fixture.status.elapsed !==
      nextMatches[i].fixture.status.elapsed
    ) {
      return null
    }

    if (prevMatches[i].goals.home !== nextMatches[i].goals.home) {
      return null
    }

    if (prevMatches[i].goals.away !== nextMatches[i].goals.away) {
      return null
    }

    // You can add more checks for other properties if needed
  }

  // If all checks pass, the 'matches' arrays are considered equal
  return true
}

export default memo(AccordianBlock, isEqual)

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.md,
    marginHorizontal: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: spacing.md,
    overflow: 'hidden',
  },
})
