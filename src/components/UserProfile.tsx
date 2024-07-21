import { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const UserProfile = () => {
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from API
    const fetchUser = async () => {
      const { data } = await axios.get('/api/users/me'); // Assume there's an API endpoint for fetching the current user
      setUser(data);
      form.setFieldsValue(data);
    };

    fetchUser();
  }, [form]);

  const handleSubmit = async (values) => {
    try {
      await axios.put('/api/users/me', values); // Assume there's an API endpoint for updating the current user
      message.success('Profile updated successfully');
    } catch (error) {
      message.error('Failed to update profile');
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please enter your address' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="latitude" label="Latitude" rules={[{ required: true, message: 'Please enter your latitude' }]}>
        <Input type="number" step="0.000001" />
      </Form.Item>
      <Form.Item name="longitude" label="Longitude" rules={[{ required: true, message: 'Please enter your longitude' }]}>
        <Input type="number" step="0.000001" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Update Profile
      </Button>
    </Form>
  );
};

export default UserProfile;

