import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row, Typography } from 'antd';
import AppLayout from '../components/Layout';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const Dashboard = () => {
  const [producers, setProducers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const { t } = useTranslation('common');

  useEffect(() => {
    if (session) {
      axios.get('/api/producers/nearby')
        .then(response => {
          setProducers(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching nearby producers', error);
          setLoading(false);
        });
    }
  }, [session]);

  if (!session) {
    return <p>{t('login_required')}</p>;
  }

  return (
    <AppLayout>
      <div className="dashboard-container">
        <Title level={2}>{t('nearby_producers')}</Title>
        {loading ? (
          <p>{t('loading')}</p>
        ) : (
          <Row gutter={16}>
            {producers.map((producer) => (
              <Col span={8} key={producer.id}>
                <Card title={producer.name}>
                  <p>{producer.email}</p>
                  <p>{producer.address}</p>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
