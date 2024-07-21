import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

  // Créer des rôles
  const roles = await prisma.role.createMany({
    data: [
      { name: 'ADMIN' },
      { name: 'USER' },
      { name: 'MERCHANT' },
    ],
  });

  // Créer des unités
  const units = await prisma.unit.createMany({
    data: [
      { name: 'PIECE' },
      { name: 'WEIGHT' },
      { name: 'LITER' },
    ],
  });

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

  // Récupérer les rôles et les unités créés
  const adminRole = await prisma.role.findUnique({ where: { name: 'ADMIN' } });
  const userRole = await prisma.role.findUnique({ where: { name: 'USER' } });
  const merchantRole = await prisma.role.findUnique({ where: { name: 'MERCHANT' } });

  const pieceUnit = await prisma.unit.findUnique({ where: { name: 'PIECE' } });
  const weightUnit = await prisma.unit.findUnique({ where: { name: 'WEIGHT' } });
  const literUnit = await prisma.unit.findUnique({ where: { name: 'LITER' } });

  if (!adminRole || !userRole || !merchantRole || !pieceUnit || !weightUnit || !literUnit) {
    throw new Error('Required role or unit not found');
  }

  // Hasher les mots de passe
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);
  const merchantPassword = await bcrypt.hash('merchant123', 10);

 // Créer des utilisateurs fictifs
 const admin = await prisma.user.create({
  data: {
    name: 'Admin User',
    email: 'admin@example.com',
    password: adminPassword,
    roleId: adminRole!.id,
  },
});

const user = await prisma.user.create({
  data: {
    name: 'Regular User',
    email: 'user@example.com',
    password: userPassword,
    roleId: userRole!.id,
  },
});

const merchant = await prisma.user.create({
  data: {
    name: 'Merchant User',
    email: 'merchant@example.com',
    password: merchantPassword,
    roleId: merchantRole!.id,
  },
});

  // Lire une image en base64
  const imagePath = join(__dirname, '../public/images/legumes_frais.png');
  const imageBase64 = readFileSync(imagePath, 'base64');

 // Créer des produits fictifs
 await prisma.product.createMany({
   data: [
     {
       name: 'Pomme',
       description: 'Une pomme fraîche et juteuse',
       price: 1.5,
       unitId: pieceUnit!.id,
       imageBase64,
       categoryId: 1, // Fruits
       userId: merchant.id,
     },
     {
       name: 'Carotte',
       description: 'Une carotte bio et croquante',
       price: 0.5,
       unitId: weightUnit!.id,
       weight: 0.2,
       imageBase64,
       categoryId: 2, // Légumes
       userId: merchant.id,
     },
     {
       name: 'Lait',
       description: 'Lait frais de la ferme',
       price: 1.2,
       unitId: literUnit!.id,
       imageBase64,
       categoryId: 3, // Produits Laitiers
       userId: merchant.id,
     },
     {
       name: 'Boeuf',
       description: 'Viande de boeuf bio',
       price: 15.0,
       unitId: weightUnit!.id,
       weight: 1.0,
       imageBase64,
       categoryId: 4, // Viande
       userId: merchant.id,
     },
     {
       name: 'Jus d\'orange',
       description: 'Jus d\'orange frais pressé',
       price: 3.0,
       unitId: literUnit!.id,
       imageBase64,
       categoryId: 5, // Boissons
       userId: merchant.id,
     },
     {
       name: 'Pain',
       description: 'Pain frais du boulanger',
       price: 2.0,
       unitId: pieceUnit!.id,
       imageBase64,
       categoryId: 6, // Boulangerie
       userId: merchant.id,
     },
     {
       name: 'Miel',
       description: 'Miel de fleurs sauvage',
       price: 5.0,
       unitId: pieceUnit!.id,
       imageBase64,
       categoryId: 7, // Autres
       userId: merchant.id,
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
