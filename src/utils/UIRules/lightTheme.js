import { configureFonts, MD3LightTheme } from 'react-native-paper'
import { colors } from './colors'
import fontConfig from './fontFamily'

const lightTheme = {
  ...MD3LightTheme,
  fonts: configureFonts({ config: fontConfig }),
  myOwnProperty: true,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    accent: colors.secondary,
    text: colors.dark,
    placeholder: colors.gray4,
    outline: colors.gray4,
    background: colors.white,
    secondaryBg: colors.white,
    bodyCopy: colors.bodyCopy,
    greyishBg: '#f5f5f5',
  },
}

export default lightTheme
