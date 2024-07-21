import { List, Card, Typography } from 'antd';
import { useSession } from 'next-auth/react';
import AppLayout from '../components/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Order } from '../types/types';
import withAuth from '@/components/WithAuth';

const { Title } = Typography;

const OrdersPage = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const { t } = useTranslation('common');

  useEffect(() => {
    if (session) {
      axios.get('/api/orders')
        .then(response => {
          setOrders(response.data);
        })
        .catch(error => {
          console.error('Error fetching orders', error);
        });
    }
  }, [session]);

  return (
    <AppLayout>
      <Title level={2}>{t('orders')}</Title>
      <List
        dataSource={orders}
        renderItem={order => (
          <List.Item>
            <Card title={`${t('order')} ${order.id}`}>
              <p>{t('date')}: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>{t('total')}: {order.totalPrice} €</p>
              {/* Ajoutez plus de détails sur la commande si nécessaire */}
            </Card>
          </List.Item>
        )}
      />
    </AppLayout>
  );
};

export default withAuth(OrdersPage);
