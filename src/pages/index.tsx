import { GetServerSideProps } from 'next';
import { PrismaClient } from '@prisma/client';
import ProductCard from '../components/ProductCard';

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await prisma.product.findMany();
  return {
    props: { products },
  };
};

const Home = ({ products }: { products: any[] }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Produits Locaux</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
