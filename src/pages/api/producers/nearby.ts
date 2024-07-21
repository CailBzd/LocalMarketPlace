import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';
import { getDistance } from 'geolib';
import { User, Producer } from '../../../types/types';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  }) as User;

  if (!user || !user.latitude || !user.longitude) {
    return res.status(400).json({ error: 'User location not set' });
  }

  const allProducers = await prisma.user.findMany({
    where: { role: 'MERCHANT' },
  }) as Producer[];

  const nearbyProducers = allProducers.filter((producer) => {
    if (!producer.latitude || !producer.longitude) return false;

    const distance = getDistance(
      { latitude: user.latitude, longitude: user.longitude },
      { latitude: producer.latitude, longitude: producer.longitude }
    );

    // Distance in meters
    return distance <= 10000;
  });

  res.json(nearbyProducers);
}
