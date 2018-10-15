import {
  Chip,
  Typography,
  withStyles,
  Theme,
  createStyles,
  WithStyles,
  Button,
} from "@material-ui/core"
import * as R from "ramda"
import * as React from "react"

interface Props extends WithStyles<typeof styles> {
  consultant: Consultant
  myDefaultAddress: string
  getImageLink: (hash: string | undefined) => string
  removeConsultantProfile: (consultantIndex: number) => void
}

const ConsultantProfile: React.SFC<Props> = ({
  consultant,
  getImageLink,
  myDefaultAddress,
  removeConsultantProfile,
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
    owner,
    isRemoved,
    consultantIndex,
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
      {owner === myDefaultAddress && !isRemoved ? (
        <Button
          onClick={() => removeConsultantProfile(consultantIndex as number)}
        >
          Remove profile
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
    profilePicture: {
      borderRadius: "50%",
      objectFit: "cover",
      width: 230,
      height: 230,
    },
  })

export default withStyles(styles)(ConsultantProfile)
