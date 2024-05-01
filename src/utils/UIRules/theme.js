import { configureFonts, DefaultTheme } from 'react-native-paper'
import { colors } from './colors'
import fontConfig from './fontFamily'

const theme = {
  ...DefaultTheme,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.secondary,
    text: colors.dark,
    placeholder: colors.gray4,
    outline: colors.gray4,
    // background: colors.lightGray,
  },
}

export default theme
