import * as React from "react"

type Props = {
  fetchJobs: () => void
  ready: boolean
}

export default class Startup extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchJobs()
  }
  render() {
    return this.props.ready ? this.props.children : <p>Loading...</p>
  }
}
