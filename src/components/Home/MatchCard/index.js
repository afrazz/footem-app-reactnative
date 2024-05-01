import { Dimensions, StyleSheet, View, Image } from 'react-native'
import React from 'react'
import {
  Badge,
  Text,
  // Card as MUICard,
} from 'react-native-paper'
import Spacer from '../../common/Spacer'
import fontConfig from '../../../utils/UIRules/fontFamily'
import { fontSizes } from '../../../utils/UIRules/fontSize'
import { colors } from '../../../utils/UIRules/colors'
import { spacing } from '../../../utils/UIRules/spacing'
import Card from '../../common/Card/index.js'
// import Card from './Card'

const MatchCard = () => {
  let deviceWidth = Dimensions.get('window').width
  return (
    <View style={{ marginVertical: 8, marginHorizontal: 3 }}>
      <Card backgroundColor={colors.primary} width={deviceWidth / 3}>
        <Badge
          style={{
            backgroundColor: '#fff',
            color: colors.primary,
            fontFamily: fontConfig.fontBold,
            borderRadius: 10,
            paddingHorizontal: 10,
            marginBottom: spacing.sm,
          }}
        >
          Live
        </Badge>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Image
            source={require('../../../../assets/united.png')}
            style={{
              width: 50,
              height: 50,
              marginTop: -4,
            }}
          />

          <Image
            source={require('../../../../assets/barcelona.png')}
            style={{
              width: 45,
              height: 45,
            }}
          />
        </View>
        <Spacer space="sm" />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontSize: fontSizes.body2,
              // fontFamily: fontConfig.fontSemiBold,
            }}
          >
            Barcelona
          </Text>
          <Text
            style={{
              color: colors.white,
              fontSize: fontSizes.body2,
              // fontFamily: fontConfig.fontSemiBold,
            }}
          >
            1
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontSize: fontSizes.body2,
              // fontFamily: fontConfig.fontSemiBold,
            }}
          >
            Real Madrid
          </Text>
          <Text
            style={{
              color: colors.white,
              fontSize: fontSizes.body2,
              // fontFamily: fontConfig.fontSemiBold,
            }}
          >
            0
          </Text>
        </View>
      </Card>

      {/* <MUICard
        style={{
          borderRadius: 10,
          backgroundColor: colors.primary,
          width: deviceWidth / 3,
          marginRight: 20,
          borderColor: 'transparent',

          // elevation: 5, // Android
          // shadowColor: '#030002',
        }}
        mode="outlined"
        elevation={5}
      >
        <MUICard.Content
          style={{
            backgroundColor: colors.primary,
            borderRadius: 5,
            elevation: 4, // Android
            shadowColor: colors.dark,
            paddingHorizontal: spacing.sm + 3,
            shadowRadius: 5,
          }}
        >
          <Badge
            style={{
              backgroundColor: '#fff',
              color: colors.primary,
              fontFamily: fontConfig.fontBold,
              borderRadius: 10,
              paddingHorizontal: 10,
              marginBottom: spacing.sm,
            }}
          >
            Live
          </Badge>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Image
              source={require('../../assets/united.png')}
              style={{
                width: 50,
                height: 50,
                marginTop: -4,
              }}
            />

            <Image
              source={require('../../assets/barcelona.png')}
              style={{
                width: 45,
                height: 45,
              }}
            />
          </View>
          <Spacer space="sm" />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                color: colors.white,
                fontSize: fontSizes.body2,
                fontFamily: fontConfig.fontSemiBold,
              }}
            >
              Barcelona
            </Text>
            <Text
              style={{
                color: colors.white,
                fontSize: fontSizes.body2,
                fontFamily: fontConfig.fontSemiBold,
              }}
            >
              1
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: colors.white,
                fontSize: fontSizes.body2,
                fontFamily: fontConfig.fontSemiBold,
              }}
            >
              Real Madrid
            </Text>
            <Text
              style={{
                color: colors.white,
                fontSize: fontSizes.body2,
                fontFamily: fontConfig.fontSemiBold,
              }}
            >
              0
            </Text>
          </View>
        </MUICard.Content>
      </MUICard> */}
    </View>
  )
}

export default MatchCard

const styles = StyleSheet.create({})
