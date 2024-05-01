import { Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { spacing } from '../../../utils/UIRules/spacing'
import Spacer from '../../../components/common/Spacer'
import { Divider, ProgressBar, useTheme } from 'react-native-paper'
import NormalText from '../../../components/NormalText'
import Rating from '../../../components/common/Rating'
import { colors } from '../../../utils/UIRules/colors'
import Card from '../../../components/common/Card'
import { Tabs } from 'react-native-collapsible-tab-view'
import footballApiFixturesService from '../../../service/footballApi/fixture'
import { useDispatch, useSelector } from 'react-redux'
import StatisticsDataRow from './StatisticsDataRow'
import { fetchFixtureDetails } from '../../../redux/slices/footballApi/fixtureDetailsSlice'

const FixtureStatisticsSection = ({ fixtureId }) => {
  const theme = useTheme()
  const { fixtureDetails, fixtureDetailsLoading } = useSelector(
    (state) => state.fixtureDetails
  )
  const dispatch = useDispatch()

  // const[fixturesSta]

  // Recurring
  // NS =>  is today date
  // 1H
  // HT
  // 2H
  // ET
  // BT
  // P
  // SUSP => is Today Date
  // INT => is Today Date
  // LIVE

  // const getFixtureDetails = async () => {
  //   const fixtures = await footballApiFixturesService.getFixtures(fixtureId)

  // }

  // useEffect(() => {
  //   getFixtureDetails()
  // }, [])

  const getStatiticsValues = (stage, label) => {
    const findStage = stage === 'home' ? 0 : 1

    const statValue = fixtureDetails?.statistics[findStage]?.statistics?.find(
      (stat) => stat.type === label
    )

    return statValue?.value || '-'
  }

  return (
    <Tabs.ScrollView
      style={{
        paddingHorizontal: spacing.sm,
        backgroundColor: theme.colors.background, // '#fafafa'
      }}
      refreshControl={
        <RefreshControl
          refreshing={fixtureDetailsLoading}
          onRefresh={() => dispatch(fetchFixtureDetails(fixtureId))}
        />
      }
    >
      {/* <Spacer space="sm" /> */}
      {/* <Card marginRight={0}>
        <View style={{ flexDirection: 'row' }}>
          <NormalText containerMarginRight={0} fontSize="body1">
            Player of the match
          </NormalText>
          <Spacer direction="row" space="sm" />
          <Rating />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../../../assets/manunited.png')}

            // style={{ height: 100, width: 100, marginLeft: 'auto' }}
          />
          <Spacer direction="row" space="sm" />
          <NormalText
            containerMarginRight={0}
            fontSize="body2"
            fontFamily="semiBold"
            color="bodyCopy"
          >
            Memphis Depay
          </NormalText>

          <Image
            source={require('../../../assets/player.png')}
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              marginLeft: 'auto',
              resizeMode: 'contain',
            }}
          />
        </View>
      </Card> */}
      <Spacer space="md" />
      <Card>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 4,
          }}
        >
          <Image
            source={{ uri: fixtureDetails?.statistics[0]?.team?.logo }}
            style={{ height: 30, width: 30, resizeMode: 'contain' }}
          />
          <NormalText
            fontFamily="semiBold"
            fontSize="body2"
            color="bodyCopy"
            containerMarginRight={0}
          >
            Team Stats
          </NormalText>
          <Image
            source={{ uri: fixtureDetails?.statistics[1]?.team?.logo }}
            style={{ height: 30, width: 30, resizeMode: 'contain' }}
          />
        </View>
        <Spacer space="md" />
        <Divider />
        <Spacer space="md" />

        <StatisticsDataRow
          homeText={getStatiticsValues('home', 'Ball Possession')}
          headline={'Ball Possession'}
          awayText={getStatiticsValues('away', 'Ball Possession')}
        />
        <StatisticsDataRow
          homeText={getStatiticsValues('home', 'Total Shots')}
          headline={'Total Shots'}
          awayText={getStatiticsValues('away', 'Total Shots')}
        />
        <StatisticsDataRow
          homeText={getStatiticsValues('home', 'Shots on Goal')}
          headline={'Shots on Goal'}
          awayText={getStatiticsValues('away', 'Shots on Goal')}
        />
        <StatisticsDataRow
          homeText={getStatiticsValues('home', 'Total passes')}
          headline={'Total passes'}
          awayText={getStatiticsValues('away', 'Total passes')}
        />
        <StatisticsDataRow
          homeText={getStatiticsValues('home', 'Passes accurate')}
          headline={'Passes accurate'}
          awayText={getStatiticsValues('away', 'Passes accurate')}
        />
        <StatisticsDataRow
          homeText={getStatiticsValues('home', 'Passes %')}
          headline={'Passes %'}
          awayText={getStatiticsValues('away', 'Passes %')}
        />
        <StatisticsDataRow
          homeText={getStatiticsValues('home', 'Fouls')}
          headline={'Fouls'}
          awayText={getStatiticsValues('away', 'Fouls')}
        />
        <StatisticsDataRow
          homeText={getStatiticsValues('home', 'Yellow Cards')}
          headline={'Yellow Cards'}
          awayText={getStatiticsValues('away', 'Yellow Cards')}
        />
        <StatisticsDataRow
          homeText={getStatiticsValues('home', 'Red Cards')}
          headline={'Red Cards'}
          awayText={getStatiticsValues('away', 'Red Cards')}
        />
        <StatisticsDataRow
          homeText={getStatiticsValues('home', 'Offsides')}
          headline={'Offsides'}
          awayText={getStatiticsValues('away', 'Offsides')}
        />
        <StatisticsDataRow
          homeText={getStatiticsValues('home', 'Corner Kicks')}
          headline={'Corner Kicks'}
          awayText={getStatiticsValues('away', 'Corner Kicks')}
        />
      </Card>
    </Tabs.ScrollView>
  )
}

export default FixtureStatisticsSection

const styles = StyleSheet.create({})
