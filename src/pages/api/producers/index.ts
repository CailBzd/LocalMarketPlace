import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Input, Button, Card, Select, Typography, List, Form } from 'antd';
import axios from 'axios';
import AppLayout from '../../components/pLayout';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;
const { Option } = Select;

const ProducersPage = () => {
  const { data: session } = useSession();
  const { t } = useTranslation('common');
  const [producers, setProducers] = useState([]);
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

  if (!session) {
    return <p>{t('login_required')}</p>;
  }

  return (
    <AppLayout>
      <Title level={2}>{t('discover_producers')}</Title>
      <Form layout="vertical" onFinish={handleSearch}>
        <
