import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

interface CheckoutButtonProps {
  items: { name: string; price: number; quantity: number }[]
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ items }) => {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    const stripe = await stripePromise
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    })
    const session = await response.json()
    await stripe?.redirectToCheckout({ sessionId: session.id })
    setLoading(false)
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      {loading ? 'Processing...' : 'Checkout'}
    </button>
  )
}

export default CheckoutButton
