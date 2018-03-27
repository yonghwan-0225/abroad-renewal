import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setBrake, clearBrake, changeMode } from '../../action'
import { Bar, Phrase } from '..'

const Introduce = ({ setModeLogin }) => {
  const logo = <img src='img/abroad.png' height='22px' style={{ verticalAlign: 'middle' }} />
  return (
    <div style={styles.container}>
      <p>환영합니다 !</p><br />
      <p>이곳은 간단히 말해 환전을 할 수 있는 곳입니다. 은행에 갈 필요 없이 클릭 몇번으로 당신은 외화를 손에 쥘 수 있습니다.</p><br />
      <p style={styles.question}>집 앞에 있는 은행 냅두고 왜 여기서 환전을 해야되죠?</p><br />
      <p>물론 당신이 직접 은행에 가서 환전하는 것이 귀찮지 않다면 그렇게 생각 하실 수도 있습니다. 하지만 당신이 오른쪽(또는 아래의) 환율정보를 보고 생각이 달라졌으면 좋겠습니다. 우리는 그 어떤 은행보다 당신에게 유리한 환율을 제공하고 있습니다. <span style={styles.mumble}>은행이 우리를 많이 미워하지 않았으면 좋겠ㅅ</span></p><br />
      <p style={styles.question}>그래서 어떻게 이용해야 된다는거죠?</p><br />
      <p>1. 오른쪽(또는 아래의) 환율정보에서 환전하길 원하는 외화($, €, 元, ￥)와 환전유형(원화에서 외화, 외화에서 원화)을 선택합니다.</p>
      <p>2. 은행들의 환율정보를 비교해봅니다. (환율은 선택한 환전유형에 따라 자동으로 정렬됩니다.)</p>
      <p>3. 어떤 은행보다도 {logo}가 당신에게 유리한 환율을 제공하고 있음을 깨닫습니다.</p>
      <p>4. 환전하길 원하는 액수를 입력한 뒤 {logo}에서 환전하지 않을 경우 얼마나 더 은행에 주어야했을지 확인합니다. (비교대상이 되는 환율은 {logo} 다음으로 가장 유리한 환율입니다.)</p>
      <p style={styles.last}>5. 결제 완료를 확인한 후 편리하게 외화를 수령합니다. (외화는 등기우편으로 배송되며 배송비는 무료입니다.)</p>
      <Bar />
      <Phrase value='알겠으니까 되돌아갈래요' onClick={setModeLogin} className={{ text: 'basic-phrase' }} />
    </div>
  )
}
const mapDispatchToProps = dispatch => ({
  setModeLogin: () => dispatch(changeMode({ board: 'sideBoard', mode: 'login' }))
})
Introduce.propTypes = {
  setModeLogin: PropTypes.func.isRequired
}
Introduce.defaultProps = {

}
export default connect(undefined, mapDispatchToProps)(Introduce)
const styles = {
  container: {
    width: 280,
    textAlign: 'left',
    lineHeight: '150%',
    margin: '0 auto',
    cursor: 'default'
  },
  question: {
    color: 'lightcoral'
  },
  mumble: {
    textDecorationLine: 'line-through'
  },
  last: {
    marginBottom: 40
  }
}
