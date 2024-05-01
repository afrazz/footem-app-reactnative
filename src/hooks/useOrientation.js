import { useFocusEffect } from '@react-navigation/native'
import React from 'react'
import { useEffect, useState } from 'react'
import { Alert, Dimensions } from 'react-native'

export function useOrientation() {
  const [orientation, setOrientation] = useState('PORTRAIT')

  const updateOrientation = ({ window: { width, height } }) => {
    if (width < height) {
      setOrientation('PORTRAIT')
    } else {
      setOrientation('LANDSCAPE')
    }
  }

  const getInitialOrientation = () => {
    let width = Dimensions.get('window').width
    let height = Dimensions.get('window').height

    if (width < height) {
      setOrientation('PORTRAIT')
    } else {
      setOrientation('LANDSCAPE')
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      getInitialOrientation()
      const dimensionsHandler = Dimensions.addEventListener(
        'change',
        updateOrientation
      )

      return () => {
        dimensionsHandler.remove()
        // Dimensions.removeEventListener('change', updateOrientation)
      }
    }, [])
  )

  return { orientation }
}
