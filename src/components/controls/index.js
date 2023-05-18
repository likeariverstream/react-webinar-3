import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {plural, formatPrice} from '../../utils';

function Controls(props) {
  return (
    <div className='Controls'>
      <div className='Controls-count'>
        В корзине:
        <span>
          {props.basket.length > 0
            ? ` ${props.totalCount} ${plural(props.totalCount, {one: 'товар', few: 'товара', many: 'товаров'})} / ${formatPrice(props.totalCost)}`
            : ' пусто'}
        </span>
      </div>
      <button onClick={props.onOpenBasket}>Перейти</button>
    </div>
  )
} 

Controls.propTypes = {
  onOpenBasket: PropTypes.func,
  basket: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired),
  totalCost: PropTypes.number,
  totalCount: PropTypes.number
};

Controls.defaultProps = {
  onOpenBasket: () => {}
}

export default React.memo(Controls);
