import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  DevSettings,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import SettingsRowBlock from './SettingsRowBlock'
import languageIcon from '../../../assets/languageIcon.png'
import Modal from '../../components/common/Modal'
import { colors } from '../../utils/UIRules/colors'
import {
  ActivityIndicator,
  Button,
  RadioButton,
  Text,
} from 'react-native-paper'
import NormalText from '../../components/NormalText'
import Spacer from '../../components/common/Spacer'
import { spacing } from '../../utils/UIRules/spacing'
import languageService from '../../service/language'
import userService from '../../service/user'
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage, setUpdateUser } from '../../redux/slices/authSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackActions, useNavigation } from '@react-navigation/native'
import guestUserService from '../../service/guestUser'
import { DEFAULT_LANGUAGE_ID } from '../../constants'

const LanguageSettings = () => {
  const [loading, setLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [languageModalOpen, setLanguageModalOpen] = useState(false)
  const [checked, setChecked] = useState(null)
  const [languages, setLanguages] = useState([])
  const dispatch = useDispatch()

  const navigation = useNavigation()

  const { user, language } = useSelector((state) => state.auth)

  const onNewsLanguageClick = () => {
    setLanguageModalOpen(true)
  }

  // useEffect(() => {
  //   if (user) {
  //     setChecked(user.language)
  //   } else {
  //     setNonLoginUserLanguage()
  //   }
  // }, [user])

  useEffect(() => {
    if (language) {
      setChecked(language)
    } else {
      // TODO: TEST
      setChecked(DEFAULT_LANGUAGE_ID)
    }
  }, [language])

  // const setNonLoginUserLanguage = async () => {
  //   const languageId = await AsyncStorage.getItem('languageId')
  //   console.log(languageId, 'kiioo')
  //   if (languageId) {
  //     setChecked(languageId)
  //   }
  // }

  useEffect(() => {
    fetchLanguages()
  }, [])

  const fetchLanguages = async () => {
    setLoading(true)

    const languages = await languageService.getLanguages()
    if (languages) {
      if (languages) {
        setLanguages(languages)
      }
    }

    setLoading(false)
  }

  const onLanguageSelectHandler = async (selectedLanguageId) => {
    setSubmitLoading(true)
    setLanguageModalOpen(false)
    setChecked(selectedLanguageId)
    // await AsyncStorage.setItem('languageId', selectedLanguageId)
    await dispatch(setLanguage(selectedLanguageId))
    try {
      if (!user) {
        const guestUserFcmToken = await AsyncStorage.getItem(
          'guestUserFCMToken'
        )
        // const languageId = await AsyncStorage.getItem('languageId')
        await guestUserService.updateGuestUser({
          _id: guestUserFcmToken,
          language: selectedLanguageId,
        })
      } else {
        await userService.updateUserInfo({
          language: selectedLanguageId,
        })
        dispatch(setUpdateUser({ language: selectedLanguageId }))
      }
    } catch (err) {
      alert(JSON.stringify(err))
      setSubmitLoading(false)
    }

    setSubmitLoading(false)

    // DevSettings.reload()

    // handleResetStack()
  }

  // const handleResetStack = () => {
  //   const resetAction = StackActions.reset({
  //     index: 0,
  //     actions: [StackActions.replace({ routeName: 'News' })],
  //   })

  //   navigation.dispatch(resetAction)
  // }

  return (
    <View>
      <SettingsRowBlock
        onPress={onNewsLanguageClick}
        icon={languageIcon}
        label="News Language"
        value={
          !loading
            ? languages?.find((lang) => lang._id === checked)?.name || 'English'
            : ''
        }
      />

      <Modal
        setVisible={setLanguageModalOpen}
        visible={languageModalOpen}
        actions={
          <>
            <Button
              onPress={() => {
                setLanguageModalOpen(false)
              }}
              textColor={colors.danger}
            >
              Cancel
            </Button>
          </>
        }
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <RadioButton.Group
            onValueChange={(value) => onLanguageSelectHandler(value)}
            value={checked}
          >
            {languages?.map((cur, i) => (
              <TouchableOpacity
                key={i}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: spacing.sm,
                }}
                onPress={() => onLanguageSelectHandler(cur._id)}
              >
                <RadioButton value={cur._id} />
                <Spacer direction="row" space="sm" />
                <NormalText color="dark" fontFamily="semiBold" fontSize="body1">
                  {cur.name}
                </NormalText>
              </TouchableOpacity>
            ))}
          </RadioButton.Group>
        </ScrollView>
      </Modal>

      <Modal
        setVisible={setSubmitLoading}
        visible={submitLoading}
        dismissable={false}
      >
        <ActivityIndicator animating={true} size={'large'} color="primary" />
      </Modal>
    </View>
  )
}

export default LanguageSettings
