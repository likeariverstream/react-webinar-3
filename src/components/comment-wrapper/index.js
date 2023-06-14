import React, { memo, forwardRef } from "react";
import PropTypes, { node, number } from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentWrapper({children, offsetCondition}, ref) {
  const cn = bem('CommentWrapper');

  return (
    <div ref={ref} className={cn()} style={{ width: `calc(100% - ${offsetCondition * 30}px)` }}>
        {children}
    </div>
  )
}

CommentWrapper.propTypes = {
  children: node,
  offsetCondition: number
}

export default memo(forwardRef(CommentWrapper));
