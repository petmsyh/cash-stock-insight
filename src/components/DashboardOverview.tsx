
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, DollarSign, Package, ShoppingCart, Users, AlertTriangle, CheckCircle } from 'lucide-react';

export const DashboardOverview = () => {
  const stats = [
    {
      title: "Today's Sales",
      value: "$2,847.50",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Cash on Hand",
      value: "$1,250.00",
      change: "Drawer: $450",
      trend: "neutral",
      icon: DollarSign,
    },
    {
      title: "Total Inventory",
      value: "1,247",
      change: "15 low stock",
      trend: "warning",
      icon: Package,
    },
    {
      title: "Transactions",
      value: "78",
      change: "+8% vs yesterday",
      trend: "up",
      icon: ShoppingCart,
    },
  ];

  const recentActivity = [
    { time: "2 min ago", action: "Sale completed", amount: "$45.99", cashier: "Sarah M." },
    { time: "5 min ago", action: "Inventory updated", amount: "+50 items", cashier: "System" },
    { time: "12 min ago", action: "Cash drawer opened", amount: "$500.00", cashier: "Mike R." },
    { time: "18 min ago", action: "Refund processed", amount: "-$23.50", cashier: "Sarah M." },
  ];

  const lowStockItems = [
    { name: "Premium Coffee Beans", current: 5, minimum: 20, status: "critical" },
    { name: "Organic Milk", current: 12, minimum: 25, status: "low" },
    { name: "Artisan Bread", current: 8, minimum: 15, status: "low" },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs flex items-center ${
                stat.trend === 'up' ? 'text-green-600' : 
                stat.trend === 'down' ? 'text-red-600' : 
                stat.trend === 'warning' ? 'text-orange-600' : 'text-muted-foreground'
              }`}>
                {stat.trend === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
                {stat.trend === 'down' && <TrendingDown className="h-3 w-3 mr-1" />}
                {stat.trend === 'warning' && <AlertTriangle className="h-3 w-3 mr-1" />}
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Live feed of store operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time} • {activity.cashier}</p>
                    </div>
                  </div>
                  <Badge variant={activity.amount.startsWith('-') ? 'destructive' : 'default'}>
                    {activity.amount}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
              Low Stock Alerts
            </CardTitle>
            <CardDescription>Items requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{item.name}</p>
                    <Badge variant={item.status === 'critical' ? 'destructive' : 'secondary'}>
                      {item.current} left
                    </Badge>
                  </div>
                  <Progress 
                    value={(item.current / item.minimum) * 100} 
                    className="h-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    Minimum: {item.minimum} units
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            <button className="flex items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="text-center">
                <ShoppingCart className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                <p className="text-sm font-medium">New Sale</p>
              </div>
            </button>
            <button className="flex items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="text-center">
                <Package className="h-6 w-6 mx-auto mb-2 text-green-600" />
                <p className="text-sm font-medium">Add Inventory</p>
              </div>
            </button>
            <button className="flex items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="text-center">
                <DollarSign className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                <p className="text-sm font-medium">Cash Count</p>
              </div>
            </button>
            <button className="flex items-center justify-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-orange-600" />
                <p className="text-sm font-medium">Staff Report</p>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
