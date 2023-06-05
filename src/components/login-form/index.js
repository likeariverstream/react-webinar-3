import React, {memo, useState} from 'react';
import './style.css'
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import Input from '../input';
function LoginForm(props) {
  const cn = bem('LoginForm')
  const [values, setValues] = useState({login: '', password: ''})
  const { options } = props
  const callbacks = {
    onLogin: (e) => {
      e.preventDefault();
      options.onSubmit(values);
    },
    onChange: (value, name) => {setValues(prevValues => ({...prevValues, [name]: value})) }
  }

  return (
    <form className={cn()} onSubmit={callbacks.onLogin}>
      <h4 className={cn('head')}>{options.titleLoginForm}</h4>
      <label className={cn('label')}>{options.loginLabel}
        <Input name='login' value={values.login} type='text' onChange={callbacks.onChange}/>
      </label>
      <label className={cn('label')}>{options.passwordLabel}
        <Input name='password' value={values.password} type='password' onChange={callbacks.onChange}/>
      </label>
        <span className={cn('error')}>{options.error}</span>
      <button type='submit'>{options.buttonText}</button>
    </form >
  )
}

LoginForm.propTypes = PropTypes.shape({
  onSubmit: PropTypes.func,
  titleLoginForm: PropTypes.string,
  loginLabel: PropTypes.string,
  passwordLabel: PropTypes.string,
  buttonText: PropTypes.string,
  error: PropTypes.string
}).isRequired

export default memo(LoginForm);
