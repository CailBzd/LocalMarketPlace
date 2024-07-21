import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const { data } = await axios.post('/api/users/login', values);
      localStorage.setItem('token', data.token);
      message.success('Logged in successfully');
      router.push('/');
    } catch (error) {
      message.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" onFinish={handleLogin}>
      <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading}>Login</Button>
    </Form>
  );
};

export default LoginPage;
