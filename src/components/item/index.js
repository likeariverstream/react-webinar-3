import React, {useState} from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props){

  const callbacks = {
    onAddToBasket: (e) => {
      e.stopPropagation();
      props.onAddToBasket(props.item.code);
    }
  }

  return (
    <div className='Item'> 
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-actions'>
        <button onClick={callbacks.onAddToBasket}>
          Добавить в корзину
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onAddToBasket: PropTypes.func,
};

Item.defaultProps = {
  onAddToBasket: () => {},
}

export default React.memo(Item);
