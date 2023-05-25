import React, {memo} from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
import './style.css'

function ProductCard(props) {
  const cn = bem('ProductCard')
  const callbacks = {
    onAdd: (e) => props.onAdd(props.currentProduct._id)
  }

  return(
    <section className={cn()}>
      <p className={cn('description')}>{props.currentProduct.description}</p>
      <p className={cn('item')}>Страна производитель: <span>{props.currentProduct.madeIn.title} ({props.currentProduct.madeIn.code})</span></p>
      <p className={cn('item')}>Категория: <span>{props.currentProduct.category.title}</span></p>
      <p className={cn('item')}>Год выпуска: <span>{props.currentProduct.edition}</span></p>
      <p className={cn('price')}>Цена: {`${numberFormat(props.currentProduct.price)} ₽`}</p>
      <button className={cn('button')} onClick={callbacks.onAdd}>Добавить</button>
    </section>
  )
}

ProductCard.propTypes = {
  currentProduct: PropTypes.shape({ 
    _id: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.shape({title: PropTypes.string}),
    madeIn: PropTypes.shape({title: PropTypes.string, code: PropTypes.string}),
    title: PropTypes.string,
    price: PropTypes.number,
    edition: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func.isRequired
};

export default memo(ProductCard);
