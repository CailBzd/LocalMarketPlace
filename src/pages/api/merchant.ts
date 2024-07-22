import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const merchants = await prisma.user.findMany({
      where: {
        role: {
          name: 'MERCHANT',
        },
      },
      select: {
        id: true,
        name: true,
        latitude: true,
        longitude: true,
        address: true,
        city: true,
        postalCode: true,
        department: true,
        country: true,
        phoneNumber: true,
      },
    });

    res.status(200).json(merchants);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
