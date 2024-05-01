import { configureFonts, MD3DarkTheme } from 'react-native-paper'
import { colors } from './colors'
import fontConfig from './fontFamily'

const darkTheme = {
  ...MD3DarkTheme,
  fonts: configureFonts({ config: fontConfig }),
  myOwnProperty: true,

  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.primary,
    accent: colors.secondary,
    text: colors.white,
    placeholder: colors.gray4,
    outline: colors.gray4,
    background: '#121212',
    secondaryBg: '#1E1E1E',
    bodyCopy: colors.gray3,
    greyishBg: '#121212',
    // background: colors.lightGray,
  },
}

export default darkTheme
