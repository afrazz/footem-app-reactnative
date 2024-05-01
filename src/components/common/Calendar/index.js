// /* eslint-disable react/prop-types */
// import React from 'react'
// import { Calendar as RNCalendar } from 'react-native-calendars'
// import { colors } from '../../../utils/UIRules/colors'
// import { useState } from 'react'
// import moment from 'moment'

// const Calendar = ({ selectedDate, setSelectedDate }) => {
//   return (
//     <RNCalendar
//       theme={{
//         arrowColor: colors.primary,
//         dotColor: colors.primary,
//         indicatorColor: colors.primary,
//         selectedDayBackgroundColor: colors.primary,
//         todayTextColor: colors.primary,
//       }}
//       onDayPress={(day) => {
//         setSelectedDate(day.dateString)
//       }}
//       markedDates={{
//         [selectedDate]: {
//           selected: true,
//           disableTouchEvent: true,
//         },
//       }}
//     />
//   )
// }

// export default Calendar
import React from 'react'
import { Calendar as RNCalendar } from 'react-native-calendars'
import { colors } from '../../../utils/UIRules/colors'
import { useState } from 'react'
import moment from 'moment'
import { useTheme } from 'react-native-paper'

const Calendar = ({ selectedDate, setSelectedDate }) => {
  const today = moment().format('YYYY-MM-DD')
  const theme = useTheme()

  const markedDates = {
    [selectedDate]: {
      selected: true,
      disableTouchEvent: true,
    },
    [today]: {
      disableTouchEvent: true,
      disableNavigation: true,
    },
  }

  return (
    <RNCalendar
      theme={{
        arrowColor: colors.primary,
        dotColor: colors.primary,
        indicatorColor: colors.primary,
        selectedDayBackgroundColor: colors.primary,
        todayTextColor: colors.primary,
        // backgroundColor: 'red',
        calendarBackground: theme.colors.background,
        // contentStyle: { backgroundColor: 'red' },
        textDayStyle: { color: theme.colors.text },
        // agendaDayNumColor: 'red',
        monthTextColor: theme.colors.text,
        // todayBackgroundColor: 'blue',
      }}
      // style={{ backgroundColor: 'red' }}
      onDayPress={(day) => {
        setSelectedDate(day.dateString)
      }}
      markedDates={markedDates}
    />
  )
}

export default Calendar
