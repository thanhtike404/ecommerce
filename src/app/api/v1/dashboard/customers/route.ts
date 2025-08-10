import { NextRequest, NextResponse } from 'next/server';
import prismaClient from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    // Get basic customer data
    const totalCustomers = await prismaClient.user.count({ 
      where: { role: 'USER' } 
    });

    // Get customers with their orders
    const customersWithOrders = await prismaClient.user.findMany({
      where: {
        role: 'USER'
      },
      include: {
        orders: true
      },
      take: 20
    });

    // Calculate top customers by spending
    const topCustomers = customersWithOrders.map(customer => {
      const completedOrders = customer.orders.filter(order => order.paymentStatus === 'COMPLETED');
      const totalSpent = completedOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      const orderCount = completedOrders.length;
      const avgOrderValue = orderCount > 0 ? totalSpent / orderCount : 0;
      const lastOrderDate = completedOrders.length > 0 
        ? new Date(Math.max(...completedOrders.map(o => new Date(o.orderDate).getTime())))
        : null;

      return {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        image: customer.image,
        totalSpent,
        orderCount,
        avgOrderValue,
        lastOrderDate,
        joinDate: new Date() // Fallback date
      };
    }).filter(customer => customer.totalSpent > 0)
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 10);

    // Calculate customer segments
    const segments = {
      newCustomers: 0,
      oneTimeCustomers: 0,
      repeatCustomers: 0,
      loyalCustomers: 0
    };

    customersWithOrders.forEach(customer => {
      const orderCount = customer.orders.filter(order => order.paymentStatus === 'COMPLETED').length;
      if (orderCount === 0) segments.newCustomers++;
      else if (orderCount === 1) segments.oneTimeCustomers++;
      else if (orderCount <= 5) segments.repeatCustomers++;
      else segments.loyalCustomers++;
    });

    // Get recent orders for activity
    const recentOrders = await prismaClient.order.findMany({
      include: {
        user: true,
        paymentMethod: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    });

    // Mock customer growth data (simplified)
    const customerGrowthData = [
      { month: '2024-01', newCustomers: 15, monthName: 'Jan 2024' },
      { month: '2024-02', newCustomers: 22, monthName: 'Feb 2024' },
      { month: '2024-03', newCustomers: 18, monthName: 'Mar 2024' },
      { month: '2024-04', newCustomers: 25, monthName: 'Apr 2024' },
      { month: '2024-05', newCustomers: 30, monthName: 'May 2024' },
      { month: '2024-06', newCustomers: 28, monthName: 'Jun 2024' },
      { month: '2024-07', newCustomers: 35, monthName: 'Jul 2024' },
      { month: '2024-08', newCustomers: 32, monthName: 'Aug 2024' }
    ];

    return NextResponse.json({
      recentCustomers: customersWithOrders.slice(0, 10).map(customer => ({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        image: customer.image,
        joinDate: new Date(),
        orderCount: customer.orders.filter(order => order.paymentStatus === 'COMPLETED').length,
        totalSpent: customer.orders
          .filter(order => order.paymentStatus === 'COMPLETED')
          .reduce((sum, order) => sum + order.totalAmount, 0)
      })),
      topCustomers: topCustomers,
      customerGrowth: customerGrowthData,
      customerSegments: segments,
      recentActivity: recentOrders.map(order => ({
        id: order.id,
        customerName: order.user.name,
        customerEmail: order.user.email,
        amount: order.totalAmount,
        currency: { symbol: 'K', code: 'MMK' }, // Default currency
        paymentMethod: order.paymentMethod.name,
        status: order.paymentStatus,
        orderDate: order.orderDate
      })),
      summary: {
        totalCustomers,
        newThisMonth: Math.floor(totalCustomers * 0.1), // Estimate 10% are new
        activeCustomers: segments.repeatCustomers + segments.loyalCustomers,
        averageOrderValue: topCustomers.length > 0 
          ? topCustomers.reduce((sum, c) => sum + c.avgOrderValue, 0) / topCustomers.length 
          : 0
      }
    });
  } catch (error) {
    console.error('Dashboard customers error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customer data' },
      { status: 500 }
    );
  }
}