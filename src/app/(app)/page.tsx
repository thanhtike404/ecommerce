// app/page.tsx
import Card, { CategoryType } from '@/components/Card';
import Carousel from '@/components/Carousel';
import ViewMoreBtn from '@/components/buttons/viewMoreBtn';
import ViewBtn from '@/components/buttons/viewBtn';
import { IoIosArrowForward } from 'react-icons/io';
import { IoSparkles, IoTrendingUp, IoShield } from 'react-icons/io5';
import { FiTruck, FiAward, FiUsers } from 'react-icons/fi';
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

  return (
    <div className="w-full">
      {/* ========== Hero Section ========== */}
      <Carousel banners={banners} />

      {/* ========== Features Bar ========== */}
      <section className="bg-gradient-to-r from-slate-50 to-gray-100 py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center gap-3 text-gray-700">
              <FiTruck className="text-2xl text-blue-600" />
              <div>
                <h3 className="font-semibold">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over 50,000 MMK</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-700">
              <IoShield className="text-2xl text-green-600" />
              <div>
                <h3 className="font-semibold">Quality Guaranteed</h3>
                <p className="text-sm text-gray-600">Premium vape products</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-700">
              <FiAward className="text-2xl text-purple-600" />
              <div>
                <h3 className="font-semibold">Expert Support</h3>
                <p className="text-sm text-gray-600">24/7 customer service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== Categories Section ========== */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <IoSparkles className="text-2xl text-yellow-500" />
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">Shop by Category</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore Our Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover premium vape products across all categories with unmatched quality and variety
            </p>
          </div>
          
          <Card
            categoriesWithProductCount={
              categoriesWithProductCount as unknown as CategoryType[]
            }
          />
          
          <div className="text-center mt-10">
            <Link href="/products">
              <ViewMoreBtn>
                Explore All Categories <IoIosArrowForward />
              </ViewMoreBtn>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== Best Sellers Section ========== */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <IoTrendingUp className="text-2xl text-red-500" />
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wider">Trending Now</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                Best Sellers
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Try our most popular flavors loved by thousands of customers
            </p>
          </div>

          <NewReleaseCard bestSellingProds={bestSellingProds} />

          <div className="text-center mt-10">
            <Link href="/products">
              <ViewMoreBtn>
                View All Products <IoIosArrowForward />
              </ViewMoreBtn>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== Why Choose Us Section ========== */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose Pi Vape Shop?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We're committed to providing the best vaping experience with premium products and exceptional service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <IoShield className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
              <p className="text-gray-300">
                All our products are sourced from trusted manufacturers and undergo strict quality control
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTruck className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-gray-300">
                Quick and secure shipping across Myanmar with real-time tracking
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
              <p className="text-gray-300">
                Our knowledgeable team is here to help you find the perfect vape products
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== Newsletter Section ========== */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated with Latest Offers
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Subscribe to get exclusive deals and new product announcements
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
