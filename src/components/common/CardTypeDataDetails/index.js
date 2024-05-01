/* eslint-disable no-constant-condition */
import { StyleSheet, View } from 'react-native'
import React from 'react'
import Card from '../Card'
import { spacing } from '../../../utils/UIRules/spacing'
import NormalText from '../../NormalText'
import { colors } from '../../../utils/UIRules/colors'
import Spacer from '../Spacer'
import { Divider } from 'react-native-paper'
import { Text } from 'react-native'

const CardTypeDataDetails = ({ data = {}, title, image, subData = null }) => {
  console.log(data, 'the-dataat')
  return (
    <Card marginRight={0} contentPadding={0}>
      <View style={styles.tournamentStatsContainer}>
        <View style={styles.header}>
          {image && image}
          <Spacer direction="row" space="sm" />
          <NormalText fontSize={'body1'} color="white" fontFamily="bold">
            {title}
          </NormalText>
        </View>
        {/* <Divider /> */}
        <View style={styles.contents}>
          {Object.entries(data).map(([key, value], index) => {
            return (
              <>
                <View style={styles.rowItem} key={index}>
                  <NormalText
                    fontSize={'body2'}
                    fontFamily="semiBold"
                    color="bodyCopy"
                  >
                    {`${key.charAt(0).toUpperCase()}${key.slice(1)}`}
                  </NormalText>
                  <NormalText
                    fontSize={'body2'}
                    // color={index % 2 === 0 ? 'primary' : 'danger'}
                    fontFamily="semiBold"
                  >
                    {typeof value === 'boolean' && value === true
                      ? 'Yes'
                      : typeof value === 'boolean' && value === false
                      ? 'No'
                      : value}
                  </NormalText>
                </View>
                <Spacer space="md" />
                <Divider style={{ backgroundColor: colors.gray4 }} />
              </>
            )
          })}

          {/* {subData && Object.entries(data).map(([key, value], index) => {
            
          })} */}
          {/* {data.map((detail, index) => (
            <View style={styles.rowItem} key={index}>
              <NormalText fontSize={'body2'} color="dark">
                {detail.label}
              </NormalText>
              <NormalText
                fontSize={'body1'}
                color={index % 2 === 0 ? 'primary' : 'danger'}
                fontFamily="bold"
              >
                {detail.value}
              </NormalText>
            </View>
          ))} */}
        </View>
      </View>
    </Card>
  )
}

export default CardTypeDataDetails

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.dark,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderTopLeftRadius: spacing.sm,
    borderTopRightRadius: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contents: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.md + 4,
  },
})
