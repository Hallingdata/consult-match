import * as React from "react"
import * as R from "ramda"
import {
  StyleRulesCallback,
  withStyles,
  Typography,
  Chip,
} from "@material-ui/core"

type Props = {
  consultant: Consultant
}

const ConsultantProfile: React.SFC<Props & { classes: StyleClassNames }> = ({
  consultant,
  classes,
}) => {
  const { name, company, skills, description } = consultant
  return (
    <>
      <Typography variant="headline">{name}</Typography>
      <Typography variant="subheading">{company}</Typography>
      {R.map(
        skill => (
          <Chip key={`skill-${skill}`} label={skill} />
        ),
        skills
      )}
      <Typography>{description}</Typography>
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
