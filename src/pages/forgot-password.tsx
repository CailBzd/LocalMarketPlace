import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import AppLayout from '../components/Layout';

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('common');

  const handleForgotPassword = async (values) => {
    setLoading(true);
    try {
      // Simulation de la récupération du mot de passe
      message.success(t('password_reset_email_sent'));
    } catch (error) {
      message.error(t('password_reset_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <h1>{t('forgot_password')}</h1>
      <Form layout="vertical" onFinish={handleForgotPassword}>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {t('send_reset_link')}
        </Button>
      </Form>
    </AppLayout>
  );
};

export default ForgotPasswordPage;
