import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'; // Utilisez une variable d'environnement pour cela

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  // Simulation de la vérification des identifiants
  if (email === 'user@example.com' && password === 'password') {
    // Simuler différents rôles
    const user = { id: 1, role: 'USER' }; // Changez à 'ADMIN' ou 'MERCHANT' pour tester différents rôles

    // Générer un token JWT
    const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });

    return res.status(200).json({ token });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
};
