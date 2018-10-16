import {
  Chip,
  Typography,
  Card,
  CardContent,
  CardActions,
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
    <Card className={classes.card}>
      <img
        src={getImageLink(imageHash)}
        alt="Consultant picture"
        className={classes.profilePicture}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="subtitle1">{company}</Typography>
        {R.map(
          skill => (
            <Chip
              className={classes.skill}
              key={`skill-${skill}`}
              label={skill}
            />
          ),
          skills
        )}
        <Typography>{description}</Typography>
        <Typography>Email: {email}</Typography>
        <Typography>Phone: {phone}</Typography>
      </CardContent>
      {owner === myDefaultAddress && !isRemoved ? (
        <CardActions>
          <Button
            onClick={() => removeConsultantProfile(consultantIndex as number)}
          >
            Remove profile
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
    profilePicture: {
      borderRadius: "50%",
      objectFit: "cover",
      width: 230,
      height: 230,
      position: "absolute",
      left: 0,
      right: 0,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "-120px",
    },
    cardContent: {
      marginTop: 120,
      textAlign: "center",
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

export default withStyles(styles)(ConsultantProfile)
