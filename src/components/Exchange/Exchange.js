import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import request from 'superagent'
import { excLimitAmount, exchangeURL } from '../../config'
import { insertComma } from '../../util'
import { setBrake, clearBrake, renewOrderData } from '../../action'
import { ButtonList, ExcTable, LabeledInput, AlertPhrase, Trench, Comparator, AlertableButton } from '..'

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
    this.handleExcButtonClick = this.handleExcButtonClick.bind(this)
    this.update = this.update.bind(this)
  }
  componentWillMount () {
    if (!this.props.loaded) this.props.setBrake()
  }
  componentWillReceiveProps (nextProps) {
    if (!nextProps.loaded) this.props.setBrake()
    else if (nextProps.loaded !== this.props.loaded) this.props.clearBrake()
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
    if (inputMode === 'fromW' && inputValueNumber >= excLimitAmount) {
      this.setState({
        errMessage: '너무 많은 금액입니다'
      })
      return
    }
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
      if (moneyExchanged >= excLimitAmount) {
        this.setState({
          errMessage: '너무 많은 금액입니다'
        })
        return
      }
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
  handleExcButtonClick () {
    if (!this.props.login) {
      this.update({ errMessage: '로그인이 필요합니다' })
      return
    }
    const { setBrake, clearBrake, onExchange } = this.props
    const { moneyInput } = this.state
    const params = {
      amount: moneyInput
    }
    setBrake()
    request.post(exchangeURL).type('form').send(params).end((err, res) => {
      if (err) {
        this.update({ errMessage: 'Business서버가 고장났습니다' })
        clearBrake()
        return
      }
      const { status, message, nextOrderData } = res.body
      if (status) {
        clearBrake('환전요청 완료되었습니다')
        onExchange({ nextOrderData })
      } else {
        clearBrake()
        this.update({ errMessage: message })
      }
    })
  }
  update ({ target, inputValue, errMessage }) {
    if (errMessage) {
      this.setState({
        errMessage
      })
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.setState({
          errMessage: ''
        })
      }, 3000)
    } else {
      this.setState({
        [target]: inputValue,
        errMessage: ''
      })
    }
  }
  render () {
    const { loaded, entry, excData, measure, serviceRate } = this.props
    if (!loaded) return <div>　</div>
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
    const excButtonValue = <div><img src='img/abroad.png' height='22px' style={{ position: 'relative', top: -3, verticalAlign: 'middle' }} />에서 환전하기</div>
    return (
      <div>
        <ButtonList values={entry} selected={selectedMoney} onClick={this.handleMoneyTypeClick} style={style.moneyTypeButtonList} />
        <ExcTable selected={selectedMoney} header={sign} excData={excData[inputMode][selectedMoney]} serviceRate={serviceRate[selectedMoney]} />
        <ButtonList values={Object.values(sign)} valueAlias={signAlias} onClick={this.handleInputModeButtonClick} selected={inputMode} style={style.inputModeButtonList} />
        <LabeledInput label='환전할 금액' value={moneyWithComma.input} footer={moneyType.from} onChange={this.handleMoneyInputChange} onFocus={this.handleMoneyInputFocus} onBlur={this.handleMoneyInputBlur} style={moneyInputFocused ? style.moneyInputOnFocused : style.moneyInput} />
        <Trench toggle={moneyWithComma.exchangedToCompare !== ''} >
          <Comparator moneyType={moneyType.to} moneyInput={moneyWithComma.input} exchangedAbroad={moneyWithComma.exchanged} exchangedToCompare={moneyWithComma.exchangedToCompare} compareBankName={excData[inputMode][selectedMoney][0]['bank']} />
          <AlertableButton value={excButtonValue} errMessage={errMessage} onClick={this.handleExcButtonClick} style={style.alertableButton} />
        </Trench>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  loaded: state.exc.loaded,
  entry: state.exc.entry,
  excData: state.exc.excData,
  measure: state.exc.measure,
  serviceRate: state.exc.serviceRate,
  login: state.user.login
})
const mapDispatchToProps = dispatch => ({
  setBrake: () => dispatch(setBrake({ board: 'mainBoard' })),
  clearBrake: alertMessage => dispatch(clearBrake({ board: 'mainBoard', alertMessage })),
  onExchange: payload => dispatch(renewOrderData(payload))
})
Exchange.propTypes = {
  loaded: PropTypes.bool.isRequired,
  entry: PropTypes.array.isRequired,
  excData: PropTypes.object.isRequired,
  measure: PropTypes.object.isRequired,
  serviceRate: PropTypes.object.isRequired,
  login: PropTypes.bool.isRequired,
  setBrake: PropTypes.func.isRequired,
  clearBrake: PropTypes.func.isRequired,
  onExchange: PropTypes.func.isRequired
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
      margin: '0 auto 20'
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
  },
  alertableButton: {
    err: {
      container: {
        position: 'relative',
        width: 280,
        height: 45,
        margin: '0 auto 10',
        padding: '0 10',
        backgroundColor: '#CD3855'
      },
      text: {
        color: 'white'
      }
    },
    normal: {
      container: {
        position: 'relative',
        width: 280,
        height: 45,
        margin: '0 auto 10',
        padding: '0 10',
        backgroundColor: 'goldenrod'
      },
      text: {
        fontSize: '1.2rem'
      }
    }
  }
}
