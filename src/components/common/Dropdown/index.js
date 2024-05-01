import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Animated,
  Easing,
  Dimensions,
} from 'react-native'
import Icon from 'react-native-paper/src/components/Icon'
import { colors } from '../../../utils/UIRules/colors'
import { List, useTheme } from 'react-native-paper'
import { spacing } from '../../../utils/UIRules/spacing'
import NormalText from '../../NormalText'
import { Image } from 'react-native'
import plIcon from '../../../../assets/pl.png'
import Spacer from '../Spacer'

export default function DropDown({ options, value, setValue }) {
  const theme = useTheme()
  let deviceWidth = Dimensions.get('window').width
  const [isOpen, setIsOpen] = useState(false)

  const heightAnim = useState(new Animated.Value(0))[0]
  const widthAnim = useState(new Animated.Value(0))[0]

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  React.useEffect(() => {
    const easingType = isOpen ? Easing.easeOutCubic : Easing.easeInCubic

    Animated.parallel([
      Animated.timing(heightAnim, {
        toValue: isOpen ? 1 : 0,
        duration: 300,
        easing: easingType,
        useNativeDriver: false,
      }),
      Animated.timing(widthAnim, {
        toValue: isOpen ? 1 : 0,
        duration: 300,
        easing: easingType,
        useNativeDriver: false,
      }),
    ]).start()
  }, [heightAnim, isOpen, widthAnim])

  const interpolatedHeight = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, options.length * 56], // Assuming each item has a height of 56
  })

  const interpolatedWidth = widthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, deviceWidth - 60], // Initial width is 0, final width is 364
  })

  return (
    <View
      style={{
        position: 'relative',
        zIndex: 1000,
        backgroundColor: theme.colors.secondaryBg,
      }}
    >
      <TouchableOpacity
        onPress={toggleDropdown}
        style={styles.dropdownBox(deviceWidth, theme.colors.secondaryBg)}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{ uri: value?.image }}
            style={{
              height: 35,
              width: 35,
              resizeMode: 'contain',
              borderRadius: spacing.sm,
            }}
            //   {...props}
          />
          <Spacer space="sm" direction="row" />
          <NormalText fontSize={'body2'} fontFamily="bold">
            {value?.label}
          </NormalText>
        </View>

        <Icon source="chevron-down" color={theme.colors.text} size={25} />
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.menu,
          {
            height: interpolatedHeight,
            width: interpolatedWidth,
            backgroundColor: theme.colors.secondaryBg,
          },
          isOpen && styles.menuOpen,
        ]}
        pointerEvents={isOpen ? 'auto' : 'none'}
      >
        {options?.map((item) => (
          <List.Item
            // style={{ elevation: 4 }}
            onPress={() => {
              setValue(item)
              setIsOpen(false)
            }}
            style={{ paddingHorizontal: spacing.md, paddingTop: 0 }}
            key={item.id}
            title={
              <NormalText color="dark" fontSize={'body2'}>
                {item?.label}
              </NormalText>
            }
            left={(props) => (
              <Image
                source={{ uri: item.image }}
                style={{ height: 35, width: 35, resizeMode: 'contain' }}
              />
            )}
          />
        ))}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  dropdownBox: (width, bg) => ({
    backgroundColor: bg,
    width: width, //364
    alignSelf: 'center',
    flexDirection: 'row',
    height: 55,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    elevation: Platform.OS === 'android' ? 3 : 0,
    // marginVertical: 20,
    zIndex: 100,
    position: 'relative',
    marginTop: -5,
    borderBottomLeftRadius: spacing.sm,
    borderBottomRightRadius: spacing.sm,
  }),
  selectedText: {
    fontSize: 15,
  },
  menu: {
    position: 'absolute',
    // backgroundColor: '#fff',
    paddingVertical: 10,
    top: -5,
    zIndex: 100,
    elevation: 5,
    overflow: 'hidden',
  },
  menuOpen: {
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  option: {
    height: 20,
  },
})
