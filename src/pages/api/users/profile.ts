import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { name, email } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { name, email },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
