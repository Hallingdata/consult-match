import purple from "@material-ui/core/colors/purple"
import green from "@material-ui/core/colors/green"
import { createMuiTheme } from "@material-ui/core"

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  spacing: {
    unit: 20,
  },
  palette: {
    primary: {
      main: "#2c4b56",
      //     main: "#00BCD4",
      contrastText: "#fafafa",
    },
    secondary: {
      // main: "#FFEB3B",
      main: "#ffa800",
      contrastText: "#1a1a1a",
    },
  },
})

export default theme

/**
 * 42a5f5
 */
