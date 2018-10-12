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
  Chip,
  ListItem,
  ListItemText,
} from "@material-ui/core"
import DoneIcon from "@material-ui/icons/Done"

type Props = {
  myDefaultAddress: string
  jobs: { [hash: string]: Job }
  fetchJobs: () => void
  clickJob: (hash: string) => () => void
}

type AllProps = Props & { classes: StyleClassNames }

type State = {}

class JobList extends React.Component<AllProps, State> {
  classes: StyleClassNames
  contract: any

  constructor(props: AllProps) {
    super(props)
    props.fetchJobs()
    this.classes = props.classes
  }

  render() {
    return (
      <List>
        {R.isEmpty(this.props.jobs) ? (
          <ListItem>empty</ListItem>
        ) : (
          R.map<string, any>(jobHash => {
            const {
              title,
              location,
              description,
              done,
              owner,
            } = this.props.jobs[jobHash]
            return (
              <ListItem
                key={jobHash}
                className={this.classes.listItem}
                button
                onClick={this.props.clickJob(jobHash)}
              >
                <Card key={jobHash} className={this.classes.card}>
                  <CardContent>
                    {owner === this.props.myDefaultAddress ? (
                      <Chip label="Your Job" />
                    ) : null}
                    {done ? <Chip label="Done" color="secondary" /> : null}
                    <Typography color="textSecondary">{location}</Typography>
                    <Typography variant="headline" component="h2">
                      {title}
                    </Typography>
                    <Typography component="p">{description}</Typography>
                  </CardContent>
                </Card>
              </ListItem>
            )
          }, Object.keys(this.props.jobs))
        )}
      </List>
    )
  }
}

type StyleClassNames = {
  card: string
  listItem: string
}

const styles: StyleRulesCallback = theme => ({
  card: {
    width: "100%",
  },
  listItem: {
    paddingTop: 3,
    paddingBottom: 3,
  },
})

export default withStyles(styles)<Props>(JobList)
