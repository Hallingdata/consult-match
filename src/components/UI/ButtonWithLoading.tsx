import * as React from "react"
import {
  Button,
  createStyles,
  CircularProgress,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core"
import * as R from "ramda"
import green from "@material-ui/core/colors/green"

interface Props extends WithStyles<typeof styles> {
  loading: boolean
}

/**
   Will take any prop and pass it to the child Button
**/
const ButtonWithLoading: React.SFC<Props & any> = props => (
  <div className={props.classes.wrapper}>
    <Button
      {...R.omit(["classes", "loading", "children"], props)}
      disabled={props.loading}
    >
      {props.children}
    </Button>
    {props.loading && (
      <CircularProgress size={24} className={props.classes.buttonProgress} />
    )}
  </div>
)

const styles = ({  }: Theme) =>
  createStyles({
    className: {
      width: 100,
    },
    buttonProgress: {
      color: green[500],
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
    wrapper: {
      position: "relative",
    },
  })

export default withStyles(styles)(ButtonWithLoading)
