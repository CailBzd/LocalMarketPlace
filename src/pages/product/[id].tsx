// pages/product/[id].tsx
import { GetServerSideProps } from 'next';
import { PrismaClient } from '@prisma/client';
import { Button, Layout, Card, Col, Row, Breadcrumb } from 'antd';
import Link from 'next/link';

const { Header, Content, Footer } = Layout;

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
  });
  return {
    props: { product },
  };
};

const ProductPage = ({ product }: { product: any }) => {
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
          <Breadcrumb.Item>
            <Link href="/">Accueil</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content bg-white p-6 rounded-md shadow-md">
          <Row gutter={16}>
            <Col span={12}>
              <Card cover={<img alt={product.name} src={product.imageUrl} />}>
                <Card.Meta title={product.name} description={product.description} />
                <div className="price">
                  <h2 className="text-2xl font-bold">${product.price}</h2>
                </div>
                <Button type="primary" block>
                  Ajouter au panier
                </Button>
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Local Products ©2024 Created by YourName
      </Footer>
    </Layout>
  );
};

export default ProductPage;
