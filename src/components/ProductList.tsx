import { useState, useEffect } from 'react';
import { Card, Button, Modal, InputNumber, Radio, Form, Select } from 'antd';
import axios from 'axios';

const ProductList = ({ slots }) => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleOrder = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    await axios.post('/api/orders', {
      ...values,
      userId: 1, // Assurez-vous de gérer l'authentification et d'utiliser l'ID de l'utilisateur connecté
      products: selectedProducts.map(product => ({
        productId: product.id,
        quantity: product.quantity,
        price: product.price,
      })),
    });
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const addProductToOrder = (product, quantity) => {
    setSelectedProducts(prevProducts => [
      ...prevProducts.filter(p => p.id !== product.id),
      { ...product, quantity },
    ]);
  };

  return (
    <div className="product-list">
      {products.map(product => (
        <Card key={product.id} title={product.name}>
          <img alt={product.name} src={`data:image/png;base64,${product.imageBase64}`} style={{ width: '100%', height: 'auto' }} />
          <p>{product.description}</p>
          <p>Prix : {product.price} €</p>
          {product.unit === 'WEIGHT' && <p>Poids : {product.weight} kg</p>}
          <p>Catégorie : {product.category.name}</p>
          <Radio.Group onChange={e => addProductToOrder(product, e.target.value)} value={product.quantity}>
            <Radio value={1}>1</Radio>
            <Radio value={2}>2</Radio>
            <Radio value={3}>3</Radio>
          </Radio.Group>
        </Card>
      ))}
      <Button type="primary" onClick={handleOrder}>Passer la commande</Button>
      <Modal title="Passer la commande" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="slotId" label="Créneau" rules={[{ required: true }]}>
            <Select>
              {slots.map(slot => (
                <Select.Option key={slot.id} value={slot.id}>
                  {new Date(slot.dateTime).toLocaleString()} (disponibles : {slot.availableOrders})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductList;
