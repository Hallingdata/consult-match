import * as React from "react"
import {
  StyleRulesCallback,
  withStyles,
  Snackbar,
  SnackbarContent,
} from "@material-ui/core"
import * as R from "ramda"

type Props = {
  message: string
  type: string
  open: boolean
  close: (event: any, reason: string) => void
}

const Notifications: React.SFC<Props & { classes: StyleClassNames }> = ({
  message,
  type,
  open,
  close,
  classes,
}) => {
  console.log(`open? ${open}`)
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={10000}
      onClose={close}
      ContentProps={{
        "aria-describedby": "message-id",
      }}
    >
      <SnackbarContent
        className={classes[type]}
        message={<span id="message-id">{message}</span>}
      />
    </Snackbar>
  )
}

type StyleClassNames = {
  error: string
  info: string
}

const styles: StyleRulesCallback = theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
})

export default withStyles(styles)<Props>(Notifications)
