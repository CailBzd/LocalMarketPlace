import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const orders = await prisma.order.findMany({
      include: {
        products: true,
      },
    });
    res.status(200).json(orders);
  } else if (req.method === 'POST') {
    const { products, total, userId } = req.body;

    try {
      const order = await prisma.order.create({
        data: {
          total,
          userId,
          products: {
            connect: products.map((product: any) => ({ id: product.id })),
          },
        },
      });
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: 'Order creation failed' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end('Method Not Allowed');
  }
}
