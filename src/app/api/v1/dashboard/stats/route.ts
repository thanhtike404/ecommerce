import { NextRequest, NextResponse } from 'next/server';
import prismaClient from '@/lib/db';
import { getServerSession } from 'next-auth';
import authOptions from '@/authOption';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currencyCode = req.nextUrl.searchParams.get('currency') || 'MMK';


    const selectedCurrency = await prismaClient.currency.findUnique({
      where: { code: currencyCode }
    });

    if (!selectedCurrency) {
      return NextResponse.json({ error: 'Invalid currency' }, { status: 400 });
    }


    const [
      totalProducts,
      totalCategories,
      totalUsers,
      totalOrders,
      totalRevenue,
      activeProducts,
      pendingOrders,
      completedOrders,
      currencies
    ] = await Promise.all([
      prismaClient.product.count(),
      prismaClient.category.count(),
      prismaClient.user.count(),
      prismaClient.order.count(),
      prismaClient.order.aggregate({
        _sum: {
          totalAmount: true,
        },
        where: {
          currencyId: selectedCurrency.id
        }
      }),
      prismaClient.product.count({
        where: {
          status: {
            name: 'Active'
          }
        }
      }),
      prismaClient.order.count({
        where: {
          paymentStatus: 'PENDING'
        }
      }),
      prismaClient.order.count({
        where: {
          paymentStatus: 'COMPLETED'
        }
      }),
      prismaClient.currency.findMany({
        orderBy: { isDefault: 'desc' }
      })
    ]);

    // Calculate growth percentages (comparing with last month)
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const [
      lastMonthOrders,
      lastMonthRevenue,
      lastMonthUsers
    ] = await Promise.all([
      prismaClient.order.count({
        where: {
          createdAt: {
            gte: lastMonth
          }
        }
      }),
      prismaClient.order.aggregate({
        where: {
          createdAt: {
            gte: lastMonth
          },
          currencyId: selectedCurrency.id
        },
        _sum: {
          totalAmount: true,
        },
      }),
      prismaClient.user.count({
        where: {
          accounts: {
            some: {
              createdAt: {
                gte: lastMonth
              }
            }
          }
        }
      })
    ]);

    const stats = {
      totalProducts,
      totalCategories,
      totalUsers,
      totalOrders,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      activeProducts,
      pendingOrders,
      completedOrders,
      currency: selectedCurrency,
      availableCurrencies: currencies,
      growth: {
        orders: lastMonthOrders,
        revenue: lastMonthRevenue._sum.totalAmount || 0,
        users: lastMonthUsers
      }
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
}