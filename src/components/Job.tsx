import * as React from "react"
import { StyleRulesCallback, withStyles } from "@material-ui/core"
import {Typography, Button} from "@material-ui/core"

type Props = {
  job: Job
}

const JobView: React.SFC<Props & { classes: StyleClassNames }> = ({ job }) => {
  const { title, description, location } = job
  return (
    <>
      <Typography variant="headline">{title}</Typography>
      <Typography variant="subheading">{location}</Typography>
      <Typography>{description}</Typography>
      <Button>Kontakt</Button>
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
