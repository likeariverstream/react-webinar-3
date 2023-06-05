import {Navigate, useLocation} from 'react-router-dom';
import {memo} from 'react';
import useSelector from "../../hooks/use-selector";

function ProtectedRoute() {
  const location = useLocation();
  const select = useSelector(state => ({
    isLogin: state.user.isLogin
  }))
  if (!select.isLogin) {
      return <Navigate to={'/login'} state={{ from: location }}/>
  }  
  return children;
}

export default memo(ProtectedRoute);
