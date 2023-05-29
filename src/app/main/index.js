import {memo, useCallback, useEffect, useState} from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Navbar from '../../components/navbar';
import PanelLayout from '../../components/panel-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination'
import {useParams, useLocation} from 'react-router';
import Spinner from '../../components/spinner';

function Main() {
  const { pageId } = useParams();
  const location = useLocation();
  const store = useStore();
  const [isLoading, setIsLoading] = useState(false)
  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    pagesCount: state.catalog.pagesCount,
    productsLimit: state.catalog.productsLimit,
    currentPage: state.catalog.currentPage,
    skip: state.catalog.skip,
    translations: state.language.translations,
    currentLanguage: state.language.current
  }));

  useEffect(() => {
    setIsLoading(true)
    store.actions.catalog.getPagesCount()
      .then(() => setIsLoading(false));
    store.actions.catalog.getCurrentPage(pageId);
    store.actions.catalog.setSkip(pageId);
    setIsLoading(true)
    store.actions.catalog.loadRequiredQuantityProduct()
      .then(() => setIsLoading(false));
  }, [location, pageId]);

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
      return <Item item={item} onAdd={callbacks.addToBasket} translations={select.translations} link={`/articles/${item._id}`} />
    }, [callbacks.addToBasket, select.translations]),
  };

  if (isLoading) {
    return <Spinner />
  }

  return (
    <PageLayout>
      <Head
        title={select.translations.shop}
        onChangeEnLanguage={callbacks.onChangeEnLanguage}
        onChangeRuLanguage={callbacks.onChangeRuLanguage}
        translations={select.translations}
        currentLanguage={select.currentLanguage} />
      <PanelLayout>
        <Navbar link='/' translations={select.translations}/>
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum} translations={select.translations}
        />
      </PanelLayout>
      <List list={select.list} renderItem={renders.item} />
      <Pagination totalPages={select.pagesCount} currentPage={select.currentPage} handlePagination={callbacks.navigateToPage} />
    </PageLayout>
  );
}

export default memo(Main);
