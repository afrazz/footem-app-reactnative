/* eslint-disable react/prop-types */
import React from 'react'
import { Image } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'
import { Button } from 'react-native-paper'

const Skip = ({ ...props }) => (
  <Button textColor="#000" {...props}>
    Skip
  </Button>
)
const Next = (props) => (
  <Button textColor="#000" {...props}>
    Next
  </Button>
)

const Done = (props) => (
  <Button textColor="#000" {...props}>
    Done
  </Button>
)

// const Dots = ({ selected }) => {
//   let backgroundColor

//   backgroundColor = selected ? 'rgba(0,0,0, 0.8)' : 'rgba(0,0,0, 0.3)'

//   return (
//     <View
//       style={{
//         width: 5,
//         height: 5,
//         marginHorizontal: 3,
//         backgroundColor,
//         borderRadius: '50%',
//       }}
//     ></View>
//   )
// }

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.navigate('Login')}
      pages={[
        {
          backgroundColor: '#0EBD60',
          image: (
            <Image
              source={require('../../../assets/onboard-1.png')}
              style={{ height: 200, width: 200 }}
            />
          ),
          title: 'Onboarding 1',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#fdeb93',
          image: (
            <Image
              source={require('../../../assets/onboard-2.png')}
              style={{ height: 200, width: 200 }}
            />
          ),
          title: 'Onboarding 2',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#e9bcbe',
          image: (
            <Image
              source={require('../../../assets/onboard-3.png')}
              style={{ height: 200, width: 200 }}
            />
          ),
          title: 'Onboarding 3',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
      ]}
    />
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// })

export default OnboardingScreen
