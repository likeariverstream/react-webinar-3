import React from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login'
import Profile from './profile'
import ProtectedRoute from '../containers/protected-route';
import useStore from '../hooks/use-store';
import useSelector from '../hooks/use-selector';
import useInit from "../hooks/use-init";
/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const store = useStore();
  const location = useLocation();
  const activeModal = useSelector(state => state.modals.name);
  useInit(() => {
    store.actions.session.checkAccess();
  }, [location], true);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>} />
        <Route path={'/login'} element={<Login/>} />
        <Route path={'/profile'} element={<ProtectedRoute>
          <Profile />
        </ProtectedRoute>}/>
        <Route path={'/articles/:id'} element={<Article/>} />
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
