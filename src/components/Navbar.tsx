import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <a className="text-white text-lg font-bold">Local Products</a>
        </Link>
        <div>
          <Link href="/cart">
            <a className="text-white mr-4">Panier</a>
          </Link>
          <Link href="/profile">
            <a className="text-white">Profil</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
