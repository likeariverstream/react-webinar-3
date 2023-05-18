import React, {useCallback} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const list = store.getState().list;
  const basket = store.getState().basket
  const cost = store.getState().cost

  const callbacks = {
    onAddItemToBasket: useCallback((code) => {
      store.addItemToBasket(code);
    }, [store]),

    onSelectItem: useCallback((code) => {
      store.selectItem(code);
    }, [store]),

    onOpenBasket: useCallback(() => {
      store.toggleOpeningBasket(true);
    }, [store])
  }

  return (
    <PageLayout>
      <Head title='Приложение на чистом JS' basket={basket} cost={cost}/>
      <Controls onOpenBasket={callbacks.onOpenBasket}/>
      <List list={list}
            onAddToBasket={callbacks.onAddItemToBasket}
            />
    </PageLayout>
  );
}

export default App;
