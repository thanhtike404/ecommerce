# NexCommerce - Modern E-commerce Platform

A comprehensive Next.js-based e-commerce platform designed for modern retail operations. Built with TypeScript, PostgreSQL, and a robust set of modern web technologies to provide a complete online shopping experience.

## 🚀 Features

### 🛍️ Customer Experience
- **Modern Shopping Interface** - Clean, responsive design with intuitive navigation
- **Advanced Product Filtering** - Search by category, price range, status, and keywords
- **Multi-Currency Support** - Shop in MMK, USD, EUR, THB, or SGD with real-time conversion
- **Secure Checkout** - Multiple payment methods with order tracking
- **User Authentication** - Google OAuth integration with secure sessions
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### 📊 Admin Dashboard
- **Business Intelligence** - Comprehensive analytics with interactive charts
- **Revenue Analytics** - Time-based revenue analysis and payment method insights
- **Inventory Management** - Product performance tracking and stock alerts
- **Customer Analytics** - User behavior analysis and segmentation
- **Order Management** - Real-time order tracking and status updates
- **Multi-Currency Dashboard** - View all metrics in your preferred currency

### 🔧 Technical Features
- **Modern Stack** - Next.js 14, TypeScript, PostgreSQL, Prisma ORM
- **Authentication** - NextAuth.js with Google OAuth and JWT sessions
- **File Storage** - AWS S3 integration for product images
- **Performance** - Server components, image optimization, and caching
- **Monitoring** - Sentry integration for error tracking
- **Internationalization** - English and Thai language support

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL
- **Authentication:** NextAuth.js, Google OAuth
- **State Management:** Zustand, React Query (TanStack Query)
- **File Storage:** AWS S3
- **Monitoring:** Sentry
- **Charts:** Recharts
- **Styling:** Tailwind CSS, Framer Motion

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Google OAuth credentials
- AWS S3 bucket (optional, for file uploads)
- Sentry account (optional, for monitoring)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/nexcommerce.git
cd nexcommerce
```

### 2. Install dependencies
```bash
npm install
# or
pnpm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/nexcommerce"

# NextAuth
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# AWS S3 (Optional)
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_BUCKET_NAME="your-s3-bucket-name"
AWS_REGION="your-aws-region"

# Sentry (Optional)
SENTRY_DSN="your-sentry-dsn"
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database with sample data
npx tsx prisma/seed-currencies.ts
npx tsx prisma/seed-sample-data.ts
```

### 5. Run the development server
```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
nexcommerce/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed-currencies.ts     # Currency data seeding
│   └── seed-sample-data.ts    # Sample product data
├── src/
│   ├── app/
│   │   ├── (app)/            # Customer-facing pages
│   │   │   ├── page.tsx      # Homepage
│   │   │   ├── products/     # Product catalog
│   │   │   └── checkout/     # Checkout process
│   │   ├── (dashboard)/      # Admin dashboard
│   │   │   └── dashboard/    # Dashboard pages
│   │   └── api/              # API routes
│   │       └── v1/           # API endpoints
│   ├── components/           # Reusable components
│   │   ├── ui/              # UI components (Shadcn/ui)
│   │   ├── cards/           # Product cards
│   │   └── buttons/         # Button components
│   ├── lib/                 # Utility functions
│   └── types/               # TypeScript type definitions
├── public/                  # Static assets
└── README.md
```

## 🔌 API Endpoints

### Dashboard APIs
- `GET /api/v1/dashboard/overview` - Business metrics and KPIs
- `GET /api/v1/dashboard/revenue` - Revenue analytics with time filtering
- `GET /api/v1/dashboard/inventory` - Product and inventory management
- `GET /api/v1/dashboard/customers` - Customer analytics and insights

### Product APIs
- `GET /api/v1/products` - Get products with filtering and pagination
- `GET /api/v1/category` - Get product categories
- `GET /api/v1/order` - Order management endpoints

### Authentication
- `POST /api/auth/signin` - User authentication
- `POST /api/auth/signout` - User logout
- `GET /api/auth/session` - Get current session

## 🎨 Customization

### Adding New Product Categories
1. Update the database through Prisma migrations
2. Add category icons to `/public/cardImgs/`
3. Update the seeding script in `prisma/seed-sample-data.ts`

### Customizing the Theme
- Modify `tailwind.config.ts` for color schemes
- Update component styles in `src/components/ui/`
- Customize the homepage layout in `src/app/(app)/page.tsx`

### Adding New Currencies
1. Update the currency seeding script: `prisma/seed-currencies.ts`
2. Add exchange rate logic in dashboard APIs
3. Update the currency selector component

## 📊 Dashboard Features

### Revenue Analytics
- Time-based revenue charts (7d, 30d, 90d, 1y)
- Payment method breakdown
- Currency conversion support
- Growth trend indicators

### Inventory Management
- Product category distribution
- Low stock alerts
- Top-selling products analysis
- Recent product additions

### Customer Insights
- Customer growth tracking
- User segmentation (new, repeat, loyal)
- Top customers by spending
- Recent customer activity

## 🔒 Security

- **Authentication:** Secure JWT-based sessions with NextAuth.js
- **Authorization:** Role-based access control (USER/ADMIN)
- **Data Validation:** Zod schema validation for all forms and APIs
- **Database Security:** Parameterized queries with Prisma ORM
- **File Upload Security:** Secure S3 presigned URLs
- **Error Handling:** Comprehensive error boundaries and monitoring

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Docker
```bash
# Build the Docker image
docker build -t nexcommerce .

# Run the container
docker run -p 3000:3000 nexcommerce
```

### Manual Deployment
1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Ensure PostgreSQL database is accessible
4. Configure environment variables for production

## 🧪 Testing

### Running Tests
```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e
```

### Test Coverage
```bash
# Generate coverage report
npm run test:coverage
```

## 📱 Screenshots

### Homepage
![Homepage](docs/screenshots/homepage.png)

### Product Catalog
![Products](docs/screenshots/products.png)

### Admin Dashboard
![Dashboard](docs/screenshots/dashboard.png)

## 🔧 Development

### Code Style
- ESLint configuration for code quality
- Prettier for code formatting
- TypeScript for type safety
- Husky for pre-commit hooks

### Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Format code
npm run format

# Database operations
npx prisma studio          # Open Prisma Studio
npx prisma migrate dev     # Run migrations
npx prisma generate        # Generate Prisma client
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation:** Check the `/docs` folder for detailed guides
- **Issues:** Report bugs and request features via GitHub Issues
- **Discussions:** Join community discussions in GitHub Discussions
- **Email:** support@nexcommerce.com

## 📚 Documentation

- [API Documentation](docs/api.md)
- [Database Schema](docs/database.md)
- [Deployment Guide](docs/deployment.md)
- [Contributing Guide](docs/contributing.md)

## 🔄 Changelog

### v1.0.0 (Current)
- Initial release with core e-commerce functionality
- Multi-currency support
- Admin dashboard with analytics
- Google OAuth authentication
- Product catalog with filtering
- Order management system

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework for production
- [Prisma](https://prisma.io/) - Next-generation ORM for Node.js and TypeScript
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [NextAuth.js](https://next-auth.js.org/) - Complete open source authentication solution
- [React Query](https://tanstack.com/query) - Powerful data synchronization for React
- [Recharts](https://recharts.org/) - Redefined chart library built with React and D3

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/nexcommerce&type=Date)](https://star-history.com/#yourusername/nexcommerce&Date)

---

**NexCommerce** - Built with ❤️ for modern e-commerce needs.

Made with 💻 by [Your Name](https://github.com/yourusername)