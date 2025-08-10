import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedSampleData() {
  console.log('Seeding sample data...');

  // Create categories
  const categories = [
    { name: 'Disposable Vapes', iconUrl: '/cardImgs/vape1.png' },
    { name: 'Pod Systems', iconUrl: '/cardImgs/vape2.png' },
    { name: 'Mods', iconUrl: '/cardImgs/vape3.png' },
    { name: 'E-Liquids', iconUrl: '/cardImgs/vape4.png' },
    { name: 'Accessories', iconUrl: '/cardImgs/vape1.png' },
  ];

  for (const category of categories) {
    const existingCategory = await prisma.category.findFirst({
      where: { name: category.name }
    });
    
    if (!existingCategory) {
      await prisma.category.create({
        data: category,
      });
    }
  }

  // Create product statuses
  const statuses = [
    { name: 'Active' },
    { name: 'Inactive' },
    { name: 'Out of Stock' },
  ];

  for (const status of statuses) {
    const existingStatus = await prisma.productStatus.findFirst({
      where: { name: status.name }
    });
    
    if (!existingStatus) {
      await prisma.productStatus.create({
        data: status,
      });
    }
  }

  // Get created categories and statuses
  const createdCategories = await prisma.category.findMany();
  const createdStatuses = await prisma.productStatus.findMany();
  const mmkCurrency = await prisma.currency.findUnique({ where: { code: 'MMK' } });

  if (!mmkCurrency) {
    console.error('MMK currency not found. Please run seed-currencies.ts first.');
    return;
  }

  // Create sample products
  const products = [
    {
      name: 'Citrus Mon 2000 Puff Disposable',
      description: 'Premium disposable vape with citrus flavor, 2000 puffs, 3% nicotine',
      imageUrl: '/cardImgs/vape1.png',
      categoryId: createdCategories.find(c => c.name === 'Disposable Vapes')?.id || 1,
      statusId: createdStatuses.find(s => s.name === 'Active')?.id || 1,
    },
    {
      name: 'Berry Blast Pod System',
      description: 'Refillable pod system with berry flavor, long-lasting battery',
      imageUrl: '/cardImgs/vape2.png',
      categoryId: createdCategories.find(c => c.name === 'Pod Systems')?.id || 1,
      statusId: createdStatuses.find(s => s.name === 'Active')?.id || 1,
    },
    {
      name: 'Mint Fresh 1500 Puff',
      description: 'Cool mint disposable vape, 1500 puffs, smooth draw',
      imageUrl: '/cardImgs/vape3.png',
      categoryId: createdCategories.find(c => c.name === 'Disposable Vapes')?.id || 1,
      statusId: createdStatuses.find(s => s.name === 'Active')?.id || 1,
    },
    {
      name: 'Tropical Mix E-Liquid',
      description: 'Premium e-liquid with tropical fruit blend, 30ml bottle',
      imageUrl: '/cardImgs/vape4.png',
      categoryId: createdCategories.find(c => c.name === 'E-Liquids')?.id || 1,
      statusId: createdStatuses.find(s => s.name === 'Active')?.id || 1,
    },
    {
      name: 'Advanced Mod Kit',
      description: 'Professional vaping mod with temperature control and LCD display',
      imageUrl: '/cardImgs/vape1.png',
      categoryId: createdCategories.find(c => c.name === 'Mods')?.id || 1,
      statusId: createdStatuses.find(s => s.name === 'Active')?.id || 1,
    },
    {
      name: 'Vanilla Cream 2500 Puff',
      description: 'Smooth vanilla cream flavor, 2500 puffs, premium quality',
      imageUrl: '/cardImgs/vape2.png',
      categoryId: createdCategories.find(c => c.name === 'Disposable Vapes')?.id || 1,
      statusId: createdStatuses.find(s => s.name === 'Active')?.id || 1,
    },
  ];

  for (const product of products) {
    let createdProduct = await prisma.product.findFirst({
      where: { name: product.name }
    });
    
    if (!createdProduct) {
      createdProduct = await prisma.product.create({
        data: product,
      });
    }

    // Create stock for each product
    const stockPrice = Math.floor(Math.random() * 50000) + 10000; // Random price between 10,000 and 60,000 MMK
    const stockQuantity = Math.floor(Math.random() * 100) + 10; // Random stock between 10 and 110

    // Check if stock already exists
    const existingStock = await prisma.stock.findFirst({
      where: {
        productId: createdProduct.id,
        sku: `SKU-${createdProduct.id}-001`
      }
    });

    if (!existingStock) {
      await prisma.stock.create({
        data: {
          productId: createdProduct.id,
          sku: `SKU-${createdProduct.id}-001`,
          stock: stockQuantity,
          price: stockPrice,
          currencyId: mmkCurrency.id,
        },
      });
    }
  }

  // Create payment methods
  const paymentMethods = [
    { name: 'Cash on Delivery' },
    { name: 'Bank Transfer' },
    { name: 'Mobile Payment' },
    { name: 'Credit Card' },
  ];

  for (const method of paymentMethods) {
    const existingMethod = await prisma.paymentMethod.findUnique({
      where: { name: method.name }
    });
    
    if (!existingMethod) {
      await prisma.paymentMethod.create({
        data: method,
      });
    }
  }

  // Create homepage banners
  const banners = [
    {
      title: 'Premium Vape Collection',
      imageUrl: '/sliderImgs/slider1.jpg',
      status: 'ACTIVE' as const,
    },
    {
      title: 'Best Deals This Week',
      imageUrl: '/sliderImgs/slider2.jpg',
      status: 'ACTIVE' as const,
    },
  ];

  for (const banner of banners) {
    const existingBanner = await prisma.homePageBannner.findFirst({
      where: { title: banner.title }
    });
    
    if (!existingBanner) {
      await prisma.homePageBannner.create({
        data: banner,
      });
    }
  }

  console.log('Sample data seeded successfully!');
}

seedSampleData()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });