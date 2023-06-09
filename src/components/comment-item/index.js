import React, { memo, useState } from "react";
import PropTypes, { string, bool, func, node } from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';
import CommentForm from '../comment-form';
import { formatDate } from "../../utils/format-date";
function CommentItem(props) {
  const { author, dateCreate, text, onClick, onChange, value, id, type, name, title, button, count } = props;
  const cn = bem('CommentItem');
  const [isCommentForm, setIsCommentForm] = useState(false);
  const callbacks = {
    onSetCommentForm: () => setIsCommentForm(true),
  }
  return (
    <div className={cn()} style={{paddingLeft: count * 30}}>
      <div className={cn('head')}>
        <span className={cn('author')}>{author}</span>
        <span className={cn('date')}>{formatDate(dateCreate)}</span>
      </div>
      <div className={cn('text')}>
        {text}
      </div>
      <button className={cn('button')} onClick={callbacks.onSetCommentForm}>Ответить</button>
      {isCommentForm && <CommentForm
        id={id} value={value}
        onChange={onChange}
        onClick={onClick}
        type={type} name={name}
        title={title}
        button={button} />}
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
  button: string.isRequired
}


export default memo(CommentItem);
