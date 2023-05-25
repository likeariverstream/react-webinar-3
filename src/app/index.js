import React from 'react';
import Main from './main';
import Basket from './basket';
import useSelector from '../store/use-selector';
import {Route, Routes} from 'react-router';
import Product from './product'
/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path='/' element={<Main/>}>
          <Route path='/:pageId' element={<Main/>}/>
        </Route>
        <Route path='/product'>
          <Route path='/product:productId' element={<Product/>}/>
        </Route>
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
