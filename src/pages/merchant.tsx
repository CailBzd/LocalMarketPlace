import AppLayout from '../components/Layout';
import { useTranslation } from 'react-i18next';

const MerchantPage = () => {
  const { t } = useTranslation();

  return (
    <AppLayout>
      <h1>{t('merchant')}</h1>
      <p>Merchant specific functionality here.</p>
    </AppLayout>
  );
};

export default MerchantPage;
