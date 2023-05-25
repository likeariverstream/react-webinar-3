import {memo} from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title, translations, onChangeEnLanguage, onChangeRuLanguage, currentLanguage }) {

  const callbacks = {
    changeLanguage: () => {
      if (currentLanguage === 'ru') {
        onChangeEnLanguage();
      } else {
        onChangeRuLanguage();
      }
    }
  }

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <button onClick={callbacks.changeLanguage}>{translations.changeLanguage}</button>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  onChangeEnLanguage: PropTypes.func.isRequired,
  onChangeRuLanguage: PropTypes.func.isRequired,
  translations: PropTypes.shape({
    change: PropTypes.string
  }),
  currentLanguage: PropTypes.string.isRequired
};

export default memo(Head);
