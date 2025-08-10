import { NextRequest, NextResponse } from 'next/server';
import prismaClient from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    // Get products by category
    const productsByCategory = await prismaClient.category.findMany({
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    });

    // Get low stock products
    const lowStockProducts = await prismaClient.stock.findMany({
      where: {
        stock: {
          lte: 10
        }
      },
      include: {
        product: {
          include: {
            category: true
          }
        }
      },
      orderBy: {
        stock: 'asc'
      },
      take: 10
    });

    // Simplified top selling products (using sample data for now)
    const topProductsDetails = [
      {
        id: 1,
        name: 'Sample Vape Product 1',
        category: 'Disposable Vapes',
        imageUrl: '/cardImgs/vape1.png',
        sku: 'SKU-001',
        price: 25000,
        currency: { symbol: 'K', code: 'MMK' },
        totalSold: 50,
        totalRevenue: 1250000,
        orderCount: 15,
        currentStock: 25
      },
      {
        id: 2,
        name: 'Sample Vape Product 2',
        category: 'Pod Systems',
        imageUrl: '/cardImgs/vape2.png',
        sku: 'SKU-002',
        price: 35000,
        currency: { symbol: 'K', code: 'MMK' },
        totalSold: 30,
        totalRevenue: 1050000,
        orderCount: 10,
        currentStock: 15
      }
    ];

    // Get products by status
    const productsByStatus = await prismaClient.productStatus.findMany({
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    });

    // Get recent products (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentProducts = await prismaClient.product.findMany({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      include: {
        category: true,
        status: true,
        stock: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    });

    // Calculate inventory value
    const allStock = await prismaClient.stock.findMany();
    const inventoryValue = allStock.reduce((total, stock) => {
      return total + (stock.price * stock.stock);
    }, 0);

    // Get stock alerts
    const criticalStock = await prismaClient.stock.count({
      where: {
        stock: {
          lt: 5
        }
      }
    });

    const lowStock = await prismaClient.stock.count({
      where: {
        stock: {
          gte: 5,
          lte: 10
        }
      }
    });

    return NextResponse.json({
      productsByCategory: productsByCategory.map(cat => ({
        id: cat.id,
        name: cat.name,
        count: cat._count.products,
        iconUrl: cat.iconUrl
      })),
      lowStockProducts: lowStockProducts.map(stock => ({
        id: stock.product.id,
        name: stock.product.name,
        sku: stock.sku,
        category: stock.product.category?.name,
        status: 'Active',
        currentStock: stock.stock,
        price: stock.price,
        currency: { symbol: 'K', code: 'MMK' },
        imageUrl: stock.product.imageUrl
      })),
      topSellingProducts: topProductsDetails,
      productsByStatus: productsByStatus.map(status => ({
        id: status.id,
        name: status.name,
        count: status._count.products
      })),
      recentProducts: recentProducts.map(product => ({
        id: product.id,
        name: product.name,
        category: product.category?.name,
        status: product.status?.name,
        createdAt: product.createdAt,
        imageUrl: product.imageUrl,
        stockCount: product.stock.length,
        totalStock: product.stock.reduce((sum, s) => sum + s.stock, 0)
      })),
      summary: {
        totalProducts: await prismaClient.product.count(),
        totalCategories: productsByCategory.length,
        inventoryValue,
        criticalStock,
        lowStock,
        totalStockItems: allStock.length
      }
    });
  } catch (error) {
    console.error('Dashboard inventory error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inventory data' },
      { status: 500 }
    );
  }
}