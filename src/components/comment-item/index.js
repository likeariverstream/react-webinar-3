import React, { memo } from "react";
import PropTypes, { string, bool, func, node } from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';
import CommentForm from '../comment-form';
import { formatDate } from "../../utils/format-date";
import { Link } from "react-router-dom";
function CommentItem(props) {
  const {
    author,
    dateCreate,
    text,
    onClick,
    onChange,
    value,
    id, type,
    name,
    title,
    button,
    count,
    path,
    exists,
    open,
    openForm,
    closeForm,
    cancel,
    login,
    answer,
    descriptionAnswer,
    cancelSend,
    user,
  } = props;
  const cn = bem('CommentItem');
  const callbacks = {
    onOpenCommentForm: () => openForm(id),
    onCloseCommentForm: () => closeForm(),
  }
  const offsetCondition = count < 16 ? (count - 1) : 14
  return (
    <div className={cn()} style={{ width: `calc(100% - ${offsetCondition * 30}px)` }}>
      <div className={cn('head')}>
        <span className={author === user ? cn('user') : cn('author')}>{author}</span>
        <span className={cn('date')}>{formatDate(dateCreate)}</span>
      </div>
      <div className={cn('text')}>
        {text}
      </div>
      {open !== id && <button className={cn('button')} onClick={callbacks.onOpenCommentForm}>{answer}</button>}
      {exists ? (open === id && <CommentForm
        id={id}
        value={value}
        onChange={onChange}
        onClick={onClick}
        type={type}
        name={name}
        title={title}
        button={button}
        cancel={cancel}
        onCancel={callbacks.onCloseCommentForm}
      />) : (open === id && <span>
        <Link to={path} state={{ back: location.pathname }}>
          {login}</Link>{descriptionAnswer}
        <button className={cn('cancel')} onClick={callbacks.onCloseCommentForm}>{cancelSend}</button>
      </span>)
      }
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
  type: string.isRequired,
  title: string,
  button: string.isRequired,
  path: string,
  exists: bool,
  open: string,
  openForm: func,
  closeForm: func,
  cancel: string,
  user: string
}


export default memo(CommentItem);
