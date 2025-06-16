
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Package, Plus, AlertTriangle, TrendingUp, Search, Filter } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export const InventoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  const inventory = [
    { id: 1, name: 'Premium Coffee Beans', category: 'Beverages', stock: 5, minStock: 20, cost: 12.99, price: 18.99, supplier: 'Coffee Co.', status: 'critical' },
    { id: 2, name: 'Organic Milk', category: 'Dairy', stock: 12, minStock: 25, cost: 3.50, price: 5.99, supplier: 'Farm Fresh', status: 'low' },
    { id: 3, name: 'Artisan Bread', category: 'Bakery', stock: 8, minStock: 15, cost: 2.25, price: 4.50, supplier: 'Local Bakery', status: 'low' },
    { id: 4, name: 'Energy Drinks', category: 'Beverages', stock: 45, minStock: 30, cost: 1.50, price: 2.99, supplier: 'Beverage Inc.', status: 'good' },
    { id: 5, name: 'Protein Bars', category: 'Snacks', stock: 67, minStock: 25, cost: 0.99, price: 2.49, supplier: 'Nutrition Co.', status: 'good' },
  ];

  const purchaseOrders = [
    { id: 'PO-001', supplier: 'Coffee Co.', items: 3, total: 450.75, status: 'pending', date: '2024-01-15' },
    { id: 'PO-002', supplier: 'Farm Fresh', items: 5, total: 280.50, status: 'delivered', date: '2024-01-14' },
    { id: 'PO-003', supplier: 'Local Bakery', items: 2, total: 125.00, status: 'pending', date: '2024-01-13' },
  ];

  const categories = ['all', 'Beverages', 'Dairy', 'Bakery', 'Snacks'];

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'destructive';
      case 'low': return 'secondary';
      case 'good': return 'default';
      default: return 'default';
    }
  };

  const handleStockUpdate = (itemId: number, newStock: number) => {
    toast({
      title: "Stock Updated",
      description: `Stock level updated successfully`,
    });
    console.log(`Updated item ${itemId} stock to ${newStock}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Inventory Management</h2>
          <p className="text-muted-foreground">Track stock levels, manage purchases, and monitor inventory</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Inventory Item</DialogTitle>
              <DialogDescription>Enter details for the new product</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="item-name">Product Name</Label>
                <Input id="item-name" placeholder="Enter product name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="item-category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-supplier">Supplier</Label>
                  <Input id="item-supplier" placeholder="Supplier name" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="item-cost">Cost Price</Label>
                  <Input id="item-cost" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-price">Selling Price</Label>
                  <Input id="item-price" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="item-min">Min Stock</Label>
                  <Input id="item-min" type="number" placeholder="0" />
                </div>
              </div>
              <Button className="w-full">Add Item</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="inventory" className="space-y-6">
        <TabsList>
          <TabsTrigger value="inventory">Current Inventory</TabsTrigger>
          <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-6">
          {/* Inventory Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inventory.length}</div>
                <p className="text-xs text-muted-foreground">Active products</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
                <AlertTriangle className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {inventory.filter(item => item.status === 'low' || item.status === 'critical').length}
                </div>
                <p className="text-xs text-muted-foreground">Need reordering</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${inventory.reduce((sum, item) => sum + (item.stock * item.cost), 0).toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">At cost price</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Categories</CardTitle>
                <Filter className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{categories.length - 1}</div>
                <p className="text-xs text-muted-foreground">Product categories</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search inventory..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Table */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory Items</CardTitle>
              <CardDescription>Manage your product inventory and stock levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredInventory.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.category} • {item.supplier}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-sm font-medium">{item.stock}</p>
                        <p className="text-xs text-muted-foreground">In Stock</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">${item.price}</p>
                        <p className="text-xs text-muted-foreground">Price</p>
                      </div>
                      <Badge variant={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Update
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Orders</CardTitle>
              <CardDescription>Track and manage your purchase orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {purchaseOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{order.id}</h4>
                      <p className="text-sm text-muted-foreground">{order.supplier} • {order.items} items • {order.date}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">${order.total}</p>
                        <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                          {order.status}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Management</CardTitle>
              <CardDescription>Manage your supplier relationships and contacts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Coffee Co.', 'Farm Fresh', 'Local Bakery', 'Beverage Inc.', 'Nutrition Co.'].map((supplier, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{supplier}</h4>
                      <p className="text-sm text-muted-foreground">Active supplier</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant="default">Active</Badge>
                      <Button variant="outline" size="sm">
                        Contact
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
