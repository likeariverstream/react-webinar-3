import React, {memo, useMemo} from 'react';
import SideLayout from '../../components/side-layout';
import LoginTool from '../../components/login-tool';
import useTranslate from '../../hooks/use-translate';
import {useNavigate} from 'react-router-dom';

function LoginHeader() {
  const {t} = useTranslate();
  const navigate = useNavigate();
  const callbacks = {
    onLogin: () => navigate('/login')
  }
  const options = {
    buttons: useMemo(() => ([
      {key: 1, title: t('header.login'), callback: callbacks.onLogin},
    ]), [t])
  };
  
  return(
    <SideLayout side='end'>
        <LoginTool buttons={options.buttons}/>
    </SideLayout>
  )
}

export default memo(LoginHeader)
