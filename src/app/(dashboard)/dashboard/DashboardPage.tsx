'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  Package,
  DollarSign,
  AlertTriangle,
  Eye,
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  CreditCard,
  Loader2,
} from 'lucide-react';

const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

interface OverviewData {
  overview: {
    totalUsers: number;
    totalProducts: number;
    totalCategories: number;
    totalOrders: number;
    totalRevenue: number;
    activeProducts: number;
    inactiveProducts: number;
    outOfStockProducts: number;
    pendingOrders: number;
    completedOrders: number;
    totalBanners: number;
    activeBanners: number;
  };
  growth: {
    orders: number;
    revenue: number;
    users: number;
  };
}

interface RevenueData {
  period: string;
  groupBy: string;
  chartData: Array<{
    date: string;
    revenue: number;
    orders: number;
    currencies: Record<string, { amount: number; symbol: string }>;
  }>;
  paymentMethods: Array<{
    name: string;
    revenue: number;
    orders: number;
    percentage: number;
  }>;
  totalRevenue: number;
  totalOrders: number;
}

interface InventoryData {
  productsByCategory: Array<{
    id: number;
    name: string;
    count: number;
    iconUrl?: string;
  }>;
  lowStockProducts: Array<{
    id: number;
    name: string;
    sku: string;
    category?: string;
    status?: string;
    currentStock: number;
    price: number;
    currency: any;
    imageUrl?: string;
  }>;
  topSellingProducts: Array<{
    id: number;
    name: string;
    category?: string;
    imageUrl?: string;
    sku: string;
    price: number;
    currency: any;
    totalSold: number;
    totalRevenue: number;
    orderCount: number;
    currentStock: number;
  }>;
  summary: {
    totalProducts: number;
    totalCategories: number;
    inventoryValue: number;
    criticalStock: number;
    lowStock: number;
    totalStockItems: number;
  };
}

interface CustomerData {
  topCustomers: Array<{
    id: string;
    name: string;
    email: string;
    image?: string;
    totalSpent: number;
    orderCount: number;
    avgOrderValue: number;
    lastOrderDate?: string;
    joinDate?: string;
  }>;
  customerGrowth: Array<{
    month: string;
    newCustomers: number;
    monthName: string;
  }>;
  customerSegments: {
    newCustomers: number;
    oneTimeCustomers: number;
    repeatCustomers: number;
    loyalCustomers: number;
  };
  summary: {
    totalCustomers: number;
    newThisMonth: number;
    activeCustomers: number;
    averageOrderValue: number;
  };
}

