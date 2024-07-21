import { useState } from 'react';
import { List, Input, Button, Form, message } from 'antd';
import axios from 'axios';
import { useTranslation } from 'next-i18next';

const ProducerList = () => {
  const { t } = useTranslation('common');
  const [producers, setProducers] = useState([]);

  const fetchProducers = async (values) => {
    try {
      const { data } = await axios.get('/api/producers', { params: values });
      setProducers(data);
    } catch (error) {
      message.error('Failed to fetch producers');
    }
  };

  const handleSearch = (values) => {
    fetchProducers(values);
  };

  return (
    <div>
      <Form layout="inline" onFinish={handleSearch}>
        <Form.Item name="address" label={t('address')}>
          <Input placeholder={t('address')} />
        </Form.Item>
        <Form.Item name="radius" label={t('radius')}>
          <Input type="number" placeholder={t('radius')} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          {t('search')}
        </Button>
      </Form>
      <List
        itemLayout="horizontal"
        dataSource={producers}
        renderItem={(producer) => (
          <List.Item>
            <List.Item.Meta
              title={`${t('producer_name')}: ${producer.name}`}
              description={`${t('address')}: ${producer.address} (${t('distance')}: ${producer.distance} km)`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ProducerList;
