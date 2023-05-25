import {memo, useCallback} from 'react';
import propTypes from 'prop-types';
import {numberFormat} from '../../utils';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import {Link, useNavigate} from 'react-router-dom';

function ItemBasket(props) {

  const cn = bem('ItemBasket');
  const navigate = useNavigate()
  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    goToProductPage: (e) => {
      navigate(`/product/${props.item._id}`);
      props.onClose();
    }
  };

  return (
    <div className={cn()}>
      <p onClick={callbacks.goToProductPage} className={cn('title')}>{props.item.title}</p>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {props.translations.units}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{props.translations.delete}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number
  }).isRequired,
  onClose: propTypes.func,
  onRemove: propTypes.func,
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket);
