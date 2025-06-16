
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Plus, Minus, Clock, User, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export const CashManagement = () => {
  const [cashAmount, setCashAmount] = useState('');
  const [selectedCashier, setSelectedCashier] = useState('');
  const { toast } = useToast();

  const cashiers = [
    { id: '1', name: 'Sarah Martinez', status: 'active', drawerBalance: 450.00 },
    { id: '2', name: 'Mike Rodriguez', status: 'active', drawerBalance: 320.75 },
    { id: '3', name: 'Emma Johnson', status: 'inactive', drawerBalance: 0.00 },
  ];

  const cashMovements = [
    { time: '09:15 AM', type: 'drawer_open', cashier: 'Sarah Martinez', amount: 500.00, balance: 500.00 },
    { time: '10:30 AM', type: 'sale', cashier: 'Sarah Martinez', amount: -45.99, balance: 454.01 },
    { time: '11:45 AM', type: 'cash_drop', cashier: 'Sarah Martinez', amount: -200.00, balance: 254.01 },
    { time: '12:15 PM', type: 'drawer_open', cashier: 'Mike Rodriguez', amount: 400.00, balance: 400.00 },
    { time: '01:30 PM', type: 'refund', cashier: 'Mike Rodriguez', amount: 23.50, balance: 423.50 },
  ];

  const handleCashTransaction = (type: 'add' | 'remove') => {
    if (!cashAmount || !selectedCashier) {
      toast({
        title: "Error",
        description: "Please select a cashier and enter an amount",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(cashAmount);
    const action = type === 'add' ? 'added to' : 'removed from';
    const cashier = cashiers.find(c => c.id === selectedCashier)?.name;

    toast({
      title: "Cash Transaction Recorded",
      description: `$${amount.toFixed(2)} ${action} ${cashier}'s drawer`,
    });

    setCashAmount('');
    console.log(`Cash ${type}: $${amount} for cashier ${cashier}`);
  };

  const getMovementIcon = (type: string) => {
    switch (type) {
      case 'drawer_open': return <Plus className="h-4 w-4 text-green-600" />;
      case 'sale': return <Minus className="h-4 w-4 text-red-600" />;
      case 'cash_drop': return <Minus className="h-4 w-4 text-blue-600" />;
      case 'refund': return <Plus className="h-4 w-4 text-orange-600" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  const getMovementLabel = (type: string) => {
    switch (type) {
      case 'drawer_open': return 'Drawer Opening';
      case 'sale': return 'Sale Transaction';
      case 'cash_drop': return 'Cash Drop';
      case 'refund': return 'Refund';
      default: return 'Transaction';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Cash Management</h2>
          <p className="text-muted-foreground">Monitor and manage cash flow operations</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Cash Transactions</TabsTrigger>
          <TabsTrigger value="cashiers">Cashier Management</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Cash Summary Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Cash on Hand</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,570.75</div>
                <p className="text-xs text-muted-foreground">Across all drawers</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Cashiers</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Currently working</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Drops</CardTitle>
                <Minus className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$800.00</div>
                <p className="text-xs text-muted-foreground">4 drops completed</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Cash Operations */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Cash Operations</CardTitle>
              <CardDescription>Add or remove cash from cashier drawers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cashier-select">Select Cashier</Label>
                  <Select value={selectedCashier} onValueChange={setSelectedCashier}>
                    <SelectTrigger id="cashier-select">
                      <SelectValue placeholder="Choose cashier" />
                    </SelectTrigger>
                    <SelectContent>
                      {cashiers.filter(c => c.status === 'active').map(cashier => (
                        <SelectItem key={cashier.id} value={cashier.id}>
                          {cashier.name} (${cashier.drawerBalance.toFixed(2)})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cash-amount">Amount</Label>
                  <Input
                    id="cash-amount"
                    type="number"
                    placeholder="0.00"
                    value={cashAmount}
                    onChange={(e) => setCashAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleCashTransaction('add')} className="flex-1">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Cash
                </Button>
                <Button onClick={() => handleCashTransaction('remove')} variant="outline" className="flex-1">
                  <Minus className="h-4 w-4 mr-2" />
                  Remove Cash
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cash Movement History</CardTitle>
              <CardDescription>Real-time tracking of all cash movements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cashMovements.map((movement, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getMovementIcon(movement.type)}
                      <div>
                        <p className="font-medium">{getMovementLabel(movement.type)}</p>
                        <p className="text-sm text-muted-foreground">{movement.cashier} • {movement.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${movement.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {movement.amount > 0 ? '+' : ''}${Math.abs(movement.amount).toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">Balance: ${movement.balance.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cashiers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cashier Status</CardTitle>
              <CardDescription>Monitor cashier activity and drawer balances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cashiers.map((cashier) => (
                  <div key={cashier.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${cashier.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <div>
                        <p className="font-medium">{cashier.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {cashier.status === 'active' ? 'Currently working' : 'Not active'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${cashier.drawerBalance.toFixed(2)}</p>
                      <Badge variant={cashier.status === 'active' ? 'default' : 'secondary'}>
                        {cashier.status}
                      </Badge>
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
