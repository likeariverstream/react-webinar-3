import { memo, useCallback, useEffect } from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Header from '../../containers/header';
import ProfileInfo from '../../components/profile-info';
import SideLayout from '../../components/side-layout';
import useSelector from '../../hooks/use-selector';

function Profile() {
  const { t } = useTranslate();
  const store = useStore();

  useInit(() => {
    store.actions.user.getUserInfo();
  }, [], true);

  const select = useSelector(state => ({
    name: state.user.user.profile?.name,
    phone: state.user.user.profile?.phone,
    email: state.user.user.email,
    waiting: state.user.waiting
  }))
  const options = {
    translations: {
      title: t('profile.title'),
      name: t('profile.name'),
      phone: t('profile.phone'),
      email: t('profile.email'),
    },
    name: select?.name,
    phone: select?.phone,
    email: select?.email,
  }

  return (
    select.name && <PageLayout>
      <Header />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <SideLayout side='start' padding='medium'>
        <ProfileInfo options={options} />
      </SideLayout>
    </PageLayout>
  )
}

export default memo(Profile)
