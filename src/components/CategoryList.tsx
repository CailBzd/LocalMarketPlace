import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import axios from 'axios';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await axios.get('/api/categories');
    setCategories(data);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    await axios.post('/api/categories', values);
    fetchCategories();
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Ajouter une catégorie
      </Button>
      <Table dataSource={categories} columns={[
        {
          title: 'Nom',
          dataIndex: 'name',
          key: 'name',
        },
      ]} />
      <Modal title="Ajouter une catégorie" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Nom" rules={[{ required: true, message: 'Veuillez entrer le nom de la catégorie' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryList;
