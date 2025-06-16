
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Building, Users, DollarSign, AlertTriangle, Plus } from 'lucide-react';

export const SuperAdminDashboard = () => {
  const { tenants } = useAuth();

  const totalRevenue = 15847.25;
  const totalTransactions = 432;
  const activeTenants = tenants.filter(t => t.active).length;

  const recentActivity = [
    { tenant: 'Downtown Hotel', activity: 'High-value transaction', amount: '$1,250.00', time: '5 min ago', status: 'flagged' },
    { tenant: 'Corner Supermarket', activity: 'Inventory update', amount: '+150 items', time: '12 min ago', status: 'normal' },
    { tenant: 'Fashion Boutique', activity: 'Cash drop', amount: '$500.00', time: '18 min ago', status: 'normal' },
  ];

  const tenantStats = tenants.map(tenant => ({
    ...tenant,
    revenue: Math.random() * 5000 + 1000,
    transactions: Math.floor(Math.random() * 100) + 20,
    alerts: Math.floor(Math.random() * 5)
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h2>
          <p className="text-muted-foreground">Monitor all businesses across the SaaS platform</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Business
        </Button>
      </div>

      {/* System Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Businesses</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeTenants}</div>
            <p className="text-xs text-muted-foreground">Across all tenants</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Today across all businesses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTransactions}</div>
            <p className="text-xs text-muted-foreground">System-wide today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">8</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Business Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Business Performance</CardTitle>
            <CardDescription>Revenue and transaction overview by tenant</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tenantStats.map((tenant) => (
                <div key={tenant.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{tenant.name}</p>
                    <p className="text-sm text-muted-foreground">{tenant.owner}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${tenant.revenue.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{tenant.transactions} transactions</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={tenant.active ? 'default' : 'secondary'}>
                      {tenant.active ? 'Active' : 'Inactive'}
                    </Badge>
                    {tenant.alerts > 0 && (
                      <Badge variant="destructive">{tenant.alerts}</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent System Activity</CardTitle>
            <CardDescription>Cross-tenant monitoring and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'flagged' ? 'bg-red-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium">{activity.activity}</p>
                      <p className="text-xs text-muted-foreground">{activity.tenant} • {activity.time}</p>
                    </div>
                  </div>
                  <Badge variant={activity.status === 'flagged' ? 'destructive' : 'default'}>
                    {activity.amount}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
