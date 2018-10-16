import * as React from "react"
import { SFC } from "react"
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
  createStyles,
  Theme,
  WithStyles,
} from "@material-ui/core"
import WarningIcon from "@material-ui/icons/Warning"

interface Props extends WithStyles<typeof styles> {
  myDefaultAddress: string
  jobs: { [hash: string]: Job }
  fetchJobs: () => void
  clickJob: (hash: string) => () => void
}

type State = {}

class JobList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    props.fetchJobs()
  }

  render() {
    return (
      <List className={this.props.classes.list}>
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
                className={this.props.classes.listItem}
                button
                onClick={this.props.clickJob(jobHash)}
              >
                <Card key={jobHash} className={this.props.classes.card}>
                  <CardContent>
                    {owner === this.props.myDefaultAddress ? (
                      <Chip
                        className={this.props.classes.skill}
                        label="Your Job"
                      />
                    ) : null}
                    {done ? (
                      <Chip
                        className={this.props.classes.skill}
                        label="position filled"
                        color="secondary"
                        icon={<WarningIcon />}
                      />
                    ) : null}
                    <Typography color="textSecondary">{location}</Typography>
                    <Typography variant="h5" component="h2">
                      {title}
                    </Typography>
                    <Typography component="p">
                      {R.slice(0, 95, description)}
                      {description.length > 95 ? "..." : null}
                    </Typography>
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

const styles = ({  }: Theme) =>
  createStyles({
    list: {
      marginTop: 150,
    },
    card: {
      width: "100%",
    },
    listItem: {
      paddingTop: 3,
      paddingBottom: 3,
      maxWidth: 900,
      margin: "auto",
    },
    skill: {
      margin: 5,
    },
  })

export default withStyles(styles)(JobList)
