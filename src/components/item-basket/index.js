import {memo, useCallback} from 'react';
import {numberFormat} from '../../utils';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import {useNavigate} from 'react-router-dom';

function ItemBasket(props) {

  const cn = bem('ItemBasket');
  const navigate = useNavigate()
  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    goToProductPage: (e) => {
      navigate(props.link);
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
  onClose: PropTypes.func,
  onRemove: PropTypes.func,
  link: PropTypes.string
}

ItemBasket.defaultProps = {
  onRemove: () => {},
}

export default memo(ItemBasket);
