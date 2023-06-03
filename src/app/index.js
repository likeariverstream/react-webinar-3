import React from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login'
import Profile from './profile'
import ProtectedRoute from '../components/protected-route';
/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);
  const location = useLocation();
  const select = useSelector(state => ({
    isLogin: state.user.isLogin
  }))
  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>} />
        <Route path={'/login'} element={<Login/>} />
        <Route path={'/profile'} element={<ProtectedRoute isLogin={select.isLogin} path='/login' location={location}>
          <Profile />
        </ProtectedRoute>}/>
        <Route path={'/articles/:id'} element={<Article/>} />
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
