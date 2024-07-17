import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalPrice);
  }, []);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const { data } = await axios.post('/api/stripe/create-payment-intent', { amount: total * 100 });

    const result = await stripe!.redirectToCheckout({
      sessionId: data.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Panier</h1>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl">{item.name}</h2>
            <p className="text-gray-700">${item.price}</p>
          </div>
          <p>Quantité: {item.quantity}</p>
          <p>Total: ${item.price * item.quantity}</p>
        </div>
      ))}
      <div className="flex justify-between items-center mt-8">
        <h2 className="text-xl font-bold">Total: ${total}</h2>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md" onClick={handleCheckout}>
          Payer
        </button>
      </div>
    </div>
  );
};

export default Cart;
