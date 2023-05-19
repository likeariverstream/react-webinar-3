import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from './components/modal';
import Basket from './components/basket';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const state = {
    list: store.getState().list,
    basket: store.getState().basket,
    totalCost: store.getState().totalCost,
    totalCount: store.getState().totalCount,
    isOpenBasket: store.getState().isOpenBasket
  };

  const callbacks = {
    onAddItemToBasket: useCallback((code) => {
      store.addItemToBasket(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onOpenBasket: useCallback(() => {
      store.toggleOpeningBasket(true);
    }, [store]),

    onCloseBasket: useCallback(() => {
      store.toggleOpeningBasket(false);
    }, [store]),

    onDeleteItemsFromBasket: useCallback((code) => {
      store.deleteItemsFromBasket(code);
    }, [store])
  };

  return (
    <PageLayout>
      <Head title='Магазин' />
      <Controls
        onOpenBasket={callbacks.onOpenBasket}
        basket={state.basket}
        totalCost={state.totalCost}
        totalCount={state.totalCount} />
      <List
        list={state.list}
        onAddToBasket={callbacks.onAddItemToBasket} />
      {state.isOpenBasket && <Modal>
        <Basket
          basket={state.basket}
          onDeleteItemsFromBasket={callbacks.onDeleteItemsFromBasket}
          onCloseBasket={callbacks.onCloseBasket}
          totalCost={state.totalCost} />
      </Modal>}
    </PageLayout>
  );
}

export default App;
