import React, { memo } from "react";
import './style.css'
import PropTypes, { arrayOf, string, func, shape, bool } from "prop-types";
import { cn as bem } from '@bem-react/classname';
import CommentItem from "../comment-item";

function CommentList(props) {
  const cn = bem('CommentList');
  return (
    props.data && <section className={cn()}>
      {props.data.map(item => {
        if (item) {
          return <CommentItem
            key={item._id}
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
            answer={props.answer} />
        }
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
  answer: string
}

export default memo(CommentList);
