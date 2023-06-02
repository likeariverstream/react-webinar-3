import React, { memo, useState } from "react";
import './style.css'
import { cn as bem } from "@bem-react/classname";
import PropTypes, { number } from 'prop-types';

function LoginForm(props) {
  const cn = bem('LoginForm')
  const [values, setValues] = useState({login: '', password: ''})
  const { options } = props
  const callbacks = {
    onLogin: (e) =>{
      e.preventDefault();
      options.onSubmit(values);
    }
  }
  return (
    <form className={cn()} onSubmit={callbacks.onLogin}>
      <h4 className={cn('head')}>{options.titleLoginForm}</h4>
      <label className={cn('label')}>{options.loginLabel}
        <input value={values.login} name="login" onChange={(e) => setValues({ ...values, login: e.target.value })} /></label>
      <label className={cn('label')}>{options.passwordLabel}
        <input value={values.password} name="password" onChange={(e) => setValues({ ...values, password: e.target.value })} /></label>
        {options.error && <span className={cn('error')}>{options.error}</span>}
      <button type='submit'>{options.buttonText}</button>
    </form >
  )
}

LoginForm.propTypes = PropTypes.shape({
  onSubmit: PropTypes.func,
  titleLoginForm: PropTypes.string,
  loginLabel: PropTypes.string,
  passwordLabel: PropTypes.string,
  buttonText: PropTypes.string
}).isRequired

export default memo(LoginForm);
