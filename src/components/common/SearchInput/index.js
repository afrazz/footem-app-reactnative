// /* eslint-disable react/prop-types */

// const SearchInput = ({ placeholder = 'Search', ...props }) => {
//   // const [searchQuery, setSearchQuery] = React.useState('')

//   // const onChangeSearch = (query) => setSearchQuery(query)

//   return (
//     <Searchbar
//       placeholder={placeholder}
//       {...props}
//       inputStyle={{
//         fontFamily: fontFamily.fontFamily,
//         fontSize: fontSizes.body1,
//       }}
//       style={{
//         backgroundColor: colors.white,
//         elevation: 2,
//         borderRadius: spacing.md,
//         fontFamily: fontFamily.fontBold,
//         width: '98%',
//         marginLeft: 4,
//       }}
//       placeholderTextColor={colors.bodyCopy}
//     />
//   )
// }

// export default SearchInput
import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Searchbar, Text, useTheme } from 'react-native-paper'
// import Animated, {
//   Easing,
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
// } from 'react-native-reanimated'
import { colors } from '../../../utils/UIRules/colors'
import { spacing } from '../../../utils/UIRules/spacing'
import fontFamily from '../../../utils/UIRules/fontFamily'
import { fontSizes } from '../../../utils/UIRules/fontSize'
import FullScreenLoader from '../FullScreenLoader'
import Spacer from '../Spacer'

const SearchInput = ({
  placeholder = 'Search',
  onChangeText,
  value,
  suggestions,
  searchLoading,
  ...props
}) => {
  const theme = useTheme()
  // const [searchQuery, setSearchQuery] = React.useState('')

  // const onChangeSearch = (query) => setSearchQuery(query)

  // const [query, setQuery] = useState('')
  // const [showSuggestions, setShowSuggestions] = useState(false)

  // const translateX = useSharedValue(0)
  // const transitionDuration = 250

  // const animateOnChange = (isSuggestionAvailable) => {
  //   // setQuery(newQuery)
  //   // setShowSuggestions(newQuery.length > 0)

  //   // Calculate target width based on the query length
  //   const targetWidth = isSuggestionAvailable ? 100 : 0

  //   // Animate suggestion dropdown width
  //   translateX.value = withTiming(targetWidth, {
  //     duration: transitionDuration,
  //     easing: Easing.inOut(Easing.ease),
  //   })
  // }

  // const animatedStyle = useAnimatedStyle(() => {
  //   return {
  //     width: `${translateX.value}%`,
  //   }
  // })

  // useEffect(() => {
  //   if (suggestions) {
  //     animateOnChange(true)
  //   } else {
  //     animateOnChange(false)
  //   }
  // }, [suggestions])

  console.log(suggestions)

  return (
    <View>
      <View style={{ position: 'relative' }}>
        {/* <Searchbar
          placeholder="Search"
          value={query}
          onChangeText={handleQueryChange}
        /> */}
        <Searchbar
          onChangeText={async (text) => {
            onChangeText(text)
          }}
          value={value}
          placeholder={placeholder}
          inputStyle={{
            fontFamily: fontFamily.fontFamily,
            fontSize: fontSizes.body1,
          }}
          style={{
            backgroundColor: theme.colors.secondaryBg,
            elevation: 2,
            borderRadius: spacing.md,
            fontFamily: fontFamily.fontBold,
            width: '98%',
            marginLeft: 4,
          }}
          placeholderTextColor={colors.bodyCopy}
          {...props}
        />

        {(searchLoading || suggestions) && (
          // , animatedStyle
          // <Animated.View
          <View
            style={[
              styles.suggestions,
              { backgroundColor: theme.colors.secondaryBg },
            ]}
          >
            {/* Render suggestion items */}
            {/* For example: */}

            {searchLoading ? (
              <>
                <Spacer space="xl" />
                <FullScreenLoader />
                <Spacer space="xl" />
              </>
            ) : (
              suggestions
            )}
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  // container: {
  //   padding: 16,
  // },
  suggestions: {
    // position: 'absolute',
    // top: 50,
    // zIndex: 1000,
    marginTop: spacing.md,
    // backgroundColor: 'white',
    elevation: 3,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: '100%',
    // overflow: 'hidden', // Ensure the content doesn't overflow
  },
})

export default SearchInput
