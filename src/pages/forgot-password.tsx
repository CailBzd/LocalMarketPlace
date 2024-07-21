import { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import AppLayout from '../components/Layout';

const { Title } = Typography;

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('common');

  const handleForgotPassword = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post('/api/auth/forgot-password', values);
      message.success(data.message);
    } catch (error) {
      message.error(t('password_reset_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="login-container">
        <Card className="login-card">
          <Title level={2} className="login-title">
            {t('forgot_password')}
          </Title>
          <Form layout="vertical" onFinish={handleForgotPassword}>
            <Form.Item name="email" label={t('email')} rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="login-button">
              {t('send_reset_link')}
            </Button>
          </Form>
          <div className="login-links">
            <Link href="/login">{t('login')}</Link>
            <Link href="/signup">{t('signup')}</Link>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ForgotPasswordPage;
