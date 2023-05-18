import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {formatPrice} from '../../utils';
function Item(props){
  const callbacks = {
    onAddToBasket: (e) => {
      props.onAddToBasket(props.item.code);
    }
  }

  return (
    <div className='Item'> 
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>
        {formatPrice(props.item.price)}
      </div>
      <div className='Item-actions'>
        <button onClick={callbacks.onAddToBasket}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAddToBasket: PropTypes.func,
};

Item.defaultProps = {
  onAddToBasket: () => {},
}

export default React.memo(Item);
