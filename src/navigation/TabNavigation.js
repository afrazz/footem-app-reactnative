import React from 'react'
import HomeScreen from '../screens/Home'
import FixtureScreen from '../screens/Fixture'
import LeagueScreen from '../screens/SelectCountry'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import NewsScreen from '../screens/News'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NewsDetailsScreen from '../screens/NewsDetails'
import SelectLeagues from '../screens/OnboardFollowLeagues'
import FixtureDetails from '../screens/FixtureDetails'
import Icon from 'react-native-paper/src/components/Icon'
import { colors } from '../utils/UIRules/colors'
import SelectCountry from '../screens/SelectCountry'
import SelectCompetition from '../screens/SelectCompetition'
import SelectTeam from '../screens/SelectTeams'
import LeagueDetails from '../screens/LeagueDetails'
import VideoScreen from '../screens/VideoScreen'
import Settings from '../screens/Settings'
import { useTheme } from 'react-native-paper'
import { spacing } from '../utils/UIRules/spacing'
import { useSelector } from 'react-redux'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const NewsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="News" component={NewsScreen} />
    <Stack.Screen name="NewsDetails" component={NewsDetailsScreen} />
  </Stack.Navigator>
)

const FixtureStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Fixture" component={FixtureScreen} />
    <Stack.Screen name="FixtureDetails" component={FixtureDetails} />
  </Stack.Navigator>
)

const SelectionLeagueStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    {/* <Stack.Screen name="SelectCountry" component={SelectCountry} /> */}
    <Stack.Screen name="SelectCompetition" component={SelectCompetition} />
    <Stack.Screen name="SelectTeam" component={SelectTeam} />
    {/* <Stack.Screen name="FixtureDetails" component={FixtureDetails} /> */}
  </Stack.Navigator>
)

export const HomeTabNavigation = () => {
  const { user } = useSelector((state) => state.auth)

  const theme = useTheme()
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.text,
        lazy: true,
        tabBarStyle: { height: 60 },
        tabBarLabelStyle: { transform: [{ translateY: -8 }] },
        // tabBarInactiveTintColor: colors.gray2,
      }}
    >
      {/* <Tab.Screen name="Home" component={HomeScreen} /> */}
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon source="newspaper" color={color} size={size} />
          ),
          // unmountOnBlur: true,
          // tabBarButton: () => null,
          // tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name="Videos"
        component={VideoScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon source="video" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Fixture"
        component={FixtureScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon source="soccer-field" color={color} size={size} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="League"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon source="trophy-outline" color={color} size={size} />
          ),
        }}
        component={SelectCountry}
      />
      <Tab.Screen
        name="Settings"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon source="cog-outline" color={color} size={size} />
          ),
          unmountOnBlur: true,
        }}
        component={Settings}
      />
    </Tab.Navigator>
  )
}
