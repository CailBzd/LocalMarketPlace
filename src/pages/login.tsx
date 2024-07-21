import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AppLayout from '../components/Layout';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post('/api/login', values);
      localStorage.setItem('token', data.token);
      message.success(t('login_success'));
      router.push('/');
    } catch (error) {
      message.error(t('login_error'));
    } finally {
      setLoading(false);
    }

  return (
    <AppLayout>
      <h1>{t('login')}</h1>
      <Form layout="vertical" onFinish={handleLogin}>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {t('login')}
        </Button>
      </Form>
      <div style={{ marginTop: 20 }}>
        <Link href="/forgot-password">{t('forgot_password')}</Link>
      </div>
      <div style={{ marginTop: 20 }}>
        <Link href="/signup">{t('signup')}</Link>
      </div>
    </AppLayout>
  );
};

export default LoginPage;
