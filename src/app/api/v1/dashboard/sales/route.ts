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

    const period = req.nextUrl.searchParams.get('period') || '7d';
    const currencyCode = req.nextUrl.searchParams.get('currency') || 'MMK';
    
    // Get the selected currency
    const selectedCurrency = await prismaClient.currency.findUnique({
      where: { code: currencyCode }
    });

    if (!selectedCurrency) {
      return NextResponse.json({ error: 'Invalid currency' }, { status: 400 });
    }

    let dateFilter: Date;
    switch (period) {
      case '24h':
        dateFilter = new Date(Date.now() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        dateFilter = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        dateFilter = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        dateFilter = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        dateFilter = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    }

    // Get sales data with currency conversion
    const salesData = await prismaClient.order.findMany({
      where: {
        orderDate: {
          gte: dateFilter,
        },
        paymentStatus: 'COMPLETED'
      },
      include: {
        currency: true
      },
      orderBy: {
        orderDate: 'asc',
      },
    });

    // Group by date and convert currencies
    const groupedData = salesData.reduce((acc, order) => {
      const date = order.orderDate.toISOString().split('T')[0];
      
      // Convert amount to selected currency
      const convertedAmount = order.totalAmount * (order.currency.exchangeRate / selectedCurrency.exchangeRate);
      
      if (!acc[date]) {
        acc[date] = {
          date,
          revenue: 0,
          orders: 0,
        };
      }
      
      acc[date].revenue += convertedAmount;
      acc[date].orders += 1;
      
      return acc;
    }, {} as Record<string, { date: string; revenue: number; orders: number }>);

    const formattedSalesData = Object.values(groupedData).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return NextResponse.json({
      period,
      currency: selectedCurrency,
      data: formattedSalesData,
    });
  } catch (error) {
    console.error('Dashboard sales error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sales data' },
      { status: 500 }
    );
  }
}