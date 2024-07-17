import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const category = await prisma.category.create({
    data: {
      name: 'Fruits',
    },
  });

  const product = await prisma.product.create({
    data: {
      name: 'Apple',
      description: 'Fresh apple',
      price: 1.99,
      imageUrl: 'https://via.placeholder.com/150',
      categoryId: category.id,
    },
  });

  console.log({ product });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
