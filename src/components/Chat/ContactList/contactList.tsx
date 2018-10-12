import {
  List,
  ListItem,
  ListItemText,
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from "@material-ui/core"
import * as R from "ramda"
import * as React from "react"

interface Props extends WithStyles<typeof styles> {
  contacts: { contact: string; jobHash: string }[]
  openChat: (jobHash: string, contact: string) => void
}

const ChatContactList: React.SFC<Props> = ({ contacts, openChat, classes }) => {
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

const styles = ({  }: Theme) =>
  createStyles({
    className: {
      width: 100,
    },
    message: {},
  })

export default withStyles(styles)(ChatContactList)
