// pages/index.tsx
import { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb, Card, Col, Row, Button } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Header, Content, Footer } = Layout;

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    // Simuler l'appel API pour obtenir les produits
    const fetchProducts = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center justify-between">
        <div className="logo text-white text-2xl font-bold">Local Products</div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link href="/">Accueil</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/cart">
              <ShoppingCartOutlined /> Panier
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link href="/profile">
              <UserOutlined /> Profil
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }} className="mt-6">
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Accueil</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content bg-white p-6 rounded-md shadow-md">
          <Row gutter={16}>
            {products.map((product) => (
              <Col key={product.id} span={8}>
                <Card
                  hoverable
                  cover={<img alt={product.name} src={product.imageUrl} />}
                  actions={[
                    <Link href={`/product/${product.id}`}>
                      <Button type="primary">Voir Détails</Button>
                    </Link>,
                  ]}
                >
                  <Card.Meta
                    title={product.name}
                    description={`$${product.price}`}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Local Products ©2024 Created by Pitou
      </Footer>
    </Layout>
  );
};

export default Home;
