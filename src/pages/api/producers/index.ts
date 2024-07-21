import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import geolib from 'geolib';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address, radius } = req.query;

  if (!address || !radius) {
    return res.status(400).json({ error: 'Address and radius are required' });
  }

  const user = await prisma.user.findUnique({ where: { address: String(address) } });
  if (!user || !user.latitude || !user.longitude) {
    return res.status(404).json({ error: 'User address not found or incomplete' });
  }

  const producers = await prisma.user.findMany({
    where: { role: 'MERCHANT' },
  });

  const nearbyProducers = producers
    .map((producer) => {
      if (!producer.latitude || !producer.longitude) return null;
      const distance = geolib.getDistance(
        { latitude: user.latitude, longitude: user.longitude },
        { latitude: producer.latitude, longitude: producer.longitude }
      );
      return { ...producer, distance: distance / 1000 }; // convert to km
    })
    .filter((producer) => producer && producer.distance <= Number(radius));

  res.status(200).json(nearbyProducers);
}
