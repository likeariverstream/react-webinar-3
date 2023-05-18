import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head(props){
  return (
    <div className='Head'>
      <h1>{props.title}</h1>
      <h1>Товаров в корзине: {props.basket.length} На сумму: {props.cost}</h1>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  basket: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired),
  cost: PropTypes.number
};

export default React.memo(Head);
