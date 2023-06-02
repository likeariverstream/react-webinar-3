import { memo, useCallback } from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import LoginHeader from '../../containers/login-header';
import LoginForm from '../../components/login-form';
import SideLayout from '../../components/side-layout';
import { useNavigate } from 'react-router-dom';
function Login() {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const store = useStore();
  useInit(() => {
    store.actions.user.getUserInfo();
  }, [], true);
  const callbacks = {
    onLogin: useCallback(data => {
      store.actions.user.login(data)
      .then(() =>  navigate('/profile'))
    }, [store])
  }
  const options = {
    onSubmit: (data) => callbacks.onLogin(data),
    titleLoginForm: t('login.form.title'),
    loginLabel: t('login.form.login'),
    passwordLabel: t('login.form.password'),
    buttonText: t('login.form.button'),
  }
  return (
    <PageLayout>
      <LoginHeader />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <SideLayout side='start' padding='medium'>
        <LoginForm options={options} />
      </SideLayout>
    </PageLayout>
  )
}

export default memo(Login)
