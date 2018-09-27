import * as React from "react"
import * as R from "ramda"
import {
  StyleRulesCallback,
  withStyles,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@material-ui/core"

type Props = {
  messages: ChatMessage[]
  sendMessage: (message: string) => void
}

const Chat: React.SFC<Props & { classes: StyleClassNames }> = ({
  messages = [],
  sendMessage,
  classes,
}) => {
  const messageRef = React.createRef()

  const handleEnter = (event: any) => {
    console.log(`message: ${(messageRef as any).current}`)
    const message: string | undefined = R.compose(
      R.trim,
      R.path(["current", "value"])
    )(messageRef)

    if (!R.isNil(message) && !R.isEmpty(message)) {
      sendMessage(message)
    }
  }

  return (
    <>
      <List>
        {R.map(
          ({ from, content }) => (
            <ListItem>
              <ListItemText primary={content} secondary={from} />
            </ListItem>
          ),
          messages
        )}
      </List>
      <TextField
        id="message"
        label="Message"
        className={classes.message}
        inputRef={messageRef}
        margin="normal"
        onKeyPress={R.when(event => event.key === "Enter", handleEnter)}
      />
    </>
  )
}

type StyleClassNames = {
  className: string
  message: string
}

const styles: StyleRulesCallback = theme => ({
  className: {
    width: 100,
  },
  message: {},
})

export default withStyles(styles)<Props>(Chat)
