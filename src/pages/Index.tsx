
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { TenantSelector } from '@/components/TenantSelector';
import { RoleBasedNavigation } from '@/components/RoleBasedNavigation';
import { SuperAdminDashboard } from '@/components/SuperAdminDashboard';
import { DashboardOverview } from '@/components/DashboardOverview';
import { CashManagement } from '@/components/CashManagement';
import { InventoryManagement } from '@/components/InventoryManagement';
import { TransactionHistory } from '@/components/TransactionHistory';
import { ReportsAnalytics } from '@/components/ReportsAnalytics';
import { POSInterface } from '@/components/POSInterface';
import { LoginForm } from '@/components/LoginForm';
import { Settings } from 'lucide-react';

const MainApp = () => {
  const { user, currentTenant, logout } = useAuth();

  // Set default tab based on user role
  const getDefaultTab = () => {
    switch (user?.role) {
      case 'super_admin': return 'system';
      case 'owner': return 'dashboard';
      case 'cashier': return 'pos';
      case 'inventory_manager': return 'inventory';
      default: return 'dashboard';
    }
  };

  const [activeTab, setActiveTab] = useState(getDefaultTab());

  // Show login form if user is not authenticated
  if (!user) {
    return <LoginForm />;
  }

  const getRoleDisplay = () => {
    switch (user?.role) {
      case 'super_admin': return 'Super Administrator';
      case 'owner': return 'Business Owner';
      case 'cashier': return 'Cashier';
      case 'inventory_manager': return 'Inventory Manager';
      default: return 'User';
    }
  };

  const getSystemTitle = () => {
    if (user?.role === 'super_admin') {
      return 'BizFlow SaaS Platform';
    }
    return currentTenant ? `${currentTenant.name} - BizFlow POS` : 'BizFlow POS';
  };

  const getSystemSubtitle = () => {
    if (user?.role === 'super_admin') {
      return 'Multi-Tenant Business Management System';
    }
    return 'Complete Business Management System';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-slate-900">{getSystemTitle()}</h1>
                <p className="text-sm text-slate-600">{getSystemSubtitle()}</p>
              </div>
              <TenantSelector />
            </div>
            <div className="flex items-center space-x-4">
              {user?.role === 'owner' && (
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              )}
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">{user?.name}</p>
                <p className="text-xs text-slate-500">{getRoleDisplay()}</p>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <RoleBasedNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Super Admin System Overview */}
          {user?.role === 'super_admin' && (
            <TabsContent value="system" className="space-y-6">
              <SuperAdminDashboard />
            </TabsContent>
          )}

          {/* Dashboard - Available to Super Admin, Owner, and Inventory Manager */}
          {(user?.role === 'super_admin' || user?.role === 'owner' || user?.role === 'inventory_manager') && (
            <TabsContent value="dashboard" className="space-y-6">
              <DashboardOverview />
            </TabsContent>
          )}

          {/* POS Interface for Cashiers */}
          {(user?.role === 'cashier' || user?.role === 'super_admin') && (
            <TabsContent value="pos" className="space-y-6">
              <div className="mb-6">
                <h2 className="text-3xl font-bold tracking-tight">Point of Sale</h2>
                <p className="text-muted-foreground">Process sales and manage transactions</p>
              </div>
              <POSInterface />
            </TabsContent>
          )}

          {/* Cash Management - Available to Super Admin and Owner */}
          {(user?.role === 'super_admin' || user?.role === 'owner') && (
            <TabsContent value="cash" className="space-y-6">
              <CashManagement />
            </TabsContent>
          )}

          {/* Inventory Management - Available to Super Admin, Owner, and Inventory Manager */}
          {(user?.role === 'super_admin' || user?.role === 'owner' || user?.role === 'inventory_manager') && (
            <TabsContent value="inventory" className="space-y-6">
              <InventoryManagement />
            </TabsContent>
          )}

          {/* Transaction History - Available to all roles but with different views */}
          <TabsContent value="transactions" className="space-y-6">
            <TransactionHistory />
          </TabsContent>

          {/* Reports & Analytics - Available to Super Admin and Owner */}
          {(user?.role === 'super_admin' || user?.role === 'owner') && (
            <TabsContent value="reports" className="space-y-6">
              <ReportsAnalytics />
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
};

export default Index;
