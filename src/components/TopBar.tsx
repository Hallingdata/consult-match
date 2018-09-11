import * as React from "react"
import { SFC } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  StyleRulesCallback,
  withStyles,
  Button,
} from "@material-ui/core"
import { Link } from "react-router-dom"

type Props = {
  title: string
}
type AllProps = Props & { classes: StyleClassNames }

const TopBar: SFC<AllProps> = ({ classes, title }) => (
  <AppBar position="absolute" className={classes.appBar}>
    <Toolbar>
      <Link to="/" className={classes.logo}>
        <Typography
          variant="title"
          color="inherit"
          noWrap={true}
        >
          {title}
        </Typography>
      </Link>
      <Link to="/new-job" className={classes.link}>
        <Button color="inherit">Post Job</Button>
      </Link>
      <Link to="/consultant" className={classes.link}>
        <Button color="inherit">Find Consultant</Button>
      </Link>
      <Link to="/job" className={classes.link}>
        <Button color="inherit">Find Job</Button>
      </Link>
      <Link to="/new-consultant" className={classes.link}>
        <Button color="inherit">Register as Consultant</Button>
      </Link>
    </Toolbar>
  </AppBar>
)

type StyleClassNames = {
  root: string
  logo: string
  flex: string
  link: string
  appBar: string
}

const styles: StyleRulesCallback = theme => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit",
  },
  flex: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
})

export default withStyles(styles)<Props>(TopBar)
