import { useTranslation } from 'react-i18next';
import AppLayout from '../components/Layout';

const HomePage = () => {
  const { t } = useTranslation('common');

  return (
    <AppLayout>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
    </AppLayout>
  );
};

export default HomePage;
