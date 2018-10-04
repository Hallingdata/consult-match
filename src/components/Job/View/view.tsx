import * as React from "react"
import { StyleRulesCallback, withStyles, TextField } from "@material-ui/core"
import { Typography, Button } from "@material-ui/core"
import Chat from "../../Chat/Messaging"
import * as Whisper from "../../../integrations/whisper"

type Props = {
  job: Job
  jobHash: string
  openChat: (jobHash: string, whisperEmployerPublicKey: string) => void
}

const JobView: React.SFC<Props & { classes: StyleClassNames }> = ({
  job,
  jobHash,
  openChat,
}) => {
  const { title, description, location, whisperEmployerPublicKey } = job
  return (
    <>
      <Typography variant="headline">{title}</Typography>
      <Typography variant="subheading">{location}</Typography>
      <Typography>{description}</Typography>
      <Typography variant="headline">Chat</Typography>
      {jobHash}
      <Button onClick={() => openChat(jobHash, whisperEmployerPublicKey)}>
        Chat
      </Button>
    </>
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

export default withStyles(styles)<Props>(JobView)
