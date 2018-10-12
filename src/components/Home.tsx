import * as React from "react"
import {
  withStyles,
  Typography,
  Theme,
  WithStyles,
  createStyles,
} from "@material-ui/core"

interface Props extends WithStyles<typeof styles> {}

const Home: React.SFC<Props> = ({ classes }) => {
  return (
    <>
      <Typography variant="h2" className={classes.header}>
        Open marketplace for consultants
      </Typography>
    </>
  )
}

const styles = ({  }: Theme) =>
  createStyles({
    header: {
      marginTop: 100,
      textAlign: "center",
    },
  })

export default withStyles(styles)(Home)
