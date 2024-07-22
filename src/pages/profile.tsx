import { Card, Avatar, Typography, Form, Input, Button, message } from 'antd';
import { useSession } from 'next-auth/react';
import AppLayout from '../components/Layout';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import withAuth from '../components/WithAuth';
import { User } from '../types/types';

const { Title, Text } = Typography;

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const { t } = useTranslation('common');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<User>(null);

  useEffect(() => {
    if (session) {
      axios.get('/api/users/profile')
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => {
          console.error('Error fetching profile data', error);
        });
    }
  }, [session]);

  const initialValues = {
    name: userData?.name || '',
    email: userData?.email || '',
    address: userData?.address || '',
    postalCode: userData?.postalCode || '',
    city: userData?.city || '',
    department: userData?.department || '',
    country: userData?.country || '',
    phoneNumber: userData?.phoneNumber || '',
    shopName: userData?.shopName || '',
    shopDescription: userData?.shopDescription || '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('name_required')),
    email: Yup.string().email(t('invalid_email')).required(t('email_required')),
    address: Yup.string(),
    postalCode: Yup.string(),
    city: Yup.string(),
    department: Yup.string(),
    country: Yup.string(),
    phoneNumber: Yup.string().matches(/^[0-9]{10}$/, t('invalid_phone_number')),
    shopName: Yup.string(),
    shopDescription: Yup.string(),
  });

  const handleUpdateProfile = async (values) => {
    setLoading(true);
    try {
      await axios.put('/api/users/profile', values);
      message.success(t('profile_updated'));
    } catch (error) {
      message.error(t('profile_update_error'));
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>{t('login_required')}</p>;
  }


  return (
    <AppLayout>
      {userData && (
        <Card style={{ maxWidth: 600, margin: '0 auto' }}>
          <Avatar size={64} src={session.user.image} />
          <Title level={2}>{userData.name}</Title>
          <Text>{t('email')}: {userData.email}</Text>

         
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleUpdateProfile}
            enableReinitialize
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
                <Form.Item label={t('postal_code')} help={touched.postalCode && errors.postalCode} validateStatus={touched.postalCode && errors.postalCode ? 'error' : ''}>
                  <Input name="postalCode" value={values.postalCode} onChange={handleChange} />
                </Form.Item>
                <Form.Item label={t('city')} help={touched.city && errors.city} validateStatus={touched.city && errors.city ? 'error' : ''}>
                  <Input name="city" value={values.city} onChange={handleChange} />
                </Form.Item>
                <Form.Item label={t('department')} help={touched.department && errors.department} validateStatus={touched.department && errors.department ? 'error' : ''}>
                  <Input name="department" value={values.department} onChange={handleChange} />
                </Form.Item>
                <Form.Item label={t('country')} help={touched.country && errors.country} validateStatus={touched.country && errors.country ? 'error' : ''}>
                  <Input name="country" value={values.country} onChange={handleChange} />
                </Form.Item>
                <Form.Item label={t('phone_number')} help={touched.phoneNumber && errors.phoneNumber} validateStatus={touched.phoneNumber && errors.phoneNumber ? 'error' : ''}>
                  <Input name="phoneNumber" value={values.phoneNumber} onChange={handleChange} />
                </Form.Item>
                {userData.role?.name === 'MERCHANT' && (
                  <>
                    <Form.Item label={t('shop_name')} help={touched.shopName && errors.shopName} validateStatus={touched.shopName && errors.shopName ? 'error' : ''}>
                      <Input name="shopName" value={values.shopName} onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label={t('shop_description')} help={touched.shopDescription && errors.shopDescription} validateStatus={touched.shopDescription && errors.shopDescription ? 'error' : ''}>
                      <Input name="shopDescription" value={values.shopDescription} onChange={handleChange} />
                    </Form.Item>
                  </>
                )}
                <Button type="primary" htmlType="submit" loading={loading}>
                  {t('update_profile')}
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      )}
    </AppLayout>
  );
};

export default withAuth(ProfilePage);
