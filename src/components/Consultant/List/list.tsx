import * as React from "react"
import { SFC } from "react"
import * as R from "ramda"
import {
  Chip,
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
  CardMedia,
  Theme,
  createStyles,
  WithStyles,
} from "@material-ui/core"

interface Props extends WithStyles<typeof styles> {
  myDefaultAddress: string
  consultants: { [hash: string]: Consultant }
  fetchConsultants: () => void
  clickConsultant: (hash: string) => () => void
  getImageLink: (hash: string | undefined) => string
}

type State = {}

class ConsultantList extends React.Component<Props, State> {
  contract: any

  constructor(props: Props) {
    super(props)
    props.fetchConsultants()
  }

  render() {
    return (
      <List className={this.props.classes.list}>
        {R.isEmpty(this.props.consultants) ? (
          <ListItem>empty</ListItem>
        ) : (
          R.map<string, any>(consultantHash => {
            if (R.has("error", this.props.consultants[consultantHash])) {
              return (
                <ListItem
                  key={consultantHash}
                  className={this.props.classes.listItem}
                >
                  <Card
                    key={consultantHash}
                    className={this.props.classes.card}
                  >
                    <CardContent>
                      <Typography>Hash: {consultantHash}</Typography>
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
              const {
                name,
                company,
                description,
                imageHash,
                owner,
              } = this.props.consultants[consultantHash]
              return (
                <ListItem
                  key={consultantHash}
                  className={this.props.classes.listItem}
                  button
                  onClick={this.props.clickConsultant(consultantHash)}
                >
                  <Card
                    key={consultantHash}
                    className={this.props.classes.card}
                  >
                    <CardMedia
                      className={this.props.classes.profilePicture}
                      image={this.props.getImageLink(imageHash)}
                      title="Live from space album cover"
                    />
                    <CardContent>
                      {owner === this.props.myDefaultAddress ? (
                        <Chip label="Your profile" />
                      ) : null}
                      <Typography color="textSecondary">{company}</Typography>
                      <Typography variant="h5" component="h2">
                        {name}
                      </Typography>
                      <Typography component="p">
                        {R.slice(0, 95, description)}
                        {description.length > 95 ? "..." : null}
                      </Typography>
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
    profilePicture: {
      borderRadius: "50%",
      objectFit: "cover",
      width: 100,
      height: 100,
      float: "left",
      margin: 10,
      marginRight: 30,
    },
  })

export default withStyles(styles)<any>(ConsultantList)
