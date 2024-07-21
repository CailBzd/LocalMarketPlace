import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const categories = await prisma.category.findMany();
      res.status(200).json(categories);
      break;
    case 'POST':
      const { name } = req.body;
      const category = await prisma.category.create({
        data: { name },
      });
      res.status(201).json(category);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
