import { memo, useCallback, useEffect } from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import ProductCard from "../../components/product-card";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination"
import { Route, Routes, useNavigate, useParams, useLocation } from 'react-router';
function Main() {
  const { pageId } = useParams()
  const location = useLocation()
  const currentPage = pageId ? Number(pageId) : 1
  const navigate = useNavigate()
  const store = useStore();
  const limit = 10;
  const skip = currentPage * 10 - limit;

  useEffect(() => {
    store.actions.catalog.getPagesCount();
    if (pageId) {
      store.actions.catalog.loadRequiredQuantityProduct(limit, skip, currentPage)
    } else {
      store.actions.catalog.load();
    }
  }, [location]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    pagesCount: state.catalog.pagesCount,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    navigateToPage: useCallback(() => navigate(`/${pageId}`), [store]),
    navigateToProduct: useCallback(() => navigate(`/${productId}`), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket}/>
    }, [callbacks.addToBasket]),
  };

  return (
    <PageLayout>
      <Head title='Магазин' />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
        sum={select.sum} />
      <Routes location={location}>
        <Route path="/:pageId" element={<List list={select.list} renderItem={renders.item} />} />
        <Route path="/product/:productId" element={<ProductCard />} />
        <Route path="/" element={<List list={select.list} renderItem={renders.item} />} />
      </Routes>
      <Pagination totalPages={select.pagesCount} currentPage={currentPage} handlePagination={callbacks.navigateToPage} />
    </PageLayout>
  );
}

export default memo(Main);
