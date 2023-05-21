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
        <button onClick={props.onCloseBasket}>Закрыть</button>
      </div>
      <BasketList basket={props.basket} onDeleteItemsFromBasket={props.onDeleteItemsFromBasket}/>
      <div className='Basket-count'>
        Итого <span>{props.totalCost > 0 ? formatPrice(props.totalCost) : formatPrice(0)}</span>
      </div>
    </div>
  )
}

Basket.propTypes = {
  onCloseBasket: PropTypes.func.isRequired,
  onDeleteItemsFromBasket: PropTypes.func.isRequired,
  basket: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired),
  totalCost: PropTypes.number.isRequired
};

export default React.memo(Basket);
