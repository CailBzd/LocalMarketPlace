// pages/products.js
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('/api/products').then(response => {
      setProducts(response.data)
    })
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold">Products</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {products.map(product => (
          <div key={product.id} className="border p-4">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <h2 className="text-2xl mt-2">{product.name}</h2>
            <p className="mt-2">{product.description}</p>
            <p className="mt-2 text-green-500">{product.price} $</p>
          </div>
        ))}
      </div>
    </div>
  )
}
