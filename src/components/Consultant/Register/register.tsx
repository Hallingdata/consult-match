import * as React from "react"
import * as R from "ramda"
import Lottie from "react-lottie"
import * as animationData from "../../../animations/checked_done_.json"
import { Chip, StyleRulesCallback, withStyles, Grid } from "@material-ui/core"
import {
  DialogTitle,
  Dialog,
  TextField,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  CircularProgress,
  Theme,
  createStyles,
  WithStyles,
} from "@material-ui/core"
import ButtonWithLoading from "../../UI/ButtonWithLoading"
import FileUploadSwarm from "../../UI/FileUploadSwarm"

interface Props extends WithStyles<typeof styles> {
  registerConsultant: (consultant: Consultant) => void
  waitingForRegistration: boolean
  walletIsUnlocked: boolean
}

type State = {
  name: string
  company: string
  description: string
  email: string
  phone: string
  newSkill: string
  skills: string[]
  imageHash: string
  submitButtonClicked: boolean
}

class RegisterConsultant extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      name: "",
      description: "",
      company: "",
      email: "",
      phone: "",
      newSkill: "",
      imageHash: "",
      skills: [],
      submitButtonClicked: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (valueName: string) => (event: any) => {
    this.setState({ [valueName]: event.target.value } as any)
  }

  handleImageUploaded = (hash: string) => {
    this.setState({ imageHash: hash } as any)
  }

  skillHandleNew = (event: any) => {
    if (event.key === "Enter") {
      const skill = R.trim(this.state.newSkill)
      event.preventDefault()
      if (
        skill !== "" &&
        !R.empty(skill) &&
        !R.contains(skill, this.state.skills)
      ) {
        this.setState({
          skills: R.append(skill, this.state.skills),
          newSkill: "",
        })
      }
    }
  }

  skillHandleDelete = (skill: string) => (event: any) => {
    this.setState({
      skills: R.without([skill], this.state.skills),
    })
  }

  consultantFromState = (): Consultant =>
    R.pick<Consultant>(
      [
        "name",
        "company",
        "description",
        "skills",
        "imageHash",
        "email",
        "phone",
      ],
      this.state
    ) as Consultant

  handleSubmit(event: any) {
    event.preventDefault()
    this.props.registerConsultant(this.consultantFromState())
    if (!this.state.submitButtonClicked) {
      this.setState({
        submitButtonClicked: true,
      })
    }
  }

  render() {
    const defaultLottieOptions = {
      loop: false,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    }
    const { classes, walletIsUnlocked } = this.props
    console.log("wallet is unclocked: " + walletIsUnlocked)
    if (!walletIsUnlocked) {
      return (
        <Dialog open={true}>
          <DialogTitle>
            You need to unlock your wallet and refresh the browser in order to
            register
          </DialogTitle>
        </Dialog>
      )
    } else {
      return (
        <Card className={classes.card}>
          {!this.state.submitButtonClicked ||
          this.props.waitingForRegistration ? (
            <>
              <form onSubmit={this.handleSubmit}>
                <CardContent>
                  <Typography
                    variant="h5"
                    className={classes.headline}
                    gutterBottom
                  >
                    Register a new consultant profile.
                  </Typography>
                  <Grid container spacing={16}>
                    <Grid item xs={6}>
                      <TextField
                        className={classes.title}
                        id="name"
                        label="Name"
                        value={this.state.name}
                        onChange={this.handleChange("name")}
                        margin="normal"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        className={classes.company}
                        id="company"
                        label="Company"
                        value={this.state.company}
                        onChange={this.handleChange("company")}
                        margin="normal"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        className={classes.description}
                        id="description"
                        label="Description"
                        multiline
                        value={this.state.description}
                        onChange={this.handleChange("description")}
                        margin="normal"
                        rows={5}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {R.map(
                        skill => (
                          <Chip
                            key={`skill-${skill}`}
                            label={skill}
                            onDelete={this.skillHandleDelete(skill)}
                          />
                        ),
                        this.state.skills
                      )}
                      <TextField
                        className={classes.skill}
                        id="skill"
                        label="Skill"
                        value={this.state.newSkill}
                        onChange={this.handleChange("newSkill")}
                        onKeyPress={this.skillHandleNew}
                        margin="normal"
                        helperText="Press ENTER to add a skill"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        className={classes.email}
                        id="email"
                        label="Email"
                        value={this.state.email}
                        onChange={this.handleChange("email")}
                        margin="normal"
                        fullWidth
                        required
                        type="email"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        className={classes.phone}
                        id="phone"
                        label="Phone"
                        value={this.state.phone}
                        onChange={this.handleChange("phone")}
                        margin="normal"
                        fullWidth
                        type="tel"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h5">Upload picture</Typography>
                      <FileUploadSwarm
                        onUploadComplete={this.handleImageUploaded}
                        onUploadFailed={(res: any) =>
                          console.log("error: " + res)
                        }
                      />
                    </Grid>
                    <Grid item xs={12} />
                  </Grid>
                </CardContent>
                <CardActions>
                  <ButtonWithLoading
                    color="secondary"
                    variant="contained"
                    loading={this.state.submitButtonClicked}
                    type="submit"
                    value="Submit"
                  >
                    Register
                  </ButtonWithLoading>
                </CardActions>
              </form>
            </>
          ) : (
            <>
              <Lottie options={defaultLottieOptions} height={400} width={400} />
              <Typography align="center">
                It might take up to 5 minutes before the data is available
                through Swarm
              </Typography>
            </>
          )}
        </Card>
      )
    }
  }
}

const styles = ({  }: Theme) =>
  createStyles({
    headline: {
      marginTop: 20,
    },
    title: {},
    description: {},
    email: {},
    phone: {},
    location: {},
    skill: {},
    company: {},
    card: {
      maxWidth: 900,
      margin: "auto",
      marginTop: 150,
    },
  })

export default withStyles(styles)(RegisterConsultant)
