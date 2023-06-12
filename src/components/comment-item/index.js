import React, { memo } from "react";
import PropTypes, { string, bool, func, node, shape, number } from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';
import CommentForm from '../comment-form';
import { formatDate } from "../../utils/format-date";
import { Link } from "react-router-dom";
import CommentWrapper from "../comment-wrapper";
function CommentItem(props) {
  const {
    author,
    dateCreate,
    text,
    id,
    count,
    open,
    openForm,
    closeForm,
    answer,
    user,
  } = props;
  const cn = bem('CommentItem');
  const callbacks = {
    onOpenCommentForm: () => openForm(id, count),
    onCloseCommentForm: () => closeForm(),
  }
  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <span className={author === user ? cn('user') : cn('author')}>{author}</span>
        <span className={cn('date')}>{formatDate(dateCreate)}</span>
      </div>
      <div className={cn('text')}>
        {text}
      </div>
      {open !== id && <button className={cn('button')} onClick={callbacks.onOpenCommentForm}>{answer}</button>}
    </div>
  )
}

CommentItem.propTypes = {
  author: string.isRequired,
  dateCreate: string.isRequired,
  text: string.isRequired,
  onClick: func.isRequired,
  onChange: func.isRequired,
  children: node,
  id: string.isRequired,
  title: string,
  button: string.isRequired,
  path: string,
  exists: bool,
  open: string,
  openForm: func,
  closeForm: func,
  cancel: string,
  user: string,
  offsetCondition: number,
}

export default memo(CommentItem);
