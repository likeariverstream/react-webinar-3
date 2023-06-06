import {memo, useCallback, useEffect, useState} from 'react';
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
import Spinner from '../../components/spinner';

function Login() {
  const {t} = useTranslate();
  const navigate = useNavigate();
  const store = useStore();
  const [values, setValues] = useState({login: '', password: ''})
  const select = useSelector(state => ({
    session: state.session,
    isLogin: state.session.isLogin,
    waiting: state.session.waiting
  }));

  const callbacks = {
    onLogin: useCallback(data => {
      store.actions.session.login(data)
    }, [store])
  }
  useEffect(() => {
    if (select.isLogin) {
      navigate(- 1) || navigate('/')
    }
  }, [select.isLogin])
  const options = {
    onSubmit: (data) => callbacks.onLogin(values),
    onChange: (value, name) => {setValues(prevValues => ({...prevValues, [name]: value})) },
    titleLoginForm: t('login.form.title'),
    loginLabel: t('login.form.login'),
    passwordLabel: t('login.form.password'),
    buttonText: t('login.form.button'),
    error: select.session.generalError && `${t('login.form.error')}: ${select.session.generalError}`,
    values
  }

  return (
    <PageLayout>
      <Header/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <SideLayout side='start' padding='medium'>
      <Spinner active={select.waiting}>
        <LoginForm options={options} />
      </Spinner>
      </SideLayout>
    </PageLayout>
  )
}

export default memo(Login)
