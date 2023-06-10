import React, {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function CommentsLayout({children, side, padding}) {
  const cn = bem('CommentsLayout');
  return (
    <section className={cn({side, padding})}>
        {children}
    </section>
  );
}

CommentsLayout.propTypes = {
  children: PropTypes.node,
  side: PropTypes.oneOf(['start']),
  padding: PropTypes.oneOf(['medium']),
}

CommentsLayout.defaultProps = {};

export default memo(CommentsLayout);
