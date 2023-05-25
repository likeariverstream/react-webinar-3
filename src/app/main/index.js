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
import translations from '../../translations/ru';
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

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} translations={select.translations}/>
    }, [callbacks.addToBasket, select.translations]),
  };

  return (
    <PageLayout>
      <Head title={select.translations.shop} onChangeEnLanguage={callbacks.onChangeEnLanguage}
      onChangeRuLanguage={callbacks.onChangeRuLanguage}
      translations={select.translations}
      currentLanguage={select.currentLanguage}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
        sum={select.sum} translations={select.translations}/>
      <Routes>
        <Route path="/:pageId" element={<List list={select.list} renderItem={renders.item} />} />
        <Route path="/" element={<List list={select.list} renderItem={renders.item} />} />
      </Routes>
      <Pagination totalPages={select.pagesCount} currentPage={currentPage} handlePagination={callbacks.navigateToPage} />
    </PageLayout>
  );
}

export default memo(Main);
