import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  // Simulation de l'envoi d'un email de récupération de mot de passe
  // Dans une application réelle, vous enverriez un email avec un lien de réinitialisation

  return res.status(200).json({ message: 'Password reset email sent' });
};
