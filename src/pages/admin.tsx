import UserList from '../components/UserList';
import AppLayout from '../components/Layout';

const AdminPage = () => {
  return (
    <AppLayout>
      <h1>Gestion des Utilisateurs</h1>
      <UserList />
    </AppLayout>
  );
};

export default AdminPage;
