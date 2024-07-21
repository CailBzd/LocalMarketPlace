import SlotManager from '../../components/SlotManager';
import ProductList from '../../components/ProductList';
import AppLayout from '../../components/Layout';

const MerchantPage = () => {
  return (
    <AppLayout>
      <h1>Gestion des Produits et des Créneaux</h1>
      <SlotManager />
      <ProductList slots={[]} />
    </AppLayout>
  );
};

export default MerchantPage;
