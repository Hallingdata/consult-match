import * as React from "react"
import * as R from "ramda"
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core"

type Props = {
  fetchJobs: () => Promise<void>
  checkNetwork: () => Promise<void>
  ready: boolean
  correctNetwork: boolean
  currentNetwork: number
  deployedNetworks: number[]
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
    } else if (this.props.currentNetwork === -1) {
      return (
        <Dialog open={true}>
          <DialogTitle id="simple-dialog-title">
            You need to install{" "}
            <a href="https://metamask.io/" target="_blank">
              MetaMask
            </a>
            or another dApp browser or plugin.
          </DialogTitle>
        </Dialog>
      )
    } else if (!this.props.correctNetwork) {
      return (
        <Dialog open={true}>
          <DialogTitle id="simple-dialog-title">
            Wrong network - You need to change to one of the avalible network
          </DialogTitle>
          <DialogContent>
            Avalible networks:
            <ul>{R.map(networkIdToName, this.props.deployedNetworks)}</ul>
          </DialogContent>
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

const networkIdToName = (networkId: number) => {
  switch (networkId) {
    case 1:
      return <li key="main-network">Main</li>
    case 2:
      return <li key="morden-network">Morden</li>
    case 3:
      return <li key="ropstan-network">Ropsten</li>
    case 4:
      return <li key="rinkeby-network">Rinkeby</li>
    case 42:
      return <li key="kovan-network">Kovan</li>
    default:
      return (
        <li key={`unknown-network-${networkId}`}>Unknown (id: {networkId})</li>
      )
  }
}
