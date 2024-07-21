import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const slots = await prisma.slot.findMany();
        res.status(200).json(slots);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching slots' });
      }
      break;
    case 'POST':
      try {
        const { dateTime, maxOrders, userId } = req.body;
        const slot = await prisma.slot.create({
          data: {
            dateTime: new Date(dateTime),
            maxOrders,
            availableOrders: maxOrders,
            user: { connect: { id: userId } },
          },
        });
        res.status(201).json(slot);
      } catch (error) {
        res.status(500).json({ error: 'Error creating slot' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
