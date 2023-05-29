import React, {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import {numberFormat} from "../../utils";
import './style.css'

function ProductCard(props) {
  const cn = bem('ProductCard')
  const callbacks = {
    onAdd: (e) => props.onAdd(props.currentProduct._id)
  }

  return(
    <section className={cn()}>
      <p className={cn('description')}>{props.currentProduct.description}</p>
      <p className={cn('item')}>{props.translations.countryOfOrigin}: <span>
        {props.currentProduct.madeIn.title} ({props.currentProduct.madeIn.code})
      </span></p>
      <p className={cn('item')}>{props.translations.category}: <span>{props.currentProduct.category.title}</span></p>
      <p className={cn('item')}>{props.translations.yearOfRelease}: <span>{props.currentProduct.edition}</span></p>
      <p className={cn('price')}>{props.translations.price}: {`${numberFormat(props.currentProduct.price)} ₽`}</p>
      <button className={cn('button')} onClick={callbacks.onAdd}>{props.translations.add}</button>
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
  translations: PropTypes.shape({
    price: PropTypes.string,
    countryOfOrigin: PropTypes.string,
    yearOfRelease: PropTypes.string,
    category: PropTypes.string,
    add: PropTypes.string,
  }).isRequired,
  onAdd: PropTypes.func.isRequired
};

export default memo(ProductCard);
