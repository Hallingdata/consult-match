import {
  List,
  ListItem,
  ListItemText,
  StyleRulesCallback,
  withStyles,
} from "@material-ui/core"
import * as R from "ramda"
import * as React from "react"

type Props = {
  contacts: { contact: string; jobHash: string }[]
  openChat: (jobHash: string, contact: string) => void
}

const ChatContactList: React.SFC<Props & { classes: StyleClassNames }> = ({
  contacts,
  openChat,
  classes,
}) => {
  console.log("contact list")
  console.log(contacts)
  return (
    <>
      <List>
        {R.map(
          ({ contact, jobHash }) => (
            <ListItem
              key={contact + "-" + jobHash}
              button
              onClick={() => openChat(jobHash, contact)}
            >
              <ListItemText key={`constact-${contact}`} primary={contact} />
            </ListItem>
          ),
          contacts
        )}
      </List>
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

export default withStyles(styles)<Props>(ChatContactList)
