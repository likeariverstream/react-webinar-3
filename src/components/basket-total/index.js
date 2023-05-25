import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat} from '../../utils';
import './style.css';

function BasketTotal({sum, translations}) {
  const cn = bem('BasketTotal');
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{translations.total}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number.isRequired,
  translations: PropTypes.shape({
    total: PropTypes.string
  }).isRequired
};

BasketTotal.defaultProps = {
  sum: 0
}

export default memo(BasketTotal);
