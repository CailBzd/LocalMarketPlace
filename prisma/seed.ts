import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Créer des rôles
  await prisma.role.createMany({
    data: [
      { name: 'ADMIN' },
      { name: 'USER' },
      { name: 'MERCHANT' },
    ],
  });

  // Créer des unités
  await prisma.unit.createMany({
    data: [
      { name: 'PIECE' },
      { name: 'WEIGHT' },
      { name: 'LITER' },
    ],
  });

  // Créer des catégories fictives
  await prisma.category.createMany({
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
      roleId: adminRole.id,
    },
  });

  const user = await prisma.user.create({
    data: {
      name: 'Regular User',
      email: 'user@example.com',
      password: userPassword,
      roleId: userRole.id,
    },
  });

  // Créer des marchands fictifs pour Vallet (44330) avec des adresses réelles
  const merchants = await prisma.user.createMany({
    data: [
      {
        name: 'Boulangerie Au Fournil de Vallet',
        email: 'boulangerie.aufournil@vallet.com',
        password: merchantPassword,
        roleId: merchantRole.id,
        address: '6 Place Charles de Gaulle',
        postalCode: '44330',
        city: 'Vallet',
        department: 'Loire-Atlantique',
        country: 'France',
        phoneNumber: '0123456789',
        latitude: 47.1628,
        longitude: -1.2643,
      },
      {
        name: 'Boucherie Charcuterie Jamin',
        email: 'boucherie.jamin@vallet.com',
        password: merchantPassword,
        roleId: merchantRole.id,
        address: '8 Rue des Forges',
        postalCode: '44330',
        city: 'Vallet',
        department: 'Loire-Atlantique',
        country: 'France',
        phoneNumber: '0123456789',
        latitude: 47.1619,
        longitude: -1.2631,
      },
      {
        name: 'Primeur Les Délices de Vallet',
        email: 'primeur.delices@vallet.com',
        password: merchantPassword,
        roleId: merchantRole.id,
        address: '10 Rue de la Vendée',
        postalCode: '44330',
        city: 'Vallet',
        department: 'Loire-Atlantique',
        country: 'France',
        phoneNumber: '0123456789',
        latitude: 47.1613,
        longitude: -1.2624,
      },
      {
        name: 'Fromagerie La Belle Crème',
        email: 'fromagerie.labellecreme@vallet.com',
        password: merchantPassword,
        roleId: merchantRole.id,
        address: '12 Rue du Général Leclerc',
        postalCode: '44330',
        city: 'Vallet',
        department: 'Loire-Atlantique',
        country: 'France',
        phoneNumber: '0123456789',
        latitude: 47.1616,
        longitude: -1.2637,
      },
      {
        name: 'Poissonnerie L\'Océan Bleu',
        email: 'poissonnerie.oceanbleu@vallet.com',
        password: merchantPassword,
        roleId: merchantRole.id,
        address: '14 Rue François Luneau',
        postalCode: '44330',
        city: 'Vallet',
        department: 'Loire-Atlantique',
        country: 'France',
        phoneNumber: '0123456789',
        latitude: 47.1622,
        longitude: -1.2640,
      },
    ],
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
        unitId: pieceUnit.id,
        imageBase64,
        categoryId: 1, // Fruits
        userId: 1,
      },
      {
        name: 'Carotte',
        description: 'Une carotte bio et croquante',
        price: 0.5,
        unitId: weightUnit.id,
        weight: 0.2,
        imageBase64,
        categoryId: 2, // Légumes
        userId: 1,
      },
      {
        name: 'Lait',
        description: 'Lait frais de la ferme',
        price: 1.2,
        unitId: literUnit.id,
        imageBase64,
        categoryId: 3, // Produits Laitiers
        userId: 2,
      },
      {
        name: 'Boeuf',
        description: 'Viande de boeuf bio',
        price: 15.0,
        unitId: weightUnit.id,
        weight: 1.0,
        imageBase64,
        categoryId: 4, // Viande
        userId: 2,
      },
      {
        name: 'Jus d\'orange',
        description: 'Jus d\'orange frais pressé',
        price: 3.0,
        unitId: literUnit.id,
        imageBase64,
        categoryId: 5, // Boissons
        userId: 3,
      },
      {
        name: 'Pain',
        description: 'Pain frais du boulanger',
        price: 2.0,
        unitId: pieceUnit.id,
        imageBase64,
        categoryId: 6, // Boulangerie
        userId: 3,
      },
      {
        name: 'Miel',
        description: 'Miel de fleurs sauvage',
        price: 5.0,
        unitId: pieceUnit.id,
        imageBase64,
        categoryId: 7, // Autres
        userId: 4,
      },
      {
        name: 'Baguette Tradition',
        description: 'Une baguette tradition croustillante',
        price: 1.2,
        unitId: pieceUnit.id,
        imageBase64,
        categoryId: 1,
        userId: 3,
      },
      {
        name: 'Croissant au beurre',
        description: 'Un croissant au beurre frais',
        price: 1.0,
        unitId: pieceUnit.id,
        imageBase64,
        categoryId: 1,
        userId: 3,
      },
      {
        name: 'Côte de boeuf',
        description: 'Une côte de boeuf de qualité supérieure',
        price: 25.0,
        unitId: weightUnit.id,
        weight: 1.0,
        imageBase64,
        categoryId: 2,
        userId: 4,
      },
      {
        name: 'Saucisse artisanale',
        description: 'Des saucisses artisanales faites maison',
        price: 12.0,
        unitId: weightUnit.id,
        weight: 1.0,
        imageBase64,
        categoryId: 2,
        userId: 4,
      },
      {
        name: 'Pomme Golden',
        description: 'Des pommes Golden fraîches',
        price: 2.5,
        unitId: weightUnit.id,
        weight: 1.0,
        imageBase64,
        categoryId: 3,
        userId: 5,
      },
      {
        name: 'Tomate Bio',
        description: 'Des tomates bio bien mûres',
        price: 3.0,
        unitId: weightUnit.id,
        weight: 1.0,
        imageBase64,
        categoryId: 3,
        userId: 5,
      },
      {
        name: 'Camembert de Normandie',
        description: 'Un camembert crémeux de Normandie',
        price: 4.0,
        unitId: pieceUnit.id,
        imageBase64,
        categoryId: 4,
        userId: 5,
      },
      {
        name: 'Brie de Meaux',
        description: 'Un brie de Meaux savoureux',
        price: 5.0,
        unitId: pieceUnit.id,
        imageBase64,
        categoryId: 4,
        userId: 5,
      },
      {
        name: 'Saumon frais',
        description: 'Du saumon frais coupé en filet',
        price: 20.0,
        unitId: weightUnit.id,
        weight: 1.0,
        imageBase64,
        categoryId: 5,
        userId: 6,
      },
      {
        name: 'Crevettes roses',
        description: 'Des crevettes roses fraîches',
        price: 15.0,
        unitId: weightUnit.id,
        weight: 1.0,
        imageBase64,
        categoryId: 5,
        userId: 6,
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