export default function DashboardPage() {
  const [revenuePeriod, setRevenuePeriod] = useState('30d');

  // Fetch overview data
  const { data: overviewData, isLoading: overviewLoading } = useQuery<OverviewData>({
    queryKey: ['dashboard-overview'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/dashboard/overview');
      return response.data;
    },
  });

  // Fetch revenue data
  const { data: revenueData, isLoading: revenueLoading } = useQuery<RevenueData>({
    queryKey: ['dashboard-revenue', revenuePeriod],
    queryFn: async () => {
      const response = await axios.get(`/api/v1/dashboard/revenue?period=${revenuePeriod}`);
      return response.data;
    },
  });

  // Fetch inventory data
  const { data: inventoryData, isLoading: inventoryLoading } = useQuery<InventoryData>({
    queryKey: ['dashboard-inventory'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/dashboard/inventory');
      return response.data;
    },
  });

  // Fetch customer data
  const { data: customerData, isLoading: customerLoading } = useQuery<CustomerData>({
    queryKey: ['dashboard-customers'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/dashboard/customers');
      return response.data;
    },
  });

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    trend, 
    trendValue, 
    color = 'blue',
    subtitle 
  }: any) => (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className={`h-4 w-4 text-${color}-600`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        )}
        {trend && (
          <div className="flex items-center text-xs text-gray-600 mt-1">
            {trend === 'up' ? (
              <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
            )}
            <span className={trend === 'up' ? 'text-green-600' : 'text-red-600'}>
              {Math.abs(trendValue)}% from last month
            </span>
          </div>
        )}
      </CardContent>
      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-${color}-500 to-${color}-600`} />
    </Card>
  );

  if (overviewLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        <span className="ml-2 text-lg text-gray-600">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your Pi Vape Shop.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`K${overviewData?.overview.totalRevenue?.toLocaleString()}`}
          icon={DollarSign}
          trend={overviewData?.growth.revenue > 0 ? 'up' : 'down'}
          trendValue={overviewData?.growth.revenue}
          color="green"
          subtitle="Completed orders only"
        />
        <StatCard
          title="Total Orders"
          value={overviewData?.overview.totalOrders?.toLocaleString()}
          icon={ShoppingCart}
          trend={overviewData?.growth.orders > 0 ? 'up' : 'down'}
          trendValue={overviewData?.growth.orders}
          color="blue"
          subtitle={`${overviewData?.overview.pendingOrders} pending`}
        />
        <StatCard
          title="Total Products"
          value={overviewData?.overview.totalProducts?.toLocaleString()}
          icon={Package}
          color="purple"
          subtitle={`${overviewData?.overview.activeProducts} active`}
        />
        <StatCard
          title="Total Customers"
          value={overviewData?.overview.totalUsers?.toLocaleString()}
          icon={Users}
          trend={overviewData?.growth.users > 0 ? 'up' : 'down'}
          trendValue={overviewData?.growth.users}
          color="orange"
        />
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">Revenue Analytics</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>

        {/* Revenue Analytics Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Revenue and orders over time</CardDescription>
                </div>
                <Select value={revenuePeriod} onValueChange={setRevenuePeriod}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                    <SelectItem value="1y">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                {revenueLoading ? (
                  <div className="h-80 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={revenueData?.chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.1}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Revenue breakdown by payment type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueData?.paymentMethods.map((method, index) => (
                    <div key={method.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="font-medium">{method.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">K{method.revenue.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{method.percentage.toFixed(1)}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Products by Category</CardTitle>
                <CardDescription>Distribution across categories</CardDescription>
              </CardHeader>
              <CardContent>
                {inventoryLoading ? (
                  <div className="h-80 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={inventoryData?.productsByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, count }) => `${name}: ${count}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {inventoryData?.productsByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Low Stock Alert</CardTitle>
                <CardDescription>Products running low on inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {inventoryData?.lowStockProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <div>
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-gray-600">{product.category} • {product.sku}</p>
                        </div>
                      </div>
                      <Badge variant="destructive">{product.currentStock} left</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>Best performing products by sales volume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventoryData?.topSellingProducts.slice(0, 5).map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.category} • Stock: {product.currentStock}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{product.totalSold} sold</p>
                      <p className="text-sm text-gray-600">{product.currency?.symbol}{product.totalRevenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Growth</CardTitle>
                <CardDescription>New customers over time</CardDescription>
              </CardHeader>
              <CardContent>
                {customerLoading ? (
                  <div className="h-80 flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={customerData?.customerGrowth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="monthName" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="newCustomers"
                        stroke="#3B82F6"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
                <CardDescription>Customer distribution by order frequency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">New Customers</span>
                    <Badge variant="secondary">{customerData?.customerSegments.newCustomers}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">One-time Customers</span>
                    <Badge variant="outline">{customerData?.customerSegments.oneTimeCustomers}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Repeat Customers</span>
                    <Badge variant="default">{customerData?.customerSegments.repeatCustomers}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Loyal Customers</span>
                    <Badge className="bg-gold-500">{customerData?.customerSegments.loyalCustomers}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Customers</CardTitle>
              <CardDescription>Highest value customers by total spending</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerData?.topCustomers.slice(0, 8).map((customer, index) => (
                  <div key={customer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-green-600">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-gray-600">{customer.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">K{customer.totalSpent.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{customer.orderCount} orders</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
                <CardDescription>Key metrics at a glance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Products</span>
                  <Badge variant="default">{overviewData?.overview.activeProducts}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Out of Stock</span>
                  <Badge variant="destructive">{overviewData?.overview.outOfStockProducts}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pending Orders</span>
                  <Badge variant="secondary">{overviewData?.overview.pendingOrders}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Categories</span>
                  <Badge variant="outline">{overviewData?.overview.totalCategories}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Banners</span>
                  <Badge variant="default">{overviewData?.overview.activeBanners}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inventory Summary</CardTitle>
                <CardDescription>Stock and inventory overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Inventory Value</span>
                  <span className="font-medium">K{inventoryData?.summary.inventoryValue?.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Critical Stock</span>
                  <Badge variant="destructive">{inventoryData?.summary.criticalStock}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Low Stock</span>
                  <Badge variant="secondary">{inventoryData?.summary.lowStock}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Stock Items</span>
                  <span className="font-medium">{inventoryData?.summary.totalStockItems}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Summary</CardTitle>
                <CardDescription>Customer metrics overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Customers</span>
                  <span className="font-medium">{customerData?.summary.totalCustomers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">New This Month</span>
                  <Badge variant="default">{customerData?.summary.newThisMonth}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Customers</span>
                  <span className="font-medium">{customerData?.summary.activeCustomers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg Order Value</span>
                  <span className="font-medium">K{customerData?.summary.averageOrderValue?.toFixed(0)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}