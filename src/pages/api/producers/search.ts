import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import { getDistance } from 'geolib';
import { Producer } from '../../../types/types';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { name, city, category, maxDistance } = req.query;
  const userId = session.user.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const producers = await prisma.user.findMany({
      where: {
        role: { name: 'MERCHANT' },
        name: name ? { contains: name as string, mode: 'insensitive' } : undefined,
        address: city ? { contains: city as string, mode: 'insensitive' } : undefined,
        products: category ? { some: { category: { name: category as string } } } : undefined,
      },
      include: { products: { include: { category: true } }, role: true },
    });

    const filteredProducers = producers.filter(producer => {
      if (maxDistance) {
        const distance = getDistance(
          { latitude: user.latitude, longitude: user.longitude },
          { latitude: producer.latitude, longitude: producer.longitude }
        );
        return distance / 1000 <= Number(maxDistance);
      }
      return true;
    });

    res.status(200).json(filteredProducers);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
