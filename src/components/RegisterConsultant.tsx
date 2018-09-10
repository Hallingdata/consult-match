import * as React from "react"
import PropTypes from "prop-types"
import { StyleRulesCallback, withStyles, Grid } from "@material-ui/core"
import { TextField, Button, Typography } from "@material-ui/core"

type Props = {
  registerConsultant: (jobData: any) => void
}

type AllProps = Props & { classes: StyleClassNames }

type State = {
  name: string
  company: string
  description: string
  skills: string[]
}

class RegisterConsultant extends React.Component<AllProps, State> {
  constructor(props: AllProps, context: any) {
    super(props)
    this.state = { name: "", description: "", company: "", skills: [] }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (valueName: string) => (event: any) => {
    this.setState({ [valueName]: event.target.value } as any)
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
          Legg ut et nytt oppdrag
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
            <Grid item>
              <Button variant="contained" type="submit" value="Submit">
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
}

const styles: StyleRulesCallback = theme => ({
  headline: {
    marginTop: 20,
  },
  title: {},
  description: {},
  location: {},
})

export default withStyles(styles)<Props>(RegisterConsultant as any)
