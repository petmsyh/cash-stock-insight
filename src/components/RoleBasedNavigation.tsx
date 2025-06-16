
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutDashboard, DollarSign, Package, Receipt, BarChart3, Building, ShoppingCart } from 'lucide-react';

interface RoleBasedNavigationProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const RoleBasedNavigation = ({ activeTab, onTabChange }: RoleBasedNavigationProps) => {
  const { user } = useAuth();

  // Super Admin sees all tabs plus system management
  if (user?.role === 'super_admin') {
    return (
      <TabsList className="grid w-full grid-cols-6 lg:w-fit lg:grid-cols-6">
        <TabsTrigger value="system" className="flex items-center gap-2">
          <Building className="h-4 w-4" />
          System
        </TabsTrigger>
        <TabsTrigger value="dashboard" className="flex items-center gap-2">
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </TabsTrigger>
        <TabsTrigger value="cash" className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          Cash Flow
        </TabsTrigger>
        <TabsTrigger value="inventory" className="flex items-center gap-2">
          <Package className="h-4 w-4" />
          Inventory
        </TabsTrigger>
        <TabsTrigger value="transactions" className="flex items-center gap-2">
          <Receipt className="h-4 w-4" />
          Transactions
        </TabsTrigger>
        <TabsTrigger value="reports" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Reports
        </TabsTrigger>
      </TabsList>
    );
  }

  // Owner sees all business tabs
  if (user?.role === 'owner') {
    return (
      <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:grid-cols-5">
        <TabsTrigger value="dashboard" className="flex items-center gap-2">
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </TabsTrigger>
        <TabsTrigger value="cash" className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          Cash Flow
        </TabsTrigger>
        <TabsTrigger value="inventory" className="flex items-center gap-2">
          <Package className="h-4 w-4" />
          Inventory
        </TabsTrigger>
        <TabsTrigger value="transactions" className="flex items-center gap-2">
          <Receipt className="h-4 w-4" />
          Transactions
        </TabsTrigger>
        <TabsTrigger value="reports" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Reports
        </TabsTrigger>
      </TabsList>
    );
  }

  // Cashier sees only POS and basic transaction view
  if (user?.role === 'cashier') {
    return (
      <TabsList className="grid w-full grid-cols-2 lg:w-fit lg:grid-cols-2">
        <TabsTrigger value="pos" className="flex items-center gap-2">
          <ShoppingCart className="h-4 w-4" />
          POS
        </TabsTrigger>
        <TabsTrigger value="transactions" className="flex items-center gap-2">
          <Receipt className="h-4 w-4" />
          My Transactions
        </TabsTrigger>
      </TabsList>
    );
  }

  // Inventory Manager sees inventory and basic dashboard
  if (user?.role === 'inventory_manager') {
    return (
      <TabsList className="grid w-full grid-cols-2 lg:w-fit lg:grid-cols-2">
        <TabsTrigger value="dashboard" className="flex items-center gap-2">
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </TabsTrigger>
        <TabsTrigger value="inventory" className="flex items-center gap-2">
          <Package className="h-4 w-4" />
          Inventory
        </TabsTrigger>
      </TabsList>
    );
  }

  return null;
};
