import * as React from "react"
import * as R from "ramda"
import { StyleRulesCallback, withStyles, Grid } from "@material-ui/core"
import { TextField, Button, Typography } from "@material-ui/core"
import ButtonWithLoading from "../../UI/ButtonWithLoading"
import Lottie from "react-lottie"
import * as animationData from "../../../animations/checked_done_.json"

type Props = {
  postJob: (job: Job) => void
  waitingForJobPosting: boolean
}

type AllProps = Props & { classes: StyleClassNames }

type State = {
  title: string
  description: string
  location: string
  submitButtonClicked: boolean
}

class CreateJobForm extends React.Component<AllProps, State> {
  contract: any

  constructor(props: AllProps, context: any) {
    super(props)
    this.state = {
      title: "",
      description: "",
      location: "",
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
      ["title", "location", "description"],
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
            <Typography
              variant="headline"
              className={classes.headline}
              gutterBottom
            >
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

type StyleClassNames = {
  headline: string
  title: string
  description: string
  location: string
}

const styles: StyleRulesCallback = theme => ({
  headline: {
    marginTop: 20,
  },
  title: {},
  description: {},
  location: {},
})

export default withStyles(styles)<Props>(CreateJobForm as any)
