// app/page.tsx
import Card, { CategoryType } from '@/components/Card';
import Carousel from '@/components/Carousel';
import ViewMoreBtn from '@/components/buttons/viewMoreBtn';
import ViewBtn from '@/components/buttons/viewBtn';
import { IoIosArrowForward } from 'react-icons/io';
import Image from 'next/image';
import NewReleaseCard from '@/components/cards/NewReleaseCard';
import Link from 'next/link';
import SingleSlider from '@/components/sliders/SingleSlider';
import ComponentSlide from '@/components/sliders/ComponentSlide';
import prismaClient from '@/lib/db';

export const revalidate = 30; // ISR configuration

async function getData() {
  // Fetch categories with product count
  const categoriesWithProductCount = await prismaClient.category.findMany({
    where: {
      products: {
        some: {},
      },
    },
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });
  console.log('AWS Access Key ID:', process.env.AWS_ACCESS_KEY_ID);
  console.log('AWS Bucket Name:', process.env.AWS_BUCKET_NAME);
  console.log('AWS Region:', process.env.AWS_REGION);
  console.log('Image URL:', process.env.image_url);

  // Fetch active banners
  const banners = await prismaClient.homePageBannner.findMany({
    where: {
      status: 'ACTIVE',
    },
  });
  console.log(banners, 'banners from ssr');

  // Fetch best-selling products with image URL and price
  const bestSellingProdsRaw = await prismaClient.orderItem.groupBy({
    by: ['stockId'],
    _count: {
      stockId: true,
    },
    orderBy: {
      _count: {
        stockId: 'desc',
      },
    },
    take: 4,
  });

  // Retrieve detailed product information using the stockId
  const bestSellingProds = await Promise.all(
    bestSellingProdsRaw.map(async (item) => {
      const stock = await prismaClient.stock.findUnique({
        where: { id: item.stockId },
        include: {
          product: {
            select: {
              name: true,
              imageUrl: true,
            },
          },
        },
      });
      return {
        productId: stock?.productId,
        name: stock?.product.name,
        imageUrl: stock?.product.imageUrl,
        price: stock?.price,
        orderCount: item._count.stockId,
      };
    })
  );

  return { categoriesWithProductCount, bestSellingProds, banners };
}

export default async function Home() {
  const { categoriesWithProductCount, bestSellingProds, banners } =
    await getData();
  console.log(bestSellingProds, 'best selling products');
  console.log(banners, 'banners');

  return (
    <div className="w-full flex flex-col items-center">
      {/* ========== Hero Section ========== */}
      <Carousel banners={banners} />

      {/* =========== First Component ========== */}
      <section className="w-full container flex flex-col items-center mt-8">
        <h1 className="text-4xl md:text-5xl font-bold">By Category Count</h1>
        {/* ------ Cards ------- */}
        <div className="mt-10 flex flex-col items-center gap-6">
          <Card
            categoriesWithProductCount={
              categoriesWithProductCount as unknown as CategoryType[]
            }
          />
          <Link href={'/'}>
            <ViewMoreBtn>
              View More <IoIosArrowForward />
            </ViewMoreBtn>
          </Link>
        </div>
      </section>

      {/* =========== Second Component ========== */}
      <section className="container flex flex-col lg:flex-row gap-2 text-white">
        {/* ... Membership Program Section ... */}
      </section>

      {/* =========== Third Component ========== */}
      <section className="container flex flex-col items-center gap-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold mt-5">
            <span className="text-red-500">Best Sellings</span>
          </h1>
          <p className="text-xl text-center">Try Our Latest Flavours Here</p>
        </div>

        <NewReleaseCard bestSellingProds={bestSellingProds} />

        <Link href={'/'}>
          <ViewMoreBtn>
            View More <IoIosArrowForward />
          </ViewMoreBtn>
        </Link>
      </section>

      {/* =========== Fourth Component ========== */}
      <section className="container">
        <SingleSlider />
      </section>

      {/* =========== Fifth Component ========== */}
      <section className="container">
        <ComponentSlide />
      </section>
    </div>
  );
}
