import React from 'react';
import Link from 'next/link';
import DarkMode from '@/components/DarkMode';
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  Users,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Boxes,
  Blocks,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { BsGear } from 'react-icons/bs';
function Sidebar() {
  const links = [
    {
      id: 1,
      href: '/dashboard/users',
      title: 'Users',
      icon: <Users className="h-5 w-5" />,
    },
    {
      id: 1,
      href: '/dashboard/products',
      title: 'Products',
      icon: <Boxes className="h-5 w-5" />,
    },
    {
      id: 1,
      href: '/dashboard/categories',
      title: 'Categories',
      icon: <Blocks className="h-5 w-5" />,
    },
    {
      id: 1,
      href: '/dashboard/orders',
      title: 'Orders',
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      id: 1,
      href: '/dashboard/orders',
      title: 'Site Settings',
      icon: <BsGear className="h-5 w-5" />,
    },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        {links.map((link) => (
          <Tooltip key={link.id}>
            <TooltipTrigger asChild>
              <Link
                href={link.href}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <span className="sr-only">Users</span>
                {link.icon}
              </Link>
            </TooltipTrigger>
          </Tooltip>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          {/* <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent> */}
          <DarkMode />
        </Tooltip>
      </nav>
    </aside>
  );
}

export default Sidebar;
