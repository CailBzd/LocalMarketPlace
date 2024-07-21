import { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { signIn } from 'next-auth/react';
import AppLayout from '../components/Layout';

const { Title } = Typography;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('common');

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result.error) {
        message.error(t('login_error'));
      } else {
        message.success(t('login_success'));
        router.push('/dashboard');
      }
    } catch (error) {
      message.error(t('login_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="login-container">
        <Card className="login-card">
          <Title level={2} className="login-title">
            {t('login')}
          </Title>
          <Form layout="vertical" onFinish={handleLogin}>
            <Form.Item name="email" label={t('email')} rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="password" label={t('password')} rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="login-button">
              {t('login')}
            </Button>
          </Form>
          <div className="login-links">
            <Link href="/forgot-password">{t('forgot_password')}</Link>
            <Link href="/signup">{t('signup')}</Link>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default LoginPage;
