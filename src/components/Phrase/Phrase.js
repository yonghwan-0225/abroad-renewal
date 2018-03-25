import React from 'react'
import PropTypes from 'prop-types'
import { mergeIfExist } from '../../util'

const Phrase = ({ value, onClick, style, className }) => (
  <div style={style ? mergeIfExist(styles.container, style.container) : styles.container} className={className ? className.container : undefined}>
    <div style={styles.aligner}><span onClick={onClick} style={style ? style.text : undefined} className={className ? className.text : undefined}>{value}</span></div>
  </div>
)
Phrase.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.object
}
Phrase.defaultProps = {

}
const styles = {
  container: {
    position: 'relative',
    margin: '0 auto',
    textAlign: 'center',
    display: 'table'
  },
  aligner: {
    display: 'table-cell',
    verticalAlign: 'middle'
  }
}
export default Phrase
