import { Layout, Menu, Button,Image } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

const { Header, Content, Footer } = Layout;

const SECRET_KEY = 'your_secret_key'; // Utilisez une variable d'environnement pour cela

const AppLayout = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  const { t } = useTranslation('common');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwt.verify(token, SECRET_KEY);
        setIsAuthenticated(true);
        setRole(decoded.role);
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setRole('');
    router.push('/');
  };

  let menuItems = [];

  if (isAuthenticated) {
    menuItems = [
      {
        key: '/profile',
        label: <Link href="/profile">{t('profile')}</Link>,
      },
      ...(role === 'ADMIN' ? [
        { key: '/admin', label: <Link href="/admin">{t('admin')}</Link> }
      ] : []),
      ...(role === 'MERCHANT' ? [
        { key: '/merchant', label: <Link href="/merchant">{t('merchant')}</Link> }
      ] : []),
      ...(role === 'USER' ? [
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
