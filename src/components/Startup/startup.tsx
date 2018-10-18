import * as React from "react"
import { Typography, Dialog, DialogTitle } from "@material-ui/core"

type Props = {
  fetchJobs: () => Promise<void>
  checkNetwork: () => Promise<void>
  ready: boolean
  correctNetwork: boolean
  currentNetwork: string
}

export default class Startup extends React.Component<Props> {
  componentDidMount() {
    this.props.checkNetwork().then(_ => {
      if (this.props.correctNetwork) {
        this.props.fetchJobs()
      }
    })
  }
  render() {
    if (this.props.ready) {
      return this.props.children
    } else if (this.props.currentNetwork == "not connected") {
      return (
        <Dialog open={true}>
          <DialogTitle id="simple-dialog-title">
            You need to install{" "}
            <a href="https://metamask.io/" target="_blank">
              MetaMask
            </a>{" "}
            or another dApp browser or plugin.
          </DialogTitle>
        </Dialog>
      )
    } else if (!this.props.correctNetwork) {
      return (
        <Dialog open={true}>
          <DialogTitle id="simple-dialog-title">
            Wrong network - You need to change to the Ropsten tetnet
          </DialogTitle>
        </Dialog>
      )
    } else {
      return (
        <Dialog open={true}>
          <DialogTitle id="simple-dialog-title">Loading ...</DialogTitle>
        </Dialog>
      )
    }
  }
}
