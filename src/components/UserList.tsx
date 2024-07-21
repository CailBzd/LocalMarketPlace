import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data } = await axios.get('/api/users');
    setUsers(data);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    await axios.post('/api/users', values);
    fetchUsers();
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Ajouter un utilisateur
      </Button>
      <Table dataSource={users} columns={[
        {
          title: 'Nom',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Rôle',
          dataIndex: 'role',
          key: 'role',
        },
      ]} />
      <Modal title="Ajouter un utilisateur" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Nom" rules={[{ required: true, message: 'Veuillez entrer le nom' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Veuillez entrer un email valide' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Mot de passe" rules={[{ required: true, message: 'Veuillez entrer un mot de passe' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="role" label="Rôle" rules={[{ required: true, message: 'Veuillez sélectionner un rôle' }]}>
            <Select>
              <Option value="USER">Utilisateur</Option>
              <Option value="MERCHANT">Commerçant</Option>
              <Option value="ADMIN">Administrateur</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserList;
