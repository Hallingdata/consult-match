import * as React from "react"
import { StyleRulesCallback, withStyles, TextField} from "@material-ui/core"
import { Typography, Button } from "@material-ui/core"
import Chat from "../containers/Chat"
import * as Whisper from "../integrations/whisper";

type Props = {
  job: Job
  jobHash: string
  subscribe: (keyId: any | null) => void
}

const JobView: React.SFC<Props & { classes: StyleClassNames }> = ({ job, jobHash, subscribe }) => {
  const keyIdRef = React.createRef()
  const { title, description, location, whisperEmployerPublicKey } = job
  const doSubscribe = () => {
    subscribe((keyIdRef as any).current.value)
  }
  return (
    <>
      <Typography variant="headline">{title}</Typography>
      <Typography variant="subheading">{location}</Typography>
      <Typography>{description}</Typography>
      <TextField
        id="keyId"
        label="keyId"
        inputRef={keyIdRef}
        margin="normal"
      />
      <Button onClick={doSubscribe}>Subscribe</Button>
      <Typography variant="headline">Chat</Typography>
      <Chat jobHash={jobHash} publicKey={whisperEmployerPublicKey}/>
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
