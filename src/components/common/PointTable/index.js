import React from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native'
import Card from '../Card'
import NormalText from '../../NormalText'
import { spacing } from '../../../utils/UIRules/spacing'
import Spacer from '../Spacer'
import { colors } from '../../../utils/UIRules/colors'
import { useNavigation } from '@react-navigation/native'
import { getCountryCode } from '../../../utils/functions'
import { useTheme } from 'react-native-paper'

// const data = [
//   {
//     team: 'Manchester United',
//     played: 38,
//     won: 28,
//     drawn: 6,
//     lost: 4,
//     points: 90,
//   },
//   // {
//   //   team: 'Manchester City',
//   //   played: 38,
//   //   won: 27,
//   //   drawn: 5,
//   //   lost: 6,
//   //   points: 86,
//   // },
//   //   { team: 'Liverpool', played: 38, won: 25, drawn: 7, lost: 6, points: 82 },
//   // Add more teams as needed
// ]

const FootballPointTable = ({ data, clickable = true }) => {
  const theme = useTheme()
  // alert(JSON.stringify(data))
  const navigation = useNavigation()
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.row,
        index % 2 === 0
          ? { backgroundColor: theme.colors.greyishBg }
          : { backgroundColor: theme.colors.secondaryBg },
        index === data.length - 1 && {
          borderBottomLeftRadius: spacing.sm,
          borderBottomRightRadius: spacing.sm,
        },
      ]}
      onPress={() => {
        clickable &&
          navigation.navigate('TeamDetails', {
            teamId: item?.team?.id,
            teamName: item?.team?.name,
            teamLogo: item?.team?.logo,
            teamCountry: null,
            teamCode: null,
            teamNational: null,
          })
      }}
    >
      {/* <View> */}
      <Text
        style={[
          styles.team,
          {
            transform: [{ translateY: -1 }],
            // backgroundColor: 'red',
            paddingBottom: spacing.sm,
          },
        ]}
      >
        <NormalText color="dark" fontFamily="bold" fontSize="body2">
          {item?.rank}
        </NormalText>
        <Spacer direction="row" space="md" />
        <Image
          source={{ uri: item?.team?.logo }}
          style={{
            height: 25,
            width: 25,
            // marginBottom: 6,
            resizeMode: 'contain',
          }}
        />
        <Spacer direction="row" space="sm" />
        <Text
          numberOfLines={1}
          style={{ fontSize: 13, color: theme.colors.text }}
        >
          {item?.team?.name}
        </Text>
        {/* <NormalText color="dark" fontSize="body2" lines={1}>
          {item?.team?.name}
        </NormalText> */}
      </Text>
      {/* </View> */}

      <View style={styles.statsContainer}>
        {/* <Text style={styles.stats}>{item.played}</Text> */}
        <NormalText color="dark" fontSize="body2">
          {item?.all?.played}
        </NormalText>
      </View>
      <View style={styles.statsContainer}>
        <NormalText color="dark" fontSize="body2">
          {item?.all?.win}
        </NormalText>
        {/* <Text style={styles.stats}>{item.won}</Text> */}
      </View>
      <View style={styles.statsContainer}>
        <NormalText color="dark" fontSize="body2">
          {item?.all?.draw}
        </NormalText>
        {/* <Text style={styles.stats}>{item.drawn}</Text> */}
      </View>
      <View style={styles.statsContainer}>
        <NormalText color="dark" fontSize="body2">
          {item?.all?.lose}
        </NormalText>
        {/* <Text style={styles.stats}>{item.lost}</Text> */}
      </View>
      <View style={styles.pointsContainer}>
        <NormalText color="dark" fontSize="body2" fontFamily="bold">
          {item?.points}
        </NormalText>
        {/* <Text style={styles.points}>{item.points}</Text> */}
      </View>
    </TouchableOpacity>
  )

  return (
    <Card marginRight={0} contentPadding={0} contentPaddingBottom={2}>
      <View style={styles.container}>
        <View style={[styles.row, styles.headerRow]}>
          <NormalText fontSize="body2" color="white" fontFamily="bold" flex={1}>
            {data[0]?.group || 'Group'}
          </NormalText>
          {/* <Text style={styles.headerText}>Team</Text> */}
          <View style={styles.statsContainer}>
            <NormalText fontSize="body2" color="white" flex={1}>
              P
            </NormalText>
          </View>
          <View style={styles.statsContainer}>
            <NormalText fontSize="body2" color="white" flex={1}>
              W
            </NormalText>
          </View>
          <View style={styles.statsContainer}>
            <NormalText fontSize="body2" color="white" flex={1}>
              D
            </NormalText>
          </View>
          <View style={styles.statsContainer}>
            <NormalText fontSize="body2" color="white" flex={1}>
              L
            </NormalText>
          </View>
          <View style={styles.pointsContainer}>
            <NormalText fontSize="body2" color="white" flex={1}>
              Pts
            </NormalText>
          </View>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.rank}
          contentContainerStyle={styles.tableContent}
        />
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // elevation: 5,
    // backgroundColor: 'white',
    // elevation: 5,
  },
  tableContent: {
    // paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingTop: 12,
    paddingBottom: 18,
  },
  evenRow: {
    backgroundColor: '#ffffff',
  },
  oddRow: {
    backgroundColor: '#f2f2f2',
  },
  headerRow: {
    backgroundColor: colors.dark,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    // height: 55,
    // justifyContent: 'center',
    // borderBottomWidth: 1,
    // borderBottomColor: '#d3d3d3',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: spacing.sm,
    // paddingVertical: 12,
  },
  headerText: {
    flex: 1,
    fontWeight: 'bold',
    color: '#555555',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  team: {
    flex: 1,
    color: '#000000',
    fontSize: 14,
    paddingBottom: 3,
  },
  statsContainer: {
    flex: 0.12,
    alignItems: 'center',
  },
  stats: {
    color: '#333333',
    fontSize: 14,
    textAlign: 'center',
  },
  pointsContainer: {
    flex: 0.12,
    alignItems: 'center',
  },
  points: {
    color: '#ff0000',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default FootballPointTable
