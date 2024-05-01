import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { spacing } from '../../utils/UIRules/spacing'
import { Image, StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import splashScreen from '../../../assets/splash-screen-icon.png'
import NormalText from '../../components/NormalText'
import Spacer from '../../components/common/Spacer'
import Heading from '../../components/common/Heading'

const NewsHeader = () => {
  const theme = useTheme()
  const navigation = useNavigation()

  return (
    <View style={{ backgroundColor: theme.colors.secondaryBg, flex: 1 }}>
      <View style={[styles.headerContainer]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* <Heading text={'Footem'} type="h3" lineHeight={30} /> */}
          <Image
            source={splashScreen}
            style={{
              height: 40,
              width: 40,
              resizeMode: 'contain',
              marginRight: spacing.sm,
            }}
          />
          <Spacer space="md" />
          <Heading text={'Footemxtra'} type="h4" color="primary" />
        </View>
        {/* <View>
          <IconButton
            icon={'heart-plus'}
            size={32}
            iconColor={colors.primary}
            onPress={() => navigation.navigate('')}
          />
  
        </View> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: spacing.md,
    // paddingBottom: spacing.sm,
    paddingTop: spacing.sm,
    // backgroundColor: theme.colors.backgroundColor,
    // paddingTop: StatusBar.currentHeight - 10,
    // transform: [{ translateY: StatusBar.currentHeight }],
  },
})

export default NewsHeader
