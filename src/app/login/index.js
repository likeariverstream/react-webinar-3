import {memo, useCallback} from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/layouts/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Header from '../../containers/header';
import LoginForm from '../../components/login-form';
import SideLayout from '../../components/layouts/side-layout';
import {useNavigate} from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function Login() {
  const {t} = useTranslate();
  const navigate = useNavigate();
  const store = useStore();

  const select = useSelector(state => ({
    error: state.user.loginError,
  }));

  const callbacks = {
    onLogin: useCallback(data => {
      store.actions.user.login(data)
      .then(() => navigate('/profile'))
    }, [store])
  }
  const options = {
    onSubmit: (data) => callbacks.onLogin(data),
    titleLoginForm: t('login.form.title'),
    loginLabel: t('login.form.login'),
    passwordLabel: t('login.form.password'),
    buttonText: t('login.form.button'),
    error: select.error && `${t('login.form.error')}: ${select.error}`
  }

  return (
    <PageLayout>
      <Header/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <SideLayout side='start' padding='medium'>
        <LoginForm options={options} />
      </SideLayout>
    </PageLayout>
  )
}

export default memo(Login)
