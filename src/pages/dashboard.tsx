import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Input, Button, Card, Select, Typography, List, Form } from 'antd';
import axios from 'axios';
import AppLayout from '../components/Layout';
import { useTranslation } from 'react-i18next';
import { Producer } from '../types/types';
import dynamic from 'next/dynamic';

const { Title } = Typography;
const { Option } = Select;

const DashboardPage = () => {
  const { data: session } = useSession();
  const { t } = useTranslation('common');
  const [producers, setProducers] = useState<Producer[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useState({
    name: '',
    city: '',
    category: '',
    maxDistance: '',
  });

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/producers/search', { params: searchParams });
      setProducers(response.data);
    } catch (error) {
      console.error('Error fetching producers', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      handleSearch();
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      const fetchUserLocation = async () => {
        try {
          const response = await axios.get('/api/users/profile');
          const { latitude, longitude } = response.data;
          setUserLocation([latitude, longitude]);
        } catch (error) {
          console.error('Error fetching user location:', error);
        }
      };

      fetchUserLocation();
    }
  }, [session]);


  if (!session) {
    return <p>{t('login_required')}</p>;
  }

  // Dynamically import Map component to avoid SSR issues
  const Map = dynamic(() => import('../components/Map'), { ssr: false });

  return (
    <AppLayout>
      <Title level={2}>{t('discover_producers')}</Title>
      <Form layout="vertical" onFinish={handleSearch}>
        <Form.Item label={t('name')}>
          <Input
            value={searchParams.name}
            onChange={(e) => setSearchParams({ ...searchParams, name: e.target.value })}
          />
        </Form.Item>
        <Form.Item label={t('city')}>
          <Input
            value={searchParams.city}
            onChange={(e) => setSearchParams({ ...searchParams, city: e.target.value })}
          />
        </Form.Item>
        <Form.Item label={t('category')}>
          <Select
            value={searchParams.category}
            onChange={(value) => setSearchParams({ ...searchParams, category: value })}
          >
            <Option value="">{t('all')}</Option>
            <Option value="Boulangerie">{t('bakery')}</Option>
            <Option value="Boucherie">{t('butchery')}</Option>
            <Option value="Primeur">{t('greengrocer')}</Option>
            <Option value="Fromagerie">{t('cheese_shop')}</Option>
            <Option value="Poissonnerie">{t('fish_shop')}</Option>
          </Select>
        </Form.Item>
        <Form.Item label={t('radius')}>
          <Input
            type="number"
            value={searchParams.maxDistance}
            onChange={(e) => setSearchParams({ ...searchParams, maxDistance: e.target.value })}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {t('search')}
        </Button>
      </Form>

      <List
        dataSource={producers}
        renderItem={(producer: Producer) => (
          <List.Item>
            <Card title={producer.name}>
              <p>{t('address')}: {producer.address}</p>
              <p>{t('category')}: {producer.products.map(product => product.category.name).join(', ')}</p>
            </Card>
          </List.Item>
        )}
      />

<Map userLocation={userLocation} />
    </AppLayout>
  );
};

export default DashboardPage;
