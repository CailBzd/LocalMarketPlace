import { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Select } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import AppLayout from '../components/Layout';

const { Title } = Typography;
const { Option } = Select;

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('common');

  const handleSignup = async (values) => {
    setLoading(true);
    try {
      await axios.post('/api/auth/signup', values);
      message.success(t('signup_success'));
      const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result.error) {
        message.error(t('login_error'));
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      message.error(t('signup_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="login-container">
        <Card className="login-card">
          <Title level={2} className="login-title">
            {t('signup')}
          </Title>
          <Form layout="vertical" onFinish={handleSignup}>
            <Form.Item name="name" label={t('name')} rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="email" label={t('email')} rules={[{ required: true, type: 'email' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="password" label={t('password')} rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item name="role" label={t('role')} rules={[{ required: true }]}>
              <Select placeholder={t('role')}>
                <Option value="USER">{t('client')}</Option>
                <Option value="MERCHANT">{t('merchant')}</Option>
              </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} className="login-button">
              {t('signup')}
            </Button>
          </Form>
          <div className="login-links">
            <Link href="/login">{t('login')}</Link>
            <Link href="/forgot-password">{t('forgot_password')}</Link>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default SignupPage;
