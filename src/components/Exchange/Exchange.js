import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setBrake, clearBrake } from '../../action'
import { ButtonList, ExcTable } from '..'

class Exchange extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedMoney: '$',
      inputMode: 'fromW'
    }
    this.handleMoneyButtonClick = this.handleMoneyButtonClick.bind(this)
    this.handleInputModeButtonClick = this.handleInputModeButtonClick.bind(this)
  }
  componentWillMount () {
    if (!this.props.loaded) this.props.setBrake()
  }
  componentWillReceiveProps (nextProps) {
    if (!nextProps.loaded) this.props.setBrake()
    else if (nextProps.loaded != this.props.loaded) this.props.clearBrake()
  }
  handleMoneyButtonClick (selectedMoney) {
    this.setState({
      selectedMoney
    })
  }
  handleInputModeButtonClick (inputMode) {
    this.setState({
      inputMode
    })
  }
  render () {
    const { loaded, entry, excData, measure, serviceRate } = this.props
    if (!loaded) return <div>...</div>
    const { selectedMoney, inputMode } = this.state
    const selectedMeasure = measure[selectedMoney]
    const measureToShow = selectedMeasure !== 1 ? selectedMeasure : ''
    const sign = {
      fromW: `₩ ≫ ${measureToShow}${selectedMoney}`,
      toW: `${measureToShow}${selectedMoney} ≫ ₩`
    }
    const signAlias = {
      [sign.fromW]: 'fromW',
      [sign.toW]: 'toW'
    }
    return (
      <div>
        <ButtonList values={entry} onClick={this.handleMoneyButtonClick} selected={selectedMoney} />
        <ExcTable selected={selectedMoney} header={sign} excData={excData[inputMode][selectedMoney]} serviceRate={serviceRate[selectedMoney]} />
        <ButtonList values={Object.values(sign)} valueAlias={signAlias} onClick={this.handleInputModeButtonClick} selected={inputMode} style={styles.inputModeButtonList} />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  loaded: state.exc.loaded,
  entry: state.exc.entry,
  excData: state.exc.excData,
  measure: state.exc.measure,
  serviceRate: state.exc.serviceRate
})
const mapDispatchToProps = dispatch => ({
  setBrake: () => dispatch(setBrake({ board: 'mainBoard' })),
  clearBrake: alertMessage => dispatch(clearBrake({ board: 'mainBoard', alertMessage }))
})
Exchange.propTypes = {
  loaded: PropTypes.bool.isRequired,
  entry: PropTypes.array.isRequired,
  excData: PropTypes.object.isRequired,
  measure: PropTypes.object.isRequired,
  serviceRate: PropTypes.object.isRequired,
  setBrake: PropTypes.func.isRequired,
  clearBrake: PropTypes.func.isRequired
}
Exchange.defaultProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(Exchange)
const styles = {
  inputModeButtonList: {
    container: {
      position: 'relative',
      width: 300,
      height: 45,
      margin: '0 auto 20',
      border: '1px solid rgb(199, 199, 199)',
      cursor: 'pointer'
    },
    button: {
      container: {
        position: 'relative',
        float: 'left',
        width: '50%',
        height: '100%',
        textAlign: 'center',
        transition: '0.3s',
        display: 'table'
      },
      aligner: {
        display: 'table-cell',
        verticalAlign: 'middle'
      },
      text: {
        color: 'black',
        fontSize: '1.2rem'
      }
    },
    buttonSelected: {
      container: {
        position: 'relative',
        float: 'left',
        width: '50%',
        height: '100%',
        backgroundColor: 'goldenrod',
        textAlign: 'center',
        transition: '0.3s',
        cursor: 'default',
        display: 'table'
      },
      aligner: {
        display: 'table-cell',
        verticalAlign: 'middle'
      },
      text: {
        color: 'black',
        fontSize: '1.2rem'
      }
    }
  }
}
