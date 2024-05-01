/* eslint-disable react/prop-types */
import { StatusBar, StyleSheet, View } from 'react-native'
import React, { memo, useState } from 'react'
import Heading from '../../components/common/Heading'
import { Button, IconButton, useTheme } from 'react-native-paper'
import { spacing } from '../../utils/UIRules/spacing'
import Modal from '../../components/common/Modal'
import Calendar from '../../components/common/Calendar'
import { colors } from '../../utils/UIRules/colors'
import FixtureSection from './FixtureSection'
import moment from 'moment'

const FixtureHeader = ({ setTabData, tabData, onDone }) => {
  const theme = useTheme()

  const [visibleModal, setVisibleModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(false)
  // const [selectedCalendarDate, setSelectedCalendarDate] = useState(null)

  return (
    <>
      <View
        style={[
          styles.fixtureHeaderContainer,
          { backgroundColor: theme.colors.secondaryBg },
        ]}
      >
        <View>
          {/* <Heading text={'Fixture'} type="h4" /> */}
          <Heading
            text={'Fixture'}
            type="h4"
            // searchEnabled
            // searchPlaceHolder="Search All Teams"
            rightContent={
              <IconButton
                icon={'calendar-text'}
                size={28}
                onPress={() => setVisibleModal(true)}
              />
            }
            // onSearchTextSubmit={() => {}}
            // onSearchClearBtnPressed={() => {}}
          />
        </View>

        {/* <View style={styles.icons}>


          <IconButton
            icon={'magnify'}
            size={28}
            onPress={() => setVisibleModal(true)}
          />
          <IconButton
            icon={'calendar-text'}
            size={28}
            onPress={() => setVisibleModal(true)}
          />
        </View> */}
      </View>
      <Modal
        setVisible={setVisibleModal}
        visible={visibleModal}
        actions={
          <>
            <Button
              onPress={() => {
                setVisibleModal(false)
              }}
              textColor={colors.danger}
            >
              Cancel
            </Button>

            <Button
              onPress={() => {
                setVisibleModal(false)
                onDone(selectedDate)
              }}
              disabled={!selectedDate}
            >
              Done
            </Button>
          </>
        }
      >
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </Modal>
    </>
  )
}

export default memo(FixtureHeader)

const styles = StyleSheet.create({
  fixtureHeaderContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    paddingLeft: spacing.md,

    // paddingTop: StatusBar.currentHeight - 10,
    // transform: [{ translateY: StatusBar.currentHeight }],
    // paddingHorizontal: spacing.md,
    // paddingTop: spacing.md,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: spacing.md,
  },
})
