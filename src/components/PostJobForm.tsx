/* 
    A job has:
    * title
    * description
    * place
    * (cost to apply)
*/

import * as React from "react"
import PropTypes from "prop-types"
import { StyleRulesCallback, withStyles, Grid } from "@material-ui/core"
import { TextField, Button, Typography } from "@material-ui/core"

type Props = {
  postJob: () => (data: any) => void
}

type AllProps = Props & { classes: StyleClassNames }

type State = {
  title: string
  description: string
  location: string
}

class CreateJobForm extends React.Component<AllProps, State> {

  postJob: (data: any) => void
  classes: StyleClassNames
  contract: any

  constructor(props: AllProps, context: any) {
    super(props)
    this.state = { title: "", description: "", location: "" }
    this.classes = props.classes
    this.postJob = props.postJob()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (valueName: string) => (event: any) => {
    this.setState({ [valueName]: event.target.value } as any)
  }

  handleSubmit(event: any) {
    event.preventDefault()
    this.postJob(this.state)
    // alert("A job form was submitted: " + JSON.stringify(this.state))
  }

  render() {
    return (
      <>
        <Typography variant="headline" gutterBottom>
          Post a job
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <Grid container spacing={16}>
            <Grid item xs={6}>
              <TextField
                className={this.classes.title}
                id="title"
                label="Title"
                value={this.state.title}
                onChange={this.handleChange("title")}
                margin="normal"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={this.classes.location}
                id="location"
                label="Location"
                value={this.state.location}
                onChange={this.handleChange("location")}
                margin="normal"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={this.classes.description}
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
                Submit job
              </Button>
            </Grid>
          </Grid>
        </form>
      </>
    )
  }
}

type StyleClassNames = {
  title: string
  description: string
  location: string
}

const styles: StyleRulesCallback = theme => ({
  title: {},
  description: {},
  location: {},
})

export default withStyles(styles)<Props>(CreateJobForm as any)
