import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import BasketItem from '../basket-item';
import {formatPrice} from '../../utils';

function Basket(props) {
  return (
    <div className='Basket'>
      <div className='Basket-head'>
        <h1>Корзина</h1>
        <button onClick={props.onCloseBasket}>Закрыть корзину</button>
      </div>
      <div className='Basket-list'>{
        props.basket.map(item => {
          if (item.count > 0) {
            return <div key={item.code} className='List-item'>
              <BasketItem item={item} onDeleteItemsFromBasket={props.onDeleteItemsFromBasket} />
            </div>
          }
        }
        )}
      </div>
      <span className='Basket-count'>
        Итого: {props.totalCost > 0 ? formatPrice(props.totalCost) : formatPrice(0)}
      </span>
    </div>
  )
}

Basket.propTypes = {
  onCloseBasket: PropTypes.func,
  onDeleteItemFromBasket: PropTypes.func,
  basket: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired),
  totalCost: PropTypes.number
};

Basket.defaultProps = {
  onCloseBasket: () => { },
  onDeleteItemFromBasket: () => { }
}

export default React.memo(Basket);
