import ReduxDemo from "../components/ReduxDemo"
import { addData } from "../actions/data"
import { connect } from "react-redux"

const mapStateToProps = (state: any) => {
  return {
    dataArray: state.data.dataArray,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addData: (data: string) => dispatch(addData(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxDemo)
