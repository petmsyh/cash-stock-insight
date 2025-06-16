
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardOverview } from '@/components/DashboardOverview';
import { CashManagement } from '@/components/CashManagement';
import { InventoryManagement } from '@/components/InventoryManagement';
import { TransactionHistory } from '@/components/TransactionHistory';
import { ReportsAnalytics } from '@/components/ReportsAnalytics';
import { LayoutDashboard, DollarSign, Package, Receipt, BarChart3, Settings } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-slate-900">BizFlow POS</h1>
                <p className="text-sm text-slate-600">Complete Business Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">John Doe</p>
                <p className="text-xs text-slate-500">Store Owner</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
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

          <TabsContent value="dashboard" className="space-y-6">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="cash" className="space-y-6">
            <CashManagement />
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <InventoryManagement />
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <TransactionHistory />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <ReportsAnalytics />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
