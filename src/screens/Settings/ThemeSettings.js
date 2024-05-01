import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RadioButton, Switch, Button } from 'react-native-paper'
import SettingsRowBlock from './SettingsRowBlock'
import Modal from '../../components/common/Modal'
import { colors } from '../../utils/UIRules/colors'
import { spacing } from '../../utils/UIRules/spacing'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spacer from '../../components/common/Spacer'
import NormalText from '../../components/NormalText'
import { setTheme } from '../../redux/slices/authSlice'
import { useDispatch } from 'react-redux'

const ThemeSettings = () => {
  const [themeModalOpen, setThemeModalOpen] = useState(false)
  const [checked, setChecked] = useState(null)
  const themes = ['System Default', 'Light', 'Dark']
  const dispatch = useDispatch()

  useEffect(() => {
    // Fetch Theme from Local Storage
    AsyncStorage.getItem('theme').then((value) => {
      if (value === null) {
        setChecked('System Default')
      } else {
        setChecked(value)
      }
    })

    // Set to the checked state
  }, [])

  console.log(checked, 'colorrrrr')

  const onThemeSelectHandler = async (theme) => {
    dispatch(setTheme(theme))
    setChecked(theme)

    // Local Storage Set
    await AsyncStorage.setItem('theme', theme)

    setThemeModalOpen(false)

    // Logic for changing theme....
  }

  return (
    <View>
      <SettingsRowBlock
        onPress={() => setThemeModalOpen(true)}
        icon={'theme-light-dark'}
        label="Theme"
        value={
          checked
          //   !loading
          //     ? languages?.find((lang) => lang._id === checked)?.name || 'English'
          //     : ''
        }
      />
      {/* <Switch value={isSwitchOn} onValueChange={onToggleSwitch} /> */}

      <Modal
        setVisible={setThemeModalOpen}
        visible={themeModalOpen}
        actions={
          <>
            <Button
              onPress={() => {
                setThemeModalOpen(false)
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
            onValueChange={(value) => onThemeSelectHandler(value)}
            value={checked}
          >
            {themes?.map((cur, i) => (
              <TouchableOpacity
                key={i}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: spacing.sm,
                }}
                onPress={() => onThemeSelectHandler(cur)}
              >
                <RadioButton value={cur} />
                <Spacer direction="row" space="sm" />
                <NormalText color="dark" fontFamily="semiBold" fontSize="body1">
                  {cur}
                </NormalText>
              </TouchableOpacity>
            ))}
          </RadioButton.Group>
        </ScrollView>
      </Modal>
    </View>
  )
}

export default ThemeSettings

const styles = StyleSheet.create({})
