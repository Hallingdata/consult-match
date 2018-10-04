import {
  List,
  ListItem,
  ListItemText,
  StyleRulesCallback,
  Grid,
  withStyles,
} from "@material-ui/core"
import * as R from "ramda"
import * as React from "react"
import ContactList from "../ContactList"
import Messaging from "../Messaging/index"

type Props = {
  match?: any
}

const ChatView: React.SFC<Props & { classes: StyleClassNames }> = ({
  classes,
  match,
}) => {
  return (
    <Grid container>
      <Grid item xs={4}>
        <ContactList />
      </Grid>
      <Grid item xs={8}>
        <Messaging
          jobHash={match.params.jobHash}
          employerWhisperPublicKey={match.params.senderPublicKey}
        />
      </Grid>
    </Grid>
  )
}

type StyleClassNames = {
  className: string
}

const styles: StyleRulesCallback = theme => ({})

export default withStyles(styles)<Props>(ChatView)
