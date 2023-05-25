import React, {useEffect, memo, useCallback} from "react";
import { useLocation, useParams } from "react-router";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ProductCard from "../../components/product-card";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
function Product() {
  const {productId} = useParams();
  const location = useLocation();
  const store = useStore();
  useEffect(() => {
      if(productId) {
        store.actions.catalog.loadCurrentProduct(productId)
      }
      console.log(select.catalog)
      // console.log(select.catalog.currentProduct)
      // console.log(select.catalog.currentProduct.title)
  }, [location]);

  const select = useSelector(state => ({
    catalog: state.catalog,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentProduct: state.catalog.currentProduct,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  }

  if (!select.currentProduct) {
    return null
  }

  return(
    select.currentProduct && <PageLayout>
    <Head title={select.currentProduct.title} />
    <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
      sum={select.sum} />
    <ProductCard currentProduct={select.currentProduct} onAdd={callbacks.addToBasket}/>
  </PageLayout>
  )
}


export default memo(Product);
