import {memo} from "react";
import PropTypes, { number } from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function LoginTool(props) {
  const cn = bem('LoginTool');
  const {buttons} = props;
  return (
      <div className={cn()}>
          {buttons.map(button => (
              <button onClick={button.callback} key={button.key}>{button.title}</button>
          ))}
      </div>
    )
}

LoginTool.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
      key: number,
      callback: PropTypes.func,
      title: PropTypes.string
  })).isRequired,
}

export default memo(LoginTool);
