import {Navigate} from 'react-router-dom';
import {memo} from 'react';
import PropTypes from 'prop-types';

function ProtectedRoute({children, isLogin, path, location}) {

  if (!isLogin) {
      return <Navigate to={path} state={{ from: location }}/>
  }  
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isLogin: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
    state: PropTypes.shape({
      from: PropTypes.string,
    }),
  }).isRequired
}

export default memo(ProtectedRoute);
