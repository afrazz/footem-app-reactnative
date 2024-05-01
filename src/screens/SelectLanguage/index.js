import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../utils/UIRules/colors'
import { spacing } from '../../utils/UIRules/spacing'
import NormalText from '../../components/NormalText'
import Spacer from '../../components/common/Spacer'
import Heading from '../../components/common/Heading'
import languageService from '../../service/language'
import {
  ActivityIndicator,
  Button,
  Divider,
  useTheme,
} from 'react-native-paper'
import Icon from 'react-native-paper/src/components/Icon'
// import Button from '../../components/common/Button/Button'
import userService from '../../service/user'
import { setIsFirstLaunch, setLanguage } from '../../redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import { StackActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SelectLanguage = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false)
  const [languages, setLanguages] = useState([])
  const [selectedLanguageId, setSelectedLanguageId] = useState(null)
  const dispatch = useDispatch()
  const theme = useTheme()

  const { isSkipped } = route.params

  useEffect(() => {
    fetchLanguages()
  }, [])

  const fetchLanguages = async () => {
    setLoading(true)
    try {
      const languages = await languageService.getLanguages()

      if (languages) {
        setLanguages(languages)
        setSelectedLanguageId(languages[0]._id)
      }
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  const onLanguageSelectHandler = async () => {
    // await AsyncStorage.setItem('languageId', selectedLanguageId)
    dispatch(setLanguage(selectedLanguageId))

    if (!isSkipped) {
      const onLanguageSelect = await userService.updateUserInfo({
        language: selectedLanguageId,
      })
      if (onLanguageSelect) {
        navigation.navigate('OnBoardFollowTeamsScreen')
      } else {
        console.log('something went wrong...')
      }
    } else {
      await dispatch(setIsFirstLaunch(false))
      navigation.dispatch(StackActions.replace('Home'))
    }
  }
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Spacer space="md" />

      <Spacer space="xxl" />
      {loading ? (
        <ActivityIndicator animating={true} size={'small'} color="primary" />
      ) : (
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => console.log('clicked')}
          ></TouchableOpacity>

          <Image
            source={require('../../../assets/language.png')}
            style={{ height: 100, width: 100, resizeMode: 'contain' }}
          />
          <Spacer space="xl" />
          <Heading text="Select Your Preferred News Language" type="h4" />
          <Spacer space="sm" />
          <NormalText color="bodyCopy" fontSize="body1">
            Please Choose Your Language
          </NormalText>
          <Spacer space="xl" />

          {languages?.map((lang) => (
            <TouchableOpacity
              key={lang._id}
              onPress={() => setSelectedLanguageId(lang._id)}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: spacing.lg,
                }}
              >
                <Image
                  source={{
                    uri: `https://cdn.ipregistry.co/flags/emojitwo/${lang.iso2CountryCode}.png`,
                  }}
                  style={{ height: 35, width: 35, resizeMode: 'contain' }}
                />
                <Spacer space="md" direction="row" />
                <NormalText color="dark" fontSize="body1" fontFamily="semiBold">
                  {lang.name}
                </NormalText>
                {selectedLanguageId === lang._id && (
                  <View style={{ marginLeft: 'auto' }}>
                    <Icon
                      source="check-bold"
                      color={colors.primary}
                      size={30}
                    />
                  </View>
                )}
              </View>
              <Divider />
            </TouchableOpacity>
          ))}

          <View
            style={{
              marginTop: 'auto',
              marginBottom: spacing.md,
            }}
          >
            <Button
              onPress={onLanguageSelectHandler}
              mode="outlined"
              buttonColor={colors.dark}
              textColor={colors.white}
            >
              <Text style={{ paddingVertical: 6 }}>
                <NormalText
                  fontSize={'body1'}
                  fontFamily="semiBold"
                  color="white"
                >
                  Get Started
                </NormalText>
              </Text>
            </Button>
            {/* <Button
              textColor={colors.white}
              style={{ borderColor: 'transparent' }}
              mode="text"
              buttonColor={colors.dark}
              onPress={onLanguageSelectHandler}
              label="Get Started"
              btnType="large"
            /> */}
          </View>
        </View>
      )}
    </View>
  )
}

export default SelectLanguage

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: spacing.md,
  },
})
