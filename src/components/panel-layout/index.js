import React, {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function PanelLayout({ children }) {
  const cn = bem('PanelLayout');
  return (
      <div className={cn()}>
          {children}
      </div>
  );
}

PanelLayout.propTypes = {
  children: PropTypes.node
}

export default memo(PanelLayout);
