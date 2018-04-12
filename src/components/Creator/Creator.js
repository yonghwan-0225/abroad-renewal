import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { changeMode } from '../../action'
import { Profile, Phrase } from '..'
import './Creator.css'

const Creator = ({ setModeLogin }) => (
  <div className='creator__container'>
    <Profile imgSrc='img/김연재.jpg' name='김연재' email='liebe3060@gmail.com' website='https://github.com/liebebe' role='PM, 프론트엔드, 백엔드(nodejs)' say='재능 있는 자는 노력하는 자를 이길 수 없고, 노력하는 자는 즐기는 자를 이길 수 없다고 생각합니다. 즐겁게 달려온 우리 팀원들 모두 멋있습니다.' />
    <Profile imgSrc='img/김용환.jpg' name='김용환' email='2a5@naver.com' website='https://github.com/yonghwan-0225' role='백엔드(tomcat, spring, oracle)' say='협업을 통해 완성할 수 있었던 팀원들에게 이자리를 빌어 다시 감사의 인사를, 부족한 서비스지만 프로토타입인것을 감안하여 봐주시면 감사하겠습니다.' />
    <Profile imgSrc='img/배태한.jpg' name='배태한' email='leavingwill@gmail.com' website='https://github.com/Knightofcydonia51' role='백엔드(tomcat, servlet, crawling)' say='부족한 부분도 많았지만 그만큼 최선을 다해 부딪힐 수 있어서 행복했습니다. 값진 경험을 선물해준 팀원들 고맙습니다.' />
    <Profile imgSrc='img/김윤지.jpg' name='김윤지' email='k385300@naver.com' role='리소스' say='팀원들의 노력으로 멋진 결과물이 나올 수 있었습니다. 프로젝트 기간동안 많은 것을 배우고 경험할 수 있었습니다. 감사합니다.' />
    <Phrase value='그렇구나' onClick={setModeLogin} className={{ text: 'basic-phrase' }} />
  </div>
)
const mapDispatchToProps = dispatch => ({
  setModeLogin: () => dispatch(changeMode({ board: 'sideBoard', mode: 'reception' }))
})
Creator.propTypes = {
  setModeLogin: PropTypes.func.isRequired
}
export default connect(undefined, mapDispatchToProps)(Creator)
