import * as React from "react"
import {
  withStyles,
  Typography,
  Theme,
  WithStyles,
  createStyles,
  Card,
  CardActions,
  Button,
  CardContent,
} from "@material-ui/core"

interface Props extends WithStyles<typeof styles> {}

const Home: React.SFC<Props> = ({ classes }) => {
  return (
    <>
      <Typography variant="h2" className={classes.header}>
        Open marketplace for consultants
      </Typography>
      <Card className={classes.card}>
        <CardContent>
          <Typography>
            The consult-match platform is developed as an example of how
            blockchain technology can be used in practice.
          </Typography>
          <Typography component="div">
            The platform consists of:
            <ol>
              <li>The ability for employers to post jobs.</li>
              <li>The ability for consultants to publish their profile.</li>
            </ol>
            Then people can browse jobs and possible get in contact with
            employers. And employers can browse consultant profiles and get in
            contact if they find a good match.
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="outlined"
            href="https://github.com/Hallingdata/consult-match"
            target="_blank"
          >
            Check out the code on GitHub
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

const styles = ({  }: Theme) =>
  createStyles({
    header: {
      marginTop: 100,
      textAlign: "center",
    },
    card: {
      maxWidth: 700,
      margin: "auto",
      marginTop: 100,
    },
  })

export default withStyles(styles)(Home)
