import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Heading from '../../../components/common/Heading'
import NormalText from '../../../components/NormalText'
import Spacer from '../../../components/common/Spacer'
import { spacing } from '../../../utils/UIRules/spacing'
import { colors } from '../../../utils/UIRules/colors'
import MatchResultLabel from '../../../components/common/MatchResultLabel'

const LastFiveMatchesResultSection = ({ data = [] }) => {
  console.log(data, 'plssss')
  return (
    <>
      {data?.length > 0 && (
        <View style={styles.lastFiveMatchesContainer}>
          <Heading
            text={'Last Five Matches'}
            type="h5"
            fontType="semiBold"
            containerStyle={{ width: 'auto' }}
          />
          {/* <Spacer space="sm" /> */}
          <View style={styles.matchResults}>
            {data.map((result, index) => (
              <>
                <MatchResultLabel result={result} />

                <Spacer direction="row" space="sm" />
              </>
            ))}
          </View>
        </View>
      )}
    </>
  )
}

export default LastFiveMatchesResultSection

const styles = StyleSheet.create({
  lastFiveMatchesContainer: {
    paddingLeft: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  matchResults: {
    flexDirection: 'row',
  },
})
