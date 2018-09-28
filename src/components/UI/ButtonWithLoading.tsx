import * as React from "react"
import {
  Button,
  CircularProgress,
  StyleRulesCallback,
  withStyles,
} from "@material-ui/core"
import * as R from "ramda"
import green from "@material-ui/core/colors/green"

type Props = {
  loading: boolean
} & any

const ButtonWithLoading: React.SFC<
  Props & { classes: StyleClassNames }
> = props => (
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

type StyleClassNames = {
  className: string
  buttonProgress: string
  wrapper: string
}

const styles: StyleRulesCallback = theme => ({
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

export default withStyles(styles)<Props>(ButtonWithLoading)
