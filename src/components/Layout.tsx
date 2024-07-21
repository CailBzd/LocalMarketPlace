import { Layout, Menu, Button, Image } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useSession, signOut } from 'next-auth/react';
import UserAvatar from './UserAvatar';

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  const { t } = useTranslation('common');
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  let menuItems = [];

  if (status === 'authenticated') {
    menuItems = [
      {
        key: '/profile',
        label: <Link href="/profile">{t('profile')}</Link>,
      },
      ...(session.user.role === 'ADMIN' ? [
        { key: '/admin', label: <Link href="/admin">{t('admin')}</Link> }
      ] : []),
      ...(session.user.role === 'MERCHANT' ? [
        { key: '/merchant', label: <Link href="/merchant">{t('merchant')}</Link> }
      ] : []),
      ...(session.user.role === 'USER' ? [
        { key: '/client', label: <Link href="/client">{t('client')}</Link> }
      ] : []),
      {
        key: '/logout',
        label: <Button type="link" onClick={handleLogout}>{t('logout')}</Button>,
      },
    ];
  } else {
    menuItems = [
      {
        key: '/login',
        label: <Link href="/login">{t('login')}</Link>,
      },
      {
        key: '/signup',
        label: <Link href="/signup">{t('signup')}</Link>,
      },
    ];
  }

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/images/legumes_frais.png" alt="Logo" width={50} height={50} preview={false} />
          <div className="logo text-white text-2xl font-bold ml-2">Local Products</div>
        </div>
        <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]} items={menuItems} />
        {status === 'authenticated' && <UserAvatar handleLogout={handleLogout} />}
      </Header>
      <Content style={{ padding: '0 50px' }} className="mt-6">
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Local Products ©2024 Created by Pitou
      </Footer>
    </Layout>
  );
};

export default AppLayout;
