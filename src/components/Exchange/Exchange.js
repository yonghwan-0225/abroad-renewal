import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { excLimitAmount } from '../../config'
import { insertComma } from '../../util'
import { setBrake, clearBrake } from '../../action'
import { ButtonList, ExcTable, LabeledInput, AlertPhrase, Comparator } from '..'

class Exchange extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedMoney: '$',
      inputMode: 'fromW',
      moneyInput: '',
      moneyExchanged: '',
      moneyToCompare: '',
      moneyInputFocused: false,
      errMessage: ''
    }
    this.handleMoneyTypeClick = this.handleMoneyTypeClick.bind(this)
    this.handleInputModeButtonClick = this.handleInputModeButtonClick.bind(this)
    this.handleMoneyInputChange = this.handleMoneyInputChange.bind(this)
    this.handleMoneyInputFocus = this.handleMoneyInputFocus.bind(this)
    this.handleMoneyInputBlur = this.handleMoneyInputBlur.bind(this)
  }
  componentWillMount () {
    if (!this.props.loaded) this.props.setBrake()
  }
  componentWillReceiveProps (nextProps) {
    if (!nextProps.loaded) this.props.setBrake()
    else if (nextProps.loaded != this.props.loaded) this.props.clearBrake()
  }
  handleMoneyTypeClick (selectedMoney) {
    this.setState({
      selectedMoney,
      moneyInput: '',
      moneyExchanged: '',
      moneyToCompare: '',
      errMessage: ''
    })
  }
  handleInputModeButtonClick (inputMode) {
    this.setState({
      inputMode,
      moneyInput: '',
      moneyExchanged: '',
      moneyToCompare: '',
      errMessage: ''
    })
  }
  handleMoneyInputChange (e) {
    const inputValue = e.target.value.replace(/[^0-9.]/g, '')
    const inputValueNumber = Number(inputValue)
    if (inputValue.charAt(0) === '.' || inputValue.charAt(0) === '0' || isNaN(inputValueNumber)) return
    const { excData, measure, serviceRate } = this.props
    const { selectedMoney, inputMode } = this.state
    if (inputMode === 'fromW' && inputValueNumber >= excLimitAmount) return  // limit
    const ratio = measure[selectedMoney]
    const service = serviceRate[selectedMoney][inputMode]
    const compare = excData[inputMode][selectedMoney][0][inputMode]
    let moneyExchanged
    let moneyToCompare
    if (inputMode === 'fromW') {
      moneyExchanged = (inputValue / service) * ratio
      moneyToCompare = (inputValue / compare) * ratio
    } else {
      moneyExchanged = (inputValue / ratio) * service
      if (moneyExchanged >= excLimitAmount) return  // limit
      moneyToCompare = (inputValue / ratio) * compare
    }
    moneyExchanged = String(+(Math.round(moneyExchanged + "e+2")  + "e-2"));
    moneyToCompare = String(+(Math.round(moneyToCompare + "e+2")  + "e-2"));
    moneyExchanged = moneyExchanged === '0' ? '' : moneyExchanged
    moneyToCompare = moneyToCompare === '0' ? '' : moneyToCompare
    this.setState({
      moneyInput: inputValue,
      moneyExchanged,
      moneyToCompare,
      errMessage: ''
    })
  }
  handleMoneyInputFocus () {
    this.setState({
      moneyInputFocused: true
    })
  }
  handleMoneyInputBlur () {
    this.setState({
      moneyInputFocused: false
    })
  }
  render () {
    const { loaded, entry, excData, measure, serviceRate } = this.props
    if (!loaded) return <div>...</div>
    const { selectedMoney, inputMode, moneyInput, moneyExchanged, moneyToCompare, moneyInputFocused, errMessage } = this.state
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
    const moneyType = {
      from: inputMode === 'fromW' ? '₩' : selectedMoney,
      to: inputMode === 'fromW' ? selectedMoney : '₩'
    }
    const moneyWithComma = {
      input: insertComma(moneyInput),
      exchanged: insertComma(moneyExchanged),
      exchangedToCompare: insertComma(moneyToCompare)
    }
    return (
      <div>
        <ButtonList values={entry} selected={selectedMoney} onClick={this.handleMoneyTypeClick} style={style.moneyTypeButtonList} />
        <ExcTable selected={selectedMoney} header={sign} excData={excData[inputMode][selectedMoney]} serviceRate={serviceRate[selectedMoney]} />
        <ButtonList values={Object.values(sign)} valueAlias={signAlias} onClick={this.handleInputModeButtonClick} selected={inputMode} style={style.inputModeButtonList} />
        <LabeledInput label='환전할 금액' value={moneyWithComma.input} footer={moneyType.from} onChange={this.handleMoneyInputChange} onFocus={this.handleMoneyInputFocus} onBlur={this.handleMoneyInputBlur} style={moneyInputFocused ? style.moneyInputOnFocused : style.moneyInput} />
        <Comparator moneyType={moneyType.to} moneyInput={moneyWithComma.input} exchangedAbroad={moneyWithComma.exchanged} exchangedToCompare={moneyWithComma.exchangedToCompare} compareBankName={excData[inputMode][selectedMoney][0]['bank']} />

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
const style = {
  moneyTypeButtonList: {
    container: {
      position: 'relative',
      width: 300,
      height: 45,
      margin: '0 auto 20'
    },
    normal: {
      container: {
        position: 'relative',
        float: 'left',
        width: '25%',
        height: '100%'
      },
      text: {
        fontSize: '1.2rem'
      }
    },
    selected: {
      container: {
        position: 'relative',
        float: 'left',
        width: '25%',
        height: '100%',
        backgroundColor: 'goldenrod',
        cursor: 'default'
      },
      text: {
        fontSize: '1.2rem'
      }
    }
  },
  inputModeButtonList: {
    container: {
      position: 'relative',
      width: 300,
      height: 45,
      margin: '0 auto 10'
    },
    normal: {
      container: {
        position: 'relative',
        float: 'left',
        width: '50%',
        height: '100%'
      },
      text: {
        fontSize: '1.2rem'
      }
    },
    selected: {
      container: {
        position: 'relative',
        float: 'left',
        width: '50%',
        height: '100%',
        backgroundColor: 'goldenrod',
        cursor: 'default'
      },
      text: {
        fontSize: '1.2rem'
      }
    }
  },
  moneyInput: {
    input: {
      paddingRight: 43
    }
  },
  moneyInputOnFocused: {
    container: {
      border: '1px solid goldenrod',
      boxShadow: '0 0 3px goldenrod'
    },
    input: {
      paddingRight: 43
    }
  }
}
