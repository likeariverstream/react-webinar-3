import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import BasketList from '../basket-list';
import {formatPrice} from '../../utils';

function Basket(props) {
  return (
    <div className='Basket'>
      <div className='Basket-head'>
        <h1>Корзина</h1>
        <button onClick={props.onCloseBasket}>Закрыть корзину</button>
      </div>
      <BasketList basket={props.basket} onDeleteItemsFromBasket={props.onDeleteItemsFromBasket}/>
      <span className='Basket-count'>
        Итого: {props.totalCost > 0 ? formatPrice(props.totalCost) : formatPrice(0)}
      </span>
    </div>
  )
}

Basket.propTypes = {
  onCloseBasket: PropTypes.func,
  onDeleteItemsFromBasket: PropTypes.func,
  basket: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired),
  totalCost: PropTypes.number
};

Basket.defaultProps = {
  onCloseBasket: () => { },
  onDeleteItemsFromBasket: () => { }
}

export default React.memo(Basket);
