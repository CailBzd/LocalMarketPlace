// pages/index.js
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Local Marketplace</title>
        <meta name="description" content="Buy fresh and local products directly from producers" />
      </Head>

      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold">Welcome to Local Marketplace</h1>
        <p className="mt-4">Discover and buy fresh products from local producers.</p>
        <Link href="/products">
          <a className="text-blue-500">Browse Products</a>
        </Link>
      </main>
    </div>
  )
}
