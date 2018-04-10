import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Phrase } from '..'

const SearchRoute = ({ address }) => {
  function handleClick () {
    window.open(`https://www.google.com/maps/dir/${address.substr(7)}/인천국제공항+인천광역시+중구+공항로+272/`, "pop", `width=${window.innerWidth}, height=${window.innerHeight}, scrollbars=yes, resizable=yes`)
  }
  return (
    <Phrase value='나 공항 어떻게 가지?' onClick={handleClick} className={{ text: 'basic-phrase' }} />
  )
}
const mapStateToProps = state => ({
  address: state.user.address
})
SearchRoute.propTypes = {
  address: PropTypes.string.isRequired
}
export default connect(mapStateToProps)(SearchRoute)
