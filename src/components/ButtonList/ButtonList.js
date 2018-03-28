import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '..'
import './ButtonList.css'

const ButtonList = ({ values, valueAlias, selected, onClick, style, className }) => {
  function isSelected (e) {
    return (valueAlias[e] || e) === selected
  }
  return (
    <div style={style.container} className={className.container || 'button-list__container'} >
      {values.map(e => <Button key={e} value={e} onClick={!isSelected(e) ? () => onClick(valueAlias[e] || e) : undefined} style={isSelected(e) ? style.selected : style.normal} className={isSelected(e) ? defaultClassName.selected : defaultClassName.normal} />)}
    </div>
  )
}
ButtonList.propTypes = {
  values: PropTypes.array.isRequired,
  valueAlias: PropTypes.object,
  selected: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.object
}
ButtonList.defaultProps = {
  valueAlias: {},
  style: {},
  className: {}
}
export default ButtonList
const defaultClassName = {
  normal: {
    container: 'button-list__button__container--normal',
    text: 'button-list__button__text--normal'
  },
  selected: {
    container: 'button-list__button__container--selected',
    text: 'button-list__button__text--selected'
  }
}
