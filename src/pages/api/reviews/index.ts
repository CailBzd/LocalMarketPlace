import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { rating, comment, productId, userId } = req.body;

    try {
      const review = await prisma.review.create({
        data: {
          rating,
          comment,
          productId,
          userId,
        },
      });
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ error: 'Review creation failed' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
