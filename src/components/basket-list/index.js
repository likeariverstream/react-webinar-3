import React from 'react';
import PropTypes from 'prop-types';
import BasketItem from '../basket-item';
import './style.css';

function BasketList(props){
  return (
    <div className='Basket-list'>{
      props.basket.map(item => {
        if (item.count > 0) {
          return <div key={item.code} className='Basket-list-item'>
            <BasketItem item={item} onDeleteItemsFromBasket={props.onDeleteItemsFromBasket} />
          </div>
        }
      })
      }
    </div>
  )
}

BasketList.propTypes = {
  onDeleteItemsFromBasket: PropTypes.func,
  basket: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired),
};

BasketList.defaultProps = {
  onCloseBasket: () => { },
  onDeleteItemsFromBasket: () => { }
}

export default React.memo(BasketList);
