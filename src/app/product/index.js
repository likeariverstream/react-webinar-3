import React, {useEffect, memo, useCallback} from 'react';
import {useLocation, useParams} from 'react-router';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import ProductCard from '../../components/product-card';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function Product() {
  const {productId} = useParams();
  const location = useLocation();
  const store = useStore();
  useEffect(() => {
      if(productId) {
        store.actions.catalog.loadCurrentProduct(productId);
      }
  }, [location]);

  const select = useSelector(state => ({
    catalog: state.catalog,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentProduct: state.catalog.currentProduct,
    translations: state.language.translations,
    currentLanguage: state.language.current
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onChangeEnLanguage: useCallback(() => store.actions.language.changeEn(), [store]),
    onChangeRuLanguage: useCallback(() => store.actions.language.changeRu(), [store])
  }

  if (!select.currentProduct) {
    return null
  }

  return(
    select.currentProduct && <PageLayout>
    <Head 
      title={select.currentProduct.title}
      translations={select.translations}
      onChangeEnLanguage={callbacks.onChangeEnLanguage}
      onChangeRuLanguage={callbacks.onChangeRuLanguage}
      currentLanguage={select.currentLanguage}/>
    <BasketTool 
      onOpen={callbacks.openModalBasket}
      amount={select.amount}
      sum={select.sum} 
      translations={select.translations}
      link='/'/>
    <ProductCard currentProduct={select.currentProduct} onAdd={callbacks.addToBasket} translations={select.translations}/>
  </PageLayout>
  )
}

export default memo(Product);
