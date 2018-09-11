import * as React from "react"
import * as R from "ramda"
import PropTypes from "prop-types"
import { Chip, StyleRulesCallback, withStyles, Grid } from "@material-ui/core"
import { TextField, Button, Typography } from "@material-ui/core"

type Props = {
  registerConsultant: (jobData: any) => void
}

type AllProps = Props & { classes: StyleClassNames }

type State = {
  name: string
  company: string
  description: string
  newSkill: string
  skills: string[]
}

class RegisterConsultant extends React.Component<AllProps, State> {
  constructor(props: AllProps, context: any) {
    super(props)
    this.state = {
      name: "",
      description: "",
      company: "",
      newSkill: "",
      skills: [],
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (valueName: string) => (event: any) => {
    this.setState({ [valueName]: event.target.value } as any)
  }

  handleNewSkill = (event: any) => {
    if (
      event.key === "Enter" &&
      !R.contains(this.state.newSkill, this.state.skills)
    ) {
      this.setState({
        skills: R.append(this.state.newSkill, this.state.skills),
        newSkill: "",
      })
    }
  }

  handleDelete = (skill: string) => (event: any) => {
    console.log(skill)
    this.setState({
      skills: R.without([skill], this.state.skills),
    })
  }

  handleSubmit(event: any) {
    event.preventDefault()
    this.props.registerConsultant(this.state)
  }

  render() {
    const { classes } = this.props
    return (
      <>
        <Typography
          variant="headline"
          className={classes.headline}
          gutterBottom
        >
          Register a new consultant profile.
        </Typography>
        <form>
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
              />
            </Grid>
            <Grid item xs={12}>
              {R.map(
                skill => (
                  <Chip
                    key={`skill-${skill}`}
                    label={skill}
                    onDelete={this.handleDelete(skill)}
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
                onKeyPress={this.handleNewSkill}
                margin="normal"
                helperText="Press ENTER to add a skill"
                fullWidth
              />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={this.handleSubmit}>
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
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
