import * as React from "react"
import {
  TextField,
  Chip,
  withStyles,
  Theme,
  Card,
  CardContent,
  CardActions,
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
  classes,
}) => {
  const { title, description, location, email, phone, owner, done } = job
  return (
    <Card className={classes.card}>
      <CardContent>
        {job.done ? (
          <Chip
            className={classes.skill}
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
      </CardContent>
      {owner === myDefaultAddress && !job.done ? (
        <CardActions>
          <Button onClick={() => markeJobComplete(job.jobIndex)}>
            Marke job as complete
          </Button>
        </CardActions>
      ) : null}
    </Card>
  )
}

const styles = ({  }: Theme) =>
  createStyles({
    className: {
      width: 100,
    },
    card: {
      maxWidth: 900,
      margin: "auto",
      marginTop: 150,
    },
    skill: {
      margin: 5,
    },
  })

export default withStyles(styles)(JobView)
