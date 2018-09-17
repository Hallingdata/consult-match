import * as React from "react"
import * as R from "ramda"
import {
  StyleRulesCallback,
  withStyles,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core"

type Props = {
  message: ChatMessage[]
}

const Chat: React.SFC<Props & { classes: StyleClassNames }> = ({message, classes}) => {
  return (
    <List>
      {R.map(({from, content}) => 
        <ListItem>
          <ListItemText
            primary={content}
            secondary={from}
          />
        </ListItem>
      , message)}
    </List>
  )
}

type StyleClassNames = {
  className: string
}

const styles: StyleRulesCallback = theme => ({
  className: {
    width: 100,
  },
})

export default withStyles(styles)<Props>(Chat)

type ChatMessage = {
  from: string
  content: string
  timestamp: number
}
