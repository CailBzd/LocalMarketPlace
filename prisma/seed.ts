import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

async function main() {
  // Créer des catégories fictives
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Fruits' },
      { name: 'Légumes' },
      { name: 'Produits Laitiers' },
      { name: 'Viande' },
      { name: 'Boissons' },
      { name: 'Boulangerie' },
      { name: 'Autres' },
    ],
  });

  // Créer des utilisateurs fictifs
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123', // Assurez-vous d'utiliser un hachage de mot de passe sécurisé en production
      role: 'USER',
    },
  });

  // Lire une image en base64
  const imagePath = join(__dirname, '../public/images/example.png');
  const imageBase64 = readFileSync(imagePath, 'base64');

  // Créer des produits fictifs
  const products = await prisma.product.createMany({
    data: [
      {
        name: 'Pomme',
        description: 'Une pomme fraîche et juteuse',
        price: 1.5,
        unit: 'PIECE',
        imageBase64,
        categoryId: 1, // Assurez-vous que les IDs correspondent aux catégories créées
        userId: user.id,
      },
      {
        name: 'Carotte',
        description: 'Une carotte bio et croquante',
        price: 0.5,
        unit: 'WEIGHT',
        weight: 0.2,
        imageBase64,
        categoryId: 2,
        userId: user.id,
      },
    ],
  });

  console.log('Données fictives insérées avec succès');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
