import React, {memo} from "react";
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
  } = props;
  const cn = bem('CommentItem');
  const callbacks = {
    onOpenCommentForm: () => openForm(id),
    onCloseCommentForm: () => closeForm(),
  }
  const offsetCondition = count < 10 ? (count - 1) : 0
  return (
    <div className={cn()} style={{ width: `calc(100% - ${offsetCondition * 30}px)` }}>
      <div className={cn('head')}>
        <span className={cn('author')}>{author}</span>
        <span className={cn('date')}>{formatDate(dateCreate)}</span>
      </div>
      <div className={cn('text')}>
        {text}
      </div>
      <button className={cn('button')} onClick={callbacks.onOpenCommentForm}>Ответить</button>
      {exists ? (open === id && <CommentForm
        id={id} value={value}
        onChange={onChange}
        onClick={onClick}
        type={type} name={name}
        title={title}
        button={button} />) : (open === id && <span>
          <Link to={path} state={{ back: location.pathname }}>
            Войдите</Link>чтобы иметь возможность ответить
          <button className={cn('cancel')} onClick={callbacks.onCloseCommentForm}>Отмена</button>
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
}


export default memo(CommentItem);
