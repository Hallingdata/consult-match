import * as React from "react"
import * as R from "ramda"
import {
  StyleRulesCallback,
  withStyles,
  List,
  ListItem,
  ListItemText,
  TextField,
  Theme,
  createStyles,
  WithStyles,
} from "@material-ui/core"

interface Props extends WithStyles<typeof styles> {
  messages: ChatMessage[]
  sendMessage: (message: string) => void
}

const Chat: React.SFC<Props> = ({ messages = [], sendMessage, classes }) => {
  let message = ""

  const handleEnter = (event: any) => {
    if (!R.isNil(message) && !R.isEmpty(message)) {
      sendMessage(message)
    }
  }

  const onChange = (event: any) => {
    message = event.target.value
  }

  return (
    <>
      <List>
        {R.map(
          ({ sender, content }) => (
            <ListItem>
              <ListItemText
                key={content}
                primary={content}
                secondary={sender}
              />
            </ListItem>
          ),
          messages
        )}
      </List>
      {/* {R.empty(messages) ? null : ( */}
      <TextField
        id="message"
        label="Message"
        className={classes.message}
        margin="normal"
        onChange={onChange}
        onKeyPress={R.when(event => event.key === "Enter", handleEnter)}
      />
    </>
  )
}

const styles = ({  }: Theme) =>
  createStyles({
    className: {
      width: 100,
    },
    message: {},
  })

export default withStyles(styles)(Chat)
