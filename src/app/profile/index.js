import {memo} from 'react';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/layouts/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Header from '../../containers/header';
import ProfileInfo from '../../components/profile-info';
import SideLayout from '../../components/layouts/side-layout';
import useSelector from '../../hooks/use-selector';
import Spinner from '../../components/spinner';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';

function Profile() {
  const {t} = useTranslate();
  const store = useStore()
  useInit(() => {
    store.actions.profile.getUserInfo();
  }, [], true);
  
  const select = useSelector(state => ({
    profile: state.profile.profile,
    waiting: state.profile.waiting
  }))
  const options = {
    translations: {
      title: t('profile.title'),
      name: t('profile.name'),
      phone: t('profile.phone'),
      email: t('profile.email'),
    },
    name: select.profile.profile?.name,
    phone: select.profile?.profile?.phone,
    email: select.profile?.email,
  }

  return (
    <PageLayout>
      <Header/>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <SideLayout side='start' padding='medium'>
      <Spinner active={select.waiting}>
        <ProfileInfo options={options} />
      </Spinner>
      </SideLayout>
    </PageLayout>
  )
}

export default memo(Profile)
