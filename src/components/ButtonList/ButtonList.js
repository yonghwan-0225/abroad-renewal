import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from '..'

const ButtonList = ({ values, onClick, selected, style }) => (
  <div style={style.container}>
    {values.map(e => <Button key={e} value={e} onClick={() => onClick(e)} style={e === selected ? style.buttonSelected : style.button} />)}
  </div>
)
const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => ({

})
ButtonList.propTypes = {
  values: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.string,
  style: PropTypes.object
}
ButtonList.defaultProps = {
  style: {
    container: {
      position: 'relative',
      width: 300,
      height: 45,
      margin: '0 auto 40',
      border: '1px solid rgb(199, 199, 199)',
      cursor: 'pointer'
    },
    button: {
      container: {
        position: 'relative',
        float: 'left',
        width: '25%',
        height: '100%',
        textAlign: 'center',
        transition: '0.3s',
        display: 'table'
      },
      aligner: {
        display: 'table-cell',
        verticalAlign: 'middle'
      },
      text: {
        color: 'black',
        fontSize: '1.2rem'
      }
    },
    buttonSelected: {
      container: {
        position: 'relative',
        float: 'left',
        width: '25%',
        height: '100%',
        backgroundColor: 'goldenrod',
        textAlign: 'center',
        transition: '0.3s',
        display: 'table'
      },
      aligner: {
        display: 'table-cell',
        verticalAlign: 'middle'
      },
      text: {
        color: 'black',
        fontSize: '1.2rem'
      }
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ButtonList)
