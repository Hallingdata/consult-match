import * as React from "react"
import { StyleRulesCallback, withStyles } from "@material-ui/core"
import { publishFile } from "../../integrations/swarm"

type Props = {
  onUploadComplete: (hash: string) => void
  onUploadFailed: (error: Error) => void
}

const FileUploadSwarm: React.SFC<Props & { classes: StyleClassNames }> = ({
  onUploadComplete,
  onUploadFailed,
}) => {
  const handleFileUpload = (files: FileList) => {
    console.log("file: ")
    console.log(files[0])
    publishFile(files[0])
      .then(onUploadComplete)
      .catch(onUploadFailed)
  }
  return <input type="file" onChange={e => e.target.files != null && handleFileUpload(e.target.files)} />
}

type StyleClassNames = {
  className: string
}

const styles: StyleRulesCallback = theme => ({
  className: {
    width: 100,
  },
})

export default withStyles(styles)<Props>(FileUploadSwarm)
