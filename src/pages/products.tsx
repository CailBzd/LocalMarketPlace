import { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    axios.get('/api/products').then(response => {
      setProducts(response.data)
    })
  }, [])

  return (
    <Layout>
      <h1 className="text-4xl font-bold">Products</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Layout>
  )
}

export default Products
