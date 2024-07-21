import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const { Header, Content, Footer } = Layout;

const AppLayout = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  const { t } = useTranslation('common');

  const menuItems = [
    {
      key: '/',
      label: <Link href="/">{t('common:home')}</Link>,
    },
    {
      key: '/login',
      label: <Link href="/login">{t('login')}</Link>,
    },
    {
      key: '/profile',
      label: <Link href="/profile">{t('profile')}</Link>,
    },
    {
      key: '/admin',
      label: <Link href="/admin">{t('admin')}</Link>,
    },
    {
      key: '/merchant',
      label: <Link href="/merchant">{t('merchant')}</Link>,
    },
    {
      key: '/client',
      label: <Link href="/client">{t('client')}</Link>,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center justify-between">
        <div className="logo text-white text-2xl font-bold">Local Products</div>
        <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]} items={menuItems} />
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
