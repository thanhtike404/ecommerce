import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedCurrencies() {
  console.log('Seeding currencies...');

  // Create currencies
  const currencies = [
    {
      code: 'MMK',
      name: 'Myanmar Kyat',
      symbol: 'K',
      exchangeRate: 1.0,
      isDefault: true,
    },
    {
      code: 'USD',
      name: 'US Dollar',
      symbol: '$',
      exchangeRate: 0.00048, // 1 MMK = 0.00048 USD (approximate)
      isDefault: false,
    },
    {
      code: 'EUR',
      name: 'Euro',
      symbol: '€',
      exchangeRate: 0.00044, // 1 MMK = 0.00044 EUR (approximate)
      isDefault: false,
    },
    {
      code: 'THB',
      name: 'Thai Baht',
      symbol: '฿',
      exchangeRate: 0.017, // 1 MMK = 0.017 THB (approximate)
      isDefault: false,
    },
    {
      code: 'SGD',
      name: 'Singapore Dollar',
      symbol: 'S$',
      exchangeRate: 0.00065, // 1 MMK = 0.00065 SGD (approximate)
      isDefault: false,
    },
  ];

  for (const currency of currencies) {
    await prisma.currency.upsert({
      where: { code: currency.code },
      update: currency,
      create: currency,
    });
  }

  console.log('Currencies seeded successfully!');
}

seedCurrencies()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });