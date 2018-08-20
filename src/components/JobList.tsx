import * as React from "react"
import { SFC } from "react"
import PropTypes from "prop-types"
import * as R from "ramda"
import {
  StyleRulesCallback,
  withStyles,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core"

type Props = {
  jobs: { [hash: string]: any }
  fetchJobs: (web3: any, contract: any) => void
}

type AllProps = Props & { classes: StyleClassNames }

type State = {}

class JobList extends React.Component<AllProps, State> {
  static contextTypes = {
    drizzle: PropTypes.object,
  }

  postJob: (data: any) => void
  classes: StyleClassNames
  contract: any

  constructor(props: AllProps, { drizzle }: any) {
    super(props)
    props.fetchJobs(drizzle.web3, drizzle.contracts.Jobs)
  }

  render() {
    console.log(this.props.jobs)
    return (
      <div>
        {R.isEmpty(this.props.jobs) ? (
          <span>empty</span>
        ) : (
          R.map(
            jobHash => <div key={jobHash}>{jobHash}</div>,
            Object.keys(this.props.jobs)
          )
        )}
      </div>
    )
  }
}

type StyleClassNames = {}

const styles: StyleRulesCallback = theme => ({})

export default withStyles(styles)<Props>(JobList)
