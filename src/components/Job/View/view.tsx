import * as React from "react"
import {
  TextField,
  Chip,
  withStyles,
  Theme,
  WithStyles,
  createStyles,
} from "@material-ui/core"
import { Typography, Button } from "@material-ui/core"
import WarningIcon from "@material-ui/icons/Warning"

interface Props extends WithStyles<typeof styles> {
  job: Job
  jobHash: string
  myDefaultAddress: string
  markeJobComplete: (jobIndex: number) => void
}

const JobView: React.SFC<Props> = ({
  job,
  jobHash,
  myDefaultAddress,
  markeJobComplete,
}) => {
  const { title, description, location, email, phone, owner, done } = job
  return (
    <>
      {job.done ? (
        <Chip
          label="position filled"
          color="secondary"
          icon={<WarningIcon />}
        />
      ) : null}
      <Typography variant="h5">{title}</Typography>
      <Typography variant="subtitle1">{location}</Typography>
      <Typography>{description}</Typography>
      <Typography variant="subtitle1">Contact</Typography>
      <Typography>Email: {email}</Typography>
      <Typography>Phone: {phone}</Typography>
      {owner === myDefaultAddress && !job.done ? (
        <Button onClick={() => markeJobComplete(job.jobIndex)}>
          Marke job as complete
        </Button>
      ) : null}
    </>
  )
}

const styles = ({  }: Theme) =>
  createStyles({
    className: {
      width: 100,
    },
  })

export default withStyles(styles)(JobView)
