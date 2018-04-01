import React from 'react'
import PropTypes from 'prop-types'
import { LabeledInput } from '..'
import './Insurance.css'

const Insurance = ({ name, payment, popName }) => {
  let popWindow
  function handleClick () {
    const socket = io()
    socket.on('insurance', confirm => {
      popWindow.close()
      
    })
    popWindow = window.open(`/pop/${popName}.html`, "pop", "width=570, height=420, scrollbars=yes, resizable=yes")
  }
  return (
    <div className='insurance__container' onClick={this.handleClick}>
      <LabeledInput label={name} value={payment} style={style.labeledInput} readOnly={true} />
    </div>
  )
}
Insurance.propTypes = {
  name: PropTypes.string.isRequired,
  payment: PropTypes.string.isRequired
}
Insurance.defaultProps = {

}
export default Insurance
const style = {
  labeledInput: {
    container: {

    },
    label: {

    },
    input: {

    }
  }
}
