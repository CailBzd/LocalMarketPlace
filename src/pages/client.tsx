import AppLayout from '../components/Layout';
import { useTranslation } from 'react-i18next';

const ClientPage = () => {
  const { t } = useTranslation();

  return (
    <AppLayout>
      <h1>{t('client')}</h1>
      <p>Client specific functionality here.</p>
    </AppLayout>
  );
};

export default ClientPage;
