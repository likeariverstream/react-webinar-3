import {memo} from 'react';
import PropTypes, {number} from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link} from 'react-router-dom';

function ProfileTool(props) {
  const cn = bem('ProfileTool');
  const {buttons, links} = props;
  return (
      <div className={cn()}>
          {links.map(link => (
              <Link className={cn('link')} to={link.path} key={link.key}>{link.title}</Link>
          ))}
          {buttons.map(button => (
              <button onClick={button.callback} key={button.key}>{button.title}</button>
          ))}
      </div>
    )
}

ProfileTool.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
      key: number,
      callback: PropTypes.func,
      title: PropTypes.string
  })).isRequired,
  links: PropTypes.arrayOf(PropTypes.shape({
      key: number,
      to: PropTypes.string,
      title: PropTypes.string
  })).isRequired,
}

export default memo(ProfileTool);
