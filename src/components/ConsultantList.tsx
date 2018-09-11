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
  consultants: { [hash: string]: Consultant }
  fetchConsultants: () => void
  clickConsultant: (hash: string) => () => void
}

type AllProps = Props & { classes: StyleClassNames }

type State = {}

class ConsultantList extends React.Component<AllProps, State> {
  classes: StyleClassNames
  contract: any

  constructor(props: AllProps) {
    super(props)
    props.fetchConsultants()
    this.classes = props.classes
  }

  render() {
    return (
      <List>
        {R.isEmpty(this.props.consultants) ? (
          <ListItem>empty</ListItem>
        ) : (
          R.map<string, any>(consultantHash => {
            if (R.has("error", this.props.consultants[consultantHash])) {
              return (
                <ListItem
                  key={consultantHash}
                  className={this.classes.listItem}
                >
                  <Card key={consultantHash} className={this.classes.card}>
                    <CardContent>
                      <Typography variant="caption">
                        Hash: {consultantHash}
                      </Typography>
                      <Typography component="p">
                        {R.path(
                          ["error"],
                          this.props.consultants[consultantHash]
                        )}
                      </Typography>
                    </CardContent>
                  </Card>
                </ListItem>
              )
            } else {
              const { name, company, description } = this.props.consultants[
                consultantHash
              ]
              return (
                <ListItem
                  key={consultantHash}
                  className={this.classes.listItem}
                  button
                  onClick={this.props.clickConsultant(consultantHash)}
                >
                  <Card key={consultantHash} className={this.classes.card}>
                    <CardContent>
                      <Typography color="textSecondary">{company}</Typography>
                      <Typography variant="headline" component="h2">
                        {name}
                      </Typography>
                      <Typography component="p">{description}</Typography>
                    </CardContent>
                  </Card>
                </ListItem>
              )
            }
          }, Object.keys(this.props.consultants))
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

export default withStyles(styles)<Props>(ConsultantList)
