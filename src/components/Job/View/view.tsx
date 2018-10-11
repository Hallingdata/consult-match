import * as React from "react"
import {
  StyleRulesCallback,
  withStyles,
  TextField,
  Chip,
} from "@material-ui/core"
import { Typography, Button } from "@material-ui/core"

type Props = {
  job: Job
  jobHash: string
  myDefaultAddress: string
  markeJobComplete: (jobIndex: number) => void
}

const JobView: React.SFC<Props & { classes: StyleClassNames }> = ({
  job,
  jobHash,
  myDefaultAddress,
  markeJobComplete,
}) => {
  const { title, description, location, email, phone, owner, done } = job
  return (
    <>
      {job.done ? (
        <Chip label="This job is no longer active" color="secondary" />
      ) : null}
      <Typography variant="headline">{title}</Typography>
      <Typography variant="subheading">{location}</Typography>
      <Typography>{description}</Typography>
      <Typography variant="subheading">Contact</Typography>
      <Typography>Email: {email}</Typography>
      <Typography>Phone: {phone}</Typography>
      Job Hash: {jobHash}
      {owner == myDefaultAddress ? (
        <Button onClick={() => markeJobComplete(job.jobIndex)}>
          Marke job as complete
        </Button>
      ) : null}
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
