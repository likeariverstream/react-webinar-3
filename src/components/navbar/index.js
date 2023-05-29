import React, { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { cn as bem } from '@bem-react/classname';
import './style.css';
function Navbar(props) {
  const cn = bem('Navbar')
  return (
    <nav className={cn()}>
      <Link to={props.link} className={cn('link')}>{props.translations.main}</Link>
    </nav>
  )
}

Navbar.propTypes = {
  translations: PropTypes.shape({
    main: PropTypes.string,
  }).isRequired,
  link: PropTypes.string.isRequired
}

export default memo(Navbar);
