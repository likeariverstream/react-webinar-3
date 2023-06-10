import React, { memo } from "react";
import { string, func } from "prop-types";
import { cn as bem } from '@bem-react/classname';
import Textarea from "../textarea";
import './style.css';
import SideLayout from "../side-layout";
function CommentForm(props) {
  const cn = bem('CommentForm');
  const callbacks = {
    onSendComment: () => {
      props.onClick(props.id, props.type)
    },
    onCancel: () => {
      props.onCancel()
    }
  }
  return (
    <div className={cn()}>
      <div className={cn('head')}>{props.title}</div>
      <Textarea value={props.value} onChange={props.onChange} name={props.name} />
      <SideLayout>
        <button className={cn('button')} onClick={callbacks.onSendComment}>{props.button}</button>
        {props.cancel && <button className={cn('button')} onClick={callbacks.onCancel}>{props.cancel}</button>}
      </SideLayout>
    </div>
  )
}

CommentForm.propTypes = {
  value: string.isRequired,
  onChange: func.isRequired,
  onClick: func.isRequired,
  id: string.isRequired,
  type: string.isRequired,
  value: string.isRequired,
  name: string.isRequired,
  title: string,
  button: string.isRequired,
  cancel: string,
  onCancel: func
}

CommentForm.defaultProps = {}

export default memo(CommentForm);
