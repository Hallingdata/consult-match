import * as React from "react"
import { StyleRulesCallback, withStyles, Typography } from "@material-ui/core"

type Props = {
  consultant: Consultant
}

const ConsultantProfile: React.SFC<Props & { classes: StyleClassNames }> = ({
  consultant,
  classes,
}) => {
  return (
    <>
      <Typography variant="headline">{consultant.name}</Typography>
      <Typography variant="subheading">{consultant.company}</Typography>
      <Typography variant="caption">{consultant.skills}</Typography>
      <Typography>{consultant.description}</Typography>
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

export default withStyles(styles)<Props>(ConsultantProfile)
