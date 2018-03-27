import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setBrake, clearBrake } from '../../action'

const Exchange = ({ style }) => (
  <div>
    <div style={style.moneyButtonList}>

    </div>
  </div>
)
const mapStateToProps = state => ({
  loaded: state.exc.loaded,
  entry: state.exc.entry,
  excData: state.exc.excData,
  measure: state.exc.measure,
  serviceRate: state.exc.serviceRate
})
const mapDispatchToProps = dispatch => ({
  setBrake: () => dispatch(setBrake({ board: 'mainBoard' })),
  clearBrake: payload => dispatch(clearBrake(payload))
})
Exchange.propTypes = {
  loaded: PropTypes.bool.isRequired,
  entry: PropTypes.array.isRequired,
  excData: PropTypes.object.isRequired,
  measure: PropTypes.array.isRequired,
  serviceRate: PropTypes.object.isRequired,
  setBrake: PropTypes.func.isRequired,
  clearBrake: PropTypes.func.isRequired,
  style: PropTypes.object
}
Exchange.defaultProps = {
  style: {
    moneyButtonList: {

    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Exchange)
