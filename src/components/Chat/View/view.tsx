import {
  List,
  ListItem,
  ListItemText,
  Grid,
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from "@material-ui/core"
import * as R from "ramda"
import * as React from "react"
import ContactList from "../ContactList"
import Messaging from "../Messaging/index"

interface Props extends WithStyles<typeof styles> {
  match?: any
}

const ChatView: React.SFC<Props> = ({ classes, match }) => (
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

const styles = ({  }: Theme) => createStyles({})

export default withStyles(styles)(ChatView)
