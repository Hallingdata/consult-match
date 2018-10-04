import * as R from "ramda"
import ContactList from "./contactList"
import { connect } from "react-redux"
import { push } from "connected-react-router"

const mapStateToProps = (state: any) => {
    console.log("loades thcontactListis?")
    return {
      contacts: R.reduce((acc: any[], jobHash) => {
          const contacts = R.keys(state.whisper.messages.jobs[jobHash])
          return R.concat(acc,R.map(contact => ({jobHash, contact}),contacts) )
      },[], R.keys(state.whisper.messages.jobs)),
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
      openChat: (jobHash: string, contact: string) => {
      console.log("open: " + contact)
      dispatch(push(`/chat/${jobHash}/${contact}`))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)<any>(ContactList)
