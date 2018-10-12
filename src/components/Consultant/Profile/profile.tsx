import {
  Chip,
  Typography,
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from "@material-ui/core"
import * as R from "ramda"
import * as React from "react"

interface Props extends WithStyles<typeof styles> {
  consultant: Consultant
  getImageLink: (hash: string | undefined) => string
}

const ConsultantProfile: React.SFC<Props> = ({
  consultant,
  getImageLink,
  classes,
}) => {
  const {
    name,
    company,
    skills,
    description,
    imageHash,
    email,
    phone,
  } = consultant
  return (
    <>
      <Typography variant="h5">{name}</Typography>
      <Typography variant="subtitle1">{company}</Typography>
      {R.map(
        skill => (
          <Chip key={`skill-${skill}`} label={skill} />
        ),
        skills
      )}
      <Typography>{description}</Typography>
      <img
        src={getImageLink(imageHash)}
        alt="Consultant picture"
        className={classes.profilePicture}
      />
      <Typography>Email: {email}</Typography>
      <Typography>Phone: {phone}</Typography>
    </>
  )
}

const styles = ({  }: Theme) =>
  createStyles({
    className: {
      width: 100,
    },
    profilePicture: {
      borderRadius: "50%",
      objectFit: "cover",
      width: 230,
      height: 230,
    },
  })

export default withStyles(styles)(ConsultantProfile)
