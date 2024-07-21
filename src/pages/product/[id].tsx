import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const product = await prisma.product.findUnique({
          where: { id: Number(id) },
          include: { category: true, user: true },
        });
        if (!product) {
          res.status(404).json({ error: 'Product not found' });
          return;
        }
        res.status(200).json(product);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching product' });
      }
      break;
    case 'PUT':
      try {
        const { name, description, price, unit, weight, imageBase64, categoryId, userId } = req.body;
        const product = await prisma.product.update({
          where: { id: Number(id) },
          data: { name, description, price, unit, weight, imageBase64, categoryId, userId },
        });
        res.status(200).json(product);
      } catch (error) {
        res.status(500).json({ error: 'Error updating product' });
      }
      break;
    case 'DELETE':
      try {
        await prisma.product.delete({
          where: { id: Number(id) },
        });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Error deleting product' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
