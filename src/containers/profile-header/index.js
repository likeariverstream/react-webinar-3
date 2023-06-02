import React, {memo, useMemo} from 'react';
import SideLayout from '../../components/side-layout';
import ProfileTool from '../../components/profile-tool';
import useTranslate from '../../hooks/use-translate';
import {useNavigate} from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';

function ProfileHeader() {
  const {t} = useTranslate();
  const store = useStore()
  const navigate = useNavigate()
  const select = useSelector(state => ({
    name: state.user.user.username
  }))
  const callbacks = {
    onLogout: () => store.actions.user.logout().then(() => navigate('/'))
  }
  const options = {
    buttons: useMemo(() => ([
      {key: 1, title: t('header.logout'), callback: callbacks.onLogout},
    ]), [t]),
    links: useMemo(() => ([
      {key: 1, title: select.name, path: '/profile'},
    ]), [t])
  };
  
  return(
    <SideLayout side='end'>
        <ProfileTool buttons={options.buttons} links={options.links}/>
    </SideLayout>
  )
}

export default memo(ProfileHeader)
