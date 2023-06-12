import React, { memo } from "react";
import PropTypes, { node, number } from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentWrapper({children, offsetCondition}) {
  const cn = bem('CommentWrapper');

  return (
    <div className={cn()} style={{ width: `calc(100% - ${offsetCondition * 30}px)` }}>
        {children}
    </div>
  )
}

CommentWrapper.propTypes = {
  children: node,
  offsetCondition: number
}

export default memo(CommentWrapper);
