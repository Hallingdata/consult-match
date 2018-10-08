import * as React from "react"
import { StyleRulesCallback, withStyles, TextField } from "@material-ui/core"
import { Typography, Button } from "@material-ui/core"

type Props = {
  job: Job
  jobHash: string
}

const JobView: React.SFC<Props & { classes: StyleClassNames }> = ({
  job,
  jobHash,
}) => {
  const {
    title,
    description,
    location,
    email,
    phone,
    whisperEmployerPublicKey,
  } = job
  return (
    <>
      <Typography variant="headline">{title}</Typography>
      <Typography variant="subheading">{location}</Typography>
      <Typography>{description}</Typography>
      <Typography variant="subheading">Contact</Typography>
      <Typography>Email: {email}</Typography>
      <Typography>Phone: {phone}</Typography>
      Job Hash: {jobHash}
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
