import { GetServerSideProps } from 'next';
import { PrismaClient } from '@prisma/client';

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover rounded-md" />
      <p className="text-gray-700">{product.description}</p>
      <p className="text-lg font-semibold mt-2">${product.price}</p>
      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md">Ajouter au panier</button>
    </div>
  );
};

export default ProductPage;
