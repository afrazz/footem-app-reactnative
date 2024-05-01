import { StyleSheet, View } from 'react-native'
import React from 'react'
import TopTabView from '../../../components/common/TopTabView'
import FixtureHeaderSection from '../../FixtureDetails/FixtureDetailsHeaderSection'
import FollowSettingsLeague from './FollowSettingsLeague'
import FollowSettingsTeam from './FollowSettingsTeam'
import Header from '../../../components/common/Header'
import { Button, IconButton, Text, useTheme } from 'react-native-paper'
import Icon from 'react-native-paper/src/components/Icon'
import { colors } from '../../../utils/UIRules/colors'
import { useNavigation } from '@react-navigation/native'

const FollowSettingsPage = () => {
  const navigation = useNavigation()
  const theme = useTheme()
  return (
    <View style={{ flex: 1 }}>
      <Header
        title="Your Followings"
        backButtonEnabled
        rightContent={
          // <Button icon={<Icon source="plus-circle" size={32} color="black" />}>
          //   Press me
          // </Button>
          <IconButton
            icon={'plus-circle'}
            size={36}
            iconColor={theme.colors.text}
            onPress={() => navigation.navigate('League')}
          />
        }
      />
      <TopTabView
        TabsSpacingTop={0}
        TabViewData={[
          {
            name: 'Following Leagues',
            component: <FollowSettingsLeague />,
          },
          {
            name: 'Following Teams',
            component: <FollowSettingsTeam />,
          },
          // {
          //   name: 'Following Teams',
          //   component: <FollowSettingsTeam />,
          // },
        ]}
      />
    </View>
  )
}

export default FollowSettingsPage

const styles = StyleSheet.create({})
