import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title, translations, onChangeEnLanguage, onChangeRuLanguage, currentLanguage }) {

  const callbacks = {
    changeRu: () => onChangeRuLanguage(),
    changeEn: () => onChangeEnLanguage()
  }

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <button onClick={callbacks.changeRu}>{translations.ruLanguage}</button>
      <button onClick={callbacks.changeEn}>{translations.enLanguage}</button>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  onChangeEnLanguage: PropTypes.func.isRequired,
  onChangeRuLanguage: PropTypes.func.isRequired,
  translations: PropTypes.shape({
    ruLanguage: PropTypes.string,
    enLanguage: PropTypes.string
  }),
  currentLanguage: PropTypes.string.isRequired
};

export default memo(Head);
