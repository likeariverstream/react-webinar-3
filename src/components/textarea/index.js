import {memo, useCallback, useLayoutEffect, useState} from 'react';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import debounce from 'lodash.debounce';
import './style.css';

function Textarea(props) {

  // Внутренний стейт для быстрого отображения ввода
  const [value, setValue] = useState(props.value);

  const onChangeDebounce = useCallback(
    debounce(value => props.onChange(value, props.name), 600),
    [props.onChange, props.name]
  );

  // Обработчик изменений в поле
  const onChange = (event) => {
    setValue(event.target.value);
    onChangeDebounce(event.target.value);
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setValue(props.value), [props.value]);

  const cn = bem('Textarea');
  return (
    <textarea
      className={cn()}
      value={value}
      name={props.name}
      placeholder={props.placeholder}
      onChange={onChange}
    />
  )
}

Textarea.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string
}

Textarea.defaultProps = {
  onChange: () => {},
}

export default memo(Textarea);
