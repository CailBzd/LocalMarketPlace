import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } else if (req.method === 'POST') {
    const { name, description, price, imageUrl, categoryId } = req.body;

    try {
      const product = await prisma.product.create({
        data: {
          name,
          description,
          price,
          imageUrl,
          categoryId,
        },
      });
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Product creation failed' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end('Method Not Allowed');
  }
}
