import * as React from "react"
import { withStyles, Theme, WithStyles, createStyles } from "@material-ui/core"
import { publishFile } from "../../integrations/swarm"

interface Props extends WithStyles<typeof styles> {
  onUploadComplete: (hash: string) => void
  onUploadFailed: (error: Error) => void
}

const FileUploadSwarm: React.SFC<Props> = ({
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
  return (
    <input
      type="file"
      onChange={e => e.target.files != null && handleFileUpload(e.target.files)}
    />
  )
}

const styles = ({  }: Theme) =>
  createStyles({
    className: {
      width: 100,
    },
  })

export default withStyles(styles)(FileUploadSwarm)
