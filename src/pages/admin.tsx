import UserList from '../components/UserList';
import AppLayout from '../components/Layout';
import { useTranslation } from 'react-i18next';

const AdminPage = () => {
  const { t } = useTranslation('common');
  return (
    <AppLayout>
    <h1>{t('admin')}</h1>
      <UserList />
    </AppLayout>
  );
};

export default AdminPage;
