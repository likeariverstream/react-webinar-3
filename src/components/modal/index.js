import React from 'react';
import './style.css'
import PropTypes from 'prop-types';

function Modal(props) {
  return (
    <>
      <div className='Modal-overlay' />
      <div className='Modal'>{props.children}</div>
    </>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired
}

export default React.memo(Modal);
