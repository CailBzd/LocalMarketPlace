import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

/**
 * @swagger
 * /api/products:
 *   get:
 *     description: Retourne tous les produits
 *     responses:
 *       200:
 *         description: Liste des produits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   unit:
 *                     type: string
 *                   weight:
 *                     type: number
 *                   imageBase64:
 *                     type: string
 *                   categoryId:
 *                     type: integer
 *                   userId:
 *                     type: integer
 *   post:
 *     description: Crée un nouveau produit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               unit:
 *                 type: string
 *               weight:
 *                 type: number
 *               imageBase64:
 *                 type: string
 *               categoryId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 *       500:
 *         description: Erreur lors de la création du produit
 */

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const products = await prisma.product.findMany({
          include: {
            category: true,
            user: true,
          },
        });
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
      }
      break;
    case 'POST':
      try {
        const { name, description, price, unit, weight, imageBase64, categoryId, userId } = req.body;
        const product = await prisma.product.create({
          data: {
            name,
            description,
            price,
            unit,
            weight,
            imageBase64,
            category: { connect: { id: categoryId } },
            user: { connect: { id: userId } },
          },
        });
        res.status(201).json(product);
      } catch (error) {
        res.status(500).json({ error: 'Error creating product' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
