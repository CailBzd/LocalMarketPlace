import Link from 'next/link';

const ProductCard = ({ product }: { product: any }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-md" />
      <h2 className="text-xl font-bold mt-2">{product.name}</h2>
      <p className="text-gray-700">{product.description}</p>
      <p className="text-lg font-semibold mt-2">${product.price}</p>
      <Link href={`/product/${product.id}`}>
        <a className="block mt-4 text-center bg-blue-500 text-white py-2 rounded-md">Voir Détails</a>
      </Link>
    </div>
  );
};

export default ProductCard;
