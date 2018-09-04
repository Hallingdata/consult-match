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
      <Link to="/oppdrag" className={classes.link}>
        <Button color="inherit">Finn oppdrag</Button>
      </Link>
      <Link to="/konsulenter" className={classes.link}>
        <Button color="inherit">Finn konsulent</Button>
      </Link>
      <Link to="/nytt-oppdrag" className={classes.link}>
        <Button color="inherit">Legg ut oppddrag</Button>
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
