import * as React from "react"
import * as R from "ramda"
import Lottie from "react-lottie"
import * as animationData from "../../../animations/checked_done_.json"
import { Chip, StyleRulesCallback, withStyles, Grid } from "@material-ui/core"
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@material-ui/core"
import ButtonWithLoading from "../../UI/ButtonWithLoading"
import FileUploadSwarm from "../../UI/FileUploadSwarm"

type Props = {
  registerConsultant: (consultant: Consultant) => void
  waitingForRegistration: boolean
}

type AllProps = Props & { classes: StyleClassNames }

type State = {
  name: string
  company: string
  description: string
  newSkill: string
  skills: string[]
  imageHash: string
  submitButtonClicked: boolean
}

class RegisterConsultant extends React.Component<AllProps, State> {
  constructor(props: AllProps, context: any) {
    super(props)
    this.state = {
      name: "",
      description: "",
      company: "",
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
      ["name", "company", "description", "skills", "imageHash"],
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
    const { classes } = this.props
    return (
      <>
        {!this.state.submitButtonClicked ||
        this.props.waitingForRegistration ? (
          <>
            <Typography
              variant="headline"
              className={classes.headline}
              gutterBottom
            >
              Register a new consultant profile.
            </Typography>
            <form onSubmit={this.handleSubmit}>
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
                <Grid item>
                  <FileUploadSwarm
                    onUploadComplete={this.handleImageUploaded}
                    onUploadFailed={res => console.log("error: " + res)}
                  />
                </Grid>
                <Grid item>
                  <ButtonWithLoading
                    color="secondary"
                    variant="contained"
                    loading={this.state.submitButtonClicked}
                    type="submit"
                    value="Submit"
                  >
                    Register
                  </ButtonWithLoading>
                </Grid>
              </Grid>
            </form>
          </>
        ) : (
          <>
            <Lottie options={defaultLottieOptions} height={400} width={400} />
            <Typography align="center">
              It might take up to 5 minutes before the data is available through
              Swarm
            </Typography>
          </>
        )}
      </>
    )
  }
}

type StyleClassNames = {
  headline: string
  title: string
  description: string
  company: string
  skill: string
}

const styles: StyleRulesCallback = theme => ({
  headline: {
    marginTop: 20,
  },
  title: {},
  description: {},
  location: {},
  skill: {},
})

export default withStyles(styles)<Props>(RegisterConsultant as any)
