import purple from "@material-ui/core/colors/purple"
import green from "@material-ui/core/colors/green"
import { createMuiTheme } from "@material-ui/core"

const theme = createMuiTheme({
  spacing: {
    unit: 20,
  },
  palette: {
    primary: purple,
    secondary: green,
  },
})

export default theme
