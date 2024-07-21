import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, InputNumber, DatePicker } from 'antd';
import axios from 'axios';

const SlotManager = () => {
  const [slots, setSlots] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    const { data } = await axios.get('/api/slots');
    setSlots(data);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    await axios.post('/api/slots', values);
    fetchSlots();
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Ajouter un créneau
      </Button>
      <Table dataSource={slots} columns={[
        {
          title: 'Date et Heure',
          dataIndex: 'dateTime',
          key: 'dateTime',
          render: (text) => new Date(text).toLocaleString(),
        },
        {
          title: 'Nombre maximum de commandes',
          dataIndex: 'maxOrders',
          key: 'maxOrders',
        },
        {
          title: 'Commandes disponibles',
          dataIndex: 'availableOrders',
          key: 'availableOrders',
        },
      ]} />
      <Modal title="Ajouter un créneau" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="dateTime" label="Date et Heure" rules={[{ required: true, message: 'Veuillez sélectionner la date et l\'heure' }]}>
            <DatePicker showTime />
          </Form.Item>
          <Form.Item name="maxOrders" label="Nombre maximum de commandes" rules={[{ required: true, message: 'Veuillez entrer le nombre maximum de commandes' }]}>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name="userId" hidden initialValue={1} />
        </Form>
      </Modal>
    </div>
  );
};

export default SlotManager;
