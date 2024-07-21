import ProducerList from '../../components/ProducerList';
import AppLayout from '../../components/Layout';
import { useTranslation } from 'next-i18next';

const ClientPage = () => {
  const { t } = useTranslation('common');

  return (
    <AppLayout>
      <h1>{t('discover_producers')}</h1>
      <ProducerList />
    </AppLayout>
  );
};

export default ClientPage;
