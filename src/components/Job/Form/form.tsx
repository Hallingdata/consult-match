import {
  Grid,
  StyleRulesCallback,
  TextField,
  Typography,
  withStyles,
  WithStyles,
  Theme,
  createStyles,
} from "@material-ui/core"
import * as R from "ramda"
import * as React from "react"
import Lottie from "react-lottie"
import * as animationData from "../../../animations/checked_done_.json"
import ButtonWithLoading from "../../UI/ButtonWithLoading"

interface Props extends WithStyles<typeof styles> {
  postJob: (job: Job) => void
  waitingForJobPosting: boolean
}

type State = {
  title: string
  description: string
  email: string
  phone: string
  location: string
  submitButtonClicked: boolean
}

class CreateJobForm extends React.Component<Props, State> {
  contract: any

  constructor(props: Props) {
    super(props)
    this.state = {
      title: "",
      description: "",
      location: "",
      email: "",
      phone: "",
      submitButtonClicked: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (valueName: string) => (event: any) => {
    this.setState({ [valueName]: event.target.value } as any)
  }

  handleSubmit(event: any) {
    event.preventDefault()
    this.props.postJob(R.pick(
      ["title", "location", "description", "email", "phone"],
      this.state
    ) as Job)
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
        {!this.state.submitButtonClicked || this.props.waitingForJobPosting ? (
          <>
            <Typography variant="h5" className={classes.headline} gutterBottom>
              Post a Job
            </Typography>
            <form onSubmit={this.handleSubmit}>
              <Grid container spacing={16}>
                <Grid item xs={6}>
                  <TextField
                    className={classes.title}
                    id="title"
                    label="Title"
                    value={this.state.title}
                    onChange={this.handleChange("title")}
                    margin="normal"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    className={classes.location}
                    id="location"
                    label="Location"
                    value={this.state.location}
                    onChange={this.handleChange("location")}
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
                <Grid item xs={12}>
                  <TextField
                    className={classes.phone}
                    id="phone"
                    label="phone"
                    value={this.state.phone}
                    onChange={this.handleChange("phone")}
                    margin="normal"
                    fullWidth
                    type="tel"
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
                    Post Job
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

const styles = ({  }: Theme) =>
  createStyles({
    headline: {
      marginTop: 20,
    },
    title: {},
    description: {},
    location: {},
    email: {},
    phone: {},
  })

export default withStyles(styles)(CreateJobForm)
