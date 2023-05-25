import React, {memo} from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";
function ProductCard(props) {
  const cn = bem('ProductCard')
  const callbacks = {
    onAdd: (e) => props.onAdd(props.currentProduct._id)
  }

  return(
    <section className={cn()}>
      <p className={cn('description')}>{props.currentProduct.description}</p>
      <p>Страна производитель: <span>{props.currentProduct.madeIn.title}</span></p>
      <p>Категория: <span>{props.currentProduct.category.title}</span></p>
      <p>Цена: <span>{numberFormat(props.currentProduct.price)}</span></p>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </section>
  )
}

ProductCard.propTypes = {
  currentProduct: PropTypes.shape({
    _id: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.shape({title: PropTypes.string}),
    madeIn: PropTypes.shape({title: PropTypes.string}),
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func.isRequired
};

export default memo(ProductCard);
