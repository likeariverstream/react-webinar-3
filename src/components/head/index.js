import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head(props) {
  return (
    <div className='Head'>
      <h1>{props.title}</h1>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node
};

export default React.memo(Head);
