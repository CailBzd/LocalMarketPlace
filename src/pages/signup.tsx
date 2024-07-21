import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import AppLayout from '../components/Layout';

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('common');

  const handleSignup = async (values) => {
    setLoading(true);
    try {
      // Simulation de l'inscription
      localStorage.setItem('token', 'fakeToken');
      message.success(t('signup_success'));
      router.push('/');
    } catch (error) {
      message.error(t('signup_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <h1>{t('signup')}</h1>
      <Form layout="vertical" onFinish={handleSignup}>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {t('signup')}
        </Button>
      </Form>
    </AppLayout>
  );
};

export default SignupPage;
