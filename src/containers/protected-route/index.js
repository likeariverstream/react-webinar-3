import {Navigate, useLocation} from 'react-router-dom';
import {memo} from 'react';
import useSelector from "../../hooks/use-selector";
import PropTypes from "prop-types";

function ProtectedRoute({children}) {
  const location = useLocation();
  const select = useSelector(state => ({
    isLogin: state.session.isLogin
  }))
  if (!select.isLogin) {
      return <Navigate to={'/login'} state={{ from: location }}/>
  }  
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default memo(ProtectedRoute);
