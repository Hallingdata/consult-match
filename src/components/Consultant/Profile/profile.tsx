import * as React from "react"
import * as R from "ramda"
import {
  StyleRulesCallback,
  withStyles,
  Typography,
  Chip,
} from "@material-ui/core"

type Props = {
  consultant: Consultant,
  getImageLink: (hash: string | undefined) => string
}

const ConsultantProfile: React.SFC<Props & { classes: StyleClassNames }> = ({
  consultant,
getImageLink,
  classes,
}) => {
  const { name, company, skills, description, imageHash } = consultant
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
      <img src={getImageLink(imageHash)} alt="Consultant picture" className={classes.profilePicture}/>
    </>
  )
}

type StyleClassNames = {
  className: string
  profilePicture: string
}

const styles: StyleRulesCallback = theme => ({
  className: {
    width: 100,
  },
  profilePicture: {
    borderRadius: "50%",
    objectFit: "cover",
    width: 230,
    height: 230,
  }
})

export default withStyles(styles)<Props>(ConsultantProfile)
