import { useCallback, useContext, useEffect, useState } from 'react';
import Main from "./main";
import Basket from "./basket";
import useStore from "../store/use-store";
import useSelector from "../store/use-selector";
import { Route, Routes } from 'react-router';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <Routes>
      <Route path='/' element={<Main />}>
        <Route path='/:pageId' element={<Main />} />
      </Route>
      {activeModal === 'basket' && <Basket />}
    </Routes>
  );
}

export default App;
