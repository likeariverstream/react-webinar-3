import React, {memo, useState} from 'react';
import './style.css'
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import Input from '../input';
function LoginForm(props) {
  const cn = bem('LoginForm')
  
  const { options } = props
  const callbacks = {
    onLogin: (e) => {
      e.preventDefault();
      options.onSubmit(options.values);
    }
  }

  return (
    <form className={cn()} onSubmit={callbacks.onLogin}>
      <h4 className={cn('head')}>{options.titleLoginForm}</h4>
      <label className={cn('label')}>{options.loginLabel}
        <Input name='login' value={options.values.login} type='text' onChange={options.onChange}/>
      </label>
      <label className={cn('label')}>{options.passwordLabel}
        <Input name='password' value={options.values.password} type='password' onChange={options.onChange}/>
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
  error: PropTypes.string,
  onChange: PropTypes.func,
  values: {
    login: PropTypes.string,
    password: PropTypes.string
  }
}).isRequired

export default memo(LoginForm);
