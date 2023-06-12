import React, { memo } from "react";
import './style.css'
import PropTypes, { arrayOf, string, func, shape, bool, number } from "prop-types";
import { cn as bem } from '@bem-react/classname';
import CommentItem from "../comment-item";
import { Link } from "react-router-dom";
import CommentForm from "../comment-form";
import CommentWrapper from "../comment-wrapper";
function CommentList(props) {
  const cn = bem('CommentList');
  const callbacks = {
    onOpenCommentForm: () => props.openForm(id, count),
    onCloseCommentForm: () => props.closeForm(),
  }
  return (
    <section className={cn()}>
      {props.data.map((item) => {
        const offsetCondition = item.count < 16 ? (item.count - 1) : 14;
        const commentOffsetCondition = props.openCount < 16 ? (props.openCount - 1) : 14;
        return <React.Fragment key={item._id}>
          <CommentWrapper offsetCondition={offsetCondition}><CommentItem
            id={item._id}
            author={item.author.profile.name}
            dateCreate={item.dateCreate}
            text={item.text}
            onClick={props.onClick}
            onChange={props.onChange}
            value={props.value}
            name={props.name}
            type={props.type}
            title={props.title}
            button={props.button}
            count={item.count}
            path={props.path}
            exists={props.exists}
            open={props.open}
            openForm={props.openForm}
            closeForm={props.closeForm}
            cancel={props.cancel}
            descriptionAnswer={props.descriptionAnswer}
            cancelSend={props.cancelSend}
            login={props.login}
            parent={item.parent}
            answer={props.answer}
            user={props.user}
            offsetCondition={offsetCondition} />
          </CommentWrapper>
          {props.exists ? (item._id === props.openedItemId && item.parent._type !== 'article' && <CommentWrapper offsetCondition={commentOffsetCondition}>
            <CommentForm
              id={item._id}
              value={props.value}
              onChange={props.onChange}
              onClick={props.onClick}
              type={props.type}
              name={props.name}
              title={props.title}
              button={props.button}
              cancel={props.cancel}
              onCancel={callbacks.onCloseCommentForm}
            /></CommentWrapper>) : (item._id === props.openedItemId && item.parent._type !== 'article' && <CommentWrapper offsetCondition={commentOffsetCondition}>
              <span>
                <Link to={props.path} state={{ back: location.pathname }}>
                  {props.login}</Link>{props.descriptionAnswer}
                <button className={cn('cancel')} onClick={callbacks.onCloseCommentForm}>{props.cancelSend}</button>
              </span></CommentWrapper>)
          }
        </React.Fragment>
      })}
    </section>
  )
}

CommentList.propTypes = {
  data: arrayOf(shape({
    _id: string,
    author: shape({
      profile: shape({
        name: string
      }),
      _id: string
    }),
    dateCreate: string,
    text: string,
  })),
  onClick: func.isRequired,
  onChange: func.isRequired,
  type: string.isRequired,
  value: string.isRequired,
  name: string.isRequired,
  title: string.isRequired,
  path: string,
  exists: bool,
  open: string,
  openForm: func,
  closeForm: func,
  cancel: string,
  descriptionAnswer: string,
  cancelSend: string,
  login: string,
  answer: string,
  user: string,
  openedItemId: string,
  openCount: number
}

export default memo(CommentList);
