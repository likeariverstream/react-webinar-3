import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {formatPrice} from '../../utils';

function BasketItem(props) {
  const callbacks = {
    onDeleteItemsFromBasket: (e) => {
      props.onDeleteItemsFromBasket(props.item.code);
    }
  }
  return (
    <div className='Basket-item'>
      <div className='Basket-item-code'>{props.item.code}</div>
      <div className='Basket-item-title'>
        {props.item.title}
      </div>
      <div className='Basket-item-price'>
        {formatPrice(props.item.price * props.item.count)}
      </div>
      <div className='Basket-item-count'>
        {props.item.count} шт
      </div>
      <div className='Basket-item-actions'>
        <button onClick={callbacks.onDeleteItemsFromBasket}>
          Удалить
        </button>
      </div>
    </div>
  );
}

BasketItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onDeleteItemsFromBasket: PropTypes.func.isRequired,
};

export default React.memo(BasketItem);
