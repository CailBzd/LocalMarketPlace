import { Card, Avatar, Typography, Form, Input, Button, message } from 'antd';
import { useSession } from 'next-auth/react';
import AppLayout from '../components/Layout';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { User } from '../types/types';
import withAuth from '@/components/WithAuth';

const { Title, Text } = Typography;

const ProfilePage = () => {
  const { data: session } = useSession();
  const { t } = useTranslation('common');
  const [loading, setLoading] = useState(false);

  const user = session.user as User;

  const initialValues = {
    name: user.name || '',
    email: user.email || '',
    address: user.address || '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('name_required')),
    email: Yup.string().email(t('invalid_email')).required(t('email_required')),
    address: Yup.string(),
  });

  const handleUpdateProfile = async (values) => {
    setLoading(true);
    try {
      await axios.put('/api/profile', values);
      message.success(t('profile_updated'));
    } catch (error) {
      message.error(t('profile_update_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <Card style={{ maxWidth: 600, margin: '0 auto' }}>
        <Avatar size={64} src={session.user.image} />
        <Title level={2}>{user.name}</Title>
        <Text>{t('email')}: {user.email}</Text>
        <Text>{t('address')}: {user.address}</Text>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleUpdateProfile}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item label={t('name')} help={touched.name && errors.name} validateStatus={touched.name && errors.name ? 'error' : ''}>
                <Input name="name" value={values.name} onChange={handleChange} />
              </Form.Item>
              <Form.Item label={t('email')} help={touched.email && errors.email} validateStatus={touched.email && errors.email ? 'error' : ''}>
                <Input name="email" value={values.email} onChange={handleChange} />
              </Form.Item>
              <Form.Item label={t('address')} help={touched.address && errors.address} validateStatus={touched.address && errors.address ? 'error' : ''}>
                <Input name="address" value={values.address} onChange={handleChange} />
              </Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                {t('update_profile')}
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </AppLayout>
  );
};

export default withAuth(ProfilePage);
