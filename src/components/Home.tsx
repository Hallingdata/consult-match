import * as React from "react"
import { StyleRulesCallback, withStyles, Typography } from "@material-ui/core"

type Props = {}

const Home: React.SFC<Props & { classes: StyleClassNames }> = ({ classes }) => {
  return (
    <>
      <Typography variant="display3" className={classes.header}>
        Åpen markedsplass for konsulenter
      </Typography>
    </>
  )
}

type StyleClassNames = {
  header: string
}

const styles: StyleRulesCallback = theme => ({
  header: {
    marginTop: 100,
    textAlign: "center",
  },
})

export default withStyles(styles)<Props>(Home)
