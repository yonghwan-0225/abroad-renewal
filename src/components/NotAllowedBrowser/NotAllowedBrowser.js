import React from 'react'
import PropTypes from 'prop-types'
import './NotAllowedBrowser.css'

const NotAllowedBrowser = () => {
  function handleClick () {
    location.href="http://www.google.com/chrome"
  }
  return (
    <div className='not-allowed-browser__container'>
      <div className='not-allowed-browser__vertical-container'>
        <div className='not-allowed-browser__logo'>
          <img src='img/abroad.png' height='80px' />
        </div>
        <div className='not-allowed-browser__text-container'>
          <span className='not-allowed-browser__text'>
            <span className='not-allowed-browser__text__chrome'>Chrome </span>에서 이용하실 수 있습니다.
          </span>
        </div>
        <div className='not-allowed-browser__text-container'>
          <span className='not-allowed-browser__text__chrome-download' onClick={handleClick}>Chrome 다운로드</span>
        </div>
      </div>
    </div>
  )
}
export default NotAllowedBrowser
