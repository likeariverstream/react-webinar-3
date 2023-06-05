import React, {memo, useMemo, useCallback} from 'react';
import SideLayout from '../../components/layouts/side-layout';
import ProfileTool from '../../components/tools/profile-tool';
import LoginTool from '../../components/tools/login-tool';
import useTranslate from '../../hooks/use-translate';
import {useNavigate} from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';

function Header() {
  const {t} = useTranslate();
  const store = useStore();
  const navigate = useNavigate();
  const select = useSelector(state => ({
    user: state.session.user,
    isLogin: state.session.isLogin
  }))
  const callbacks = {
    onLogout: () => store.actions.session.logout().then(() => navigate('/')),
    onLogin: () => navigate('/login')
  }
  const options = {
    profile: {
      buttons: useMemo(() => ([
        {key: 1, title: t('header.logout'), callback: callbacks.onLogout},
      ]), [t]),
      links: useMemo(() => ([
        {key: 1, title: select.user?.username, path: '/profile'},
      ]), [select.user]),
    },
    login: {
      buttons: useMemo(() => ([
        {key: 1, title: t('header.login'), callback: callbacks.onLogin},
      ]), [t])
    }
  };
  return(
    <SideLayout side='end'>
       {select.isLogin ? <ProfileTool buttons={options.profile.buttons} links={options.profile.links}/> : <LoginTool buttons={options.login.buttons}/>}
    </SideLayout>
  )
}

export default memo(Header)
