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

function Profile() {
  const {t} = useTranslate();
  const select = useSelector(state => ({
    user: state.user.user,
    profile: state.user.user.profile,
    waiting: state.user.waiting
  }))
  const options = {
    translations: {
      title: t('profile.title'),
      name: t('profile.name'),
      phone: t('profile.phone'),
      email: t('profile.email'),
    },
    name: select.profile?.name,
    phone: select.profile?.phone,
    email: select.user?.email,
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
