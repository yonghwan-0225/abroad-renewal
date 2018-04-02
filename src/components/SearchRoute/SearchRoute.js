import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './SearchRoute.css'

const SearchRoute = ({ address }) => {
  function handleClick () {
    window.open(`https://www.google.com/maps/dir/${address}/인천국제공항+인천광역시+중구+공항로+272/`, "pop", `width=${window.innerWidth}, height=${window.innerHeight}, scrollbars=yes, resizable=yes`)
  }
  return (
    <div className='search-route__container' onClick={handleClick}>
      <span>공항 가는길 검색</span>
    </div>
  )
}
const mapStateToProps = state => ({
  address: state.user.address
})
const mapDispatchToProps = dispatch => ({

})
SearchRoute.propTypes = {
  address: PropTypes.string.isRequired
}
SearchRoute.defaultProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(SearchRoute)
