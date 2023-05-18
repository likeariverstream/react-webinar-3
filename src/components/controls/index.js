import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onOpenBasket}){
  return (
    <div className='Controls'>
      <button onClick={() => onOpenBasket()}>Открыть корзину</button>
    </div>
  )
}

Controls.propTypes = {
  onBasketOpen: PropTypes.func
};

Controls.defaultProps = {
  onOpenBasket: () => {}
}

export default React.memo(Controls);
