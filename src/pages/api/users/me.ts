import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  // Assurez-vous que la méthode est GET
  if (method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Vérifiez et décodez le token JWT
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

    // Trouvez l'utilisateur dans la base de données
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        profile: true, // Incluez les informations de profil, si nécessaire
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Retournez les informations de l'utilisateur
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
