import {memo} from 'react';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from '../../utils';
import './style.css';

function BasketTool({sum, amount, onOpen, translations}) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{translations.inTheCart}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: translations.oneProduct, few: translations.fewProduct, many: translations.manyPproducts
          })} / ${numberFormat(sum)} ₽`
          : `${translations.isEmpty}`
        }
      </span>
      <button onClick={onOpen}>{translations.goTo}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  translations: PropTypes.shape({
    main: PropTypes.string,
    inTheCart: PropTypes.string,
    oneProduct: PropTypes.string,
    fewProduct: PropTypes.string,
    manyPproducts: PropTypes.string,
    isEmpty: PropTypes.string,
  }).isRequired,
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
