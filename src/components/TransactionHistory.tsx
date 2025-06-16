
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Receipt, Search, Calendar as CalendarIcon, Filter, RefreshCw, Download } from 'lucide-react';
import { format } from "date-fns";

export const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<Date | undefined>(new Date());
  const [statusFilter, setStatusFilter] = useState('all');
  const [cashierFilter, setCashierFilter] = useState('all');

  const transactions = [
    { id: 'TXN-001', time: '14:32:15', cashier: 'Sarah Martinez', items: 3, subtotal: 45.99, tax: 3.68, total: 49.67, payment: 'Cash', status: 'completed' },
    { id: 'TXN-002', time: '14:28:42', cashier: 'Mike Rodriguez', items: 1, subtotal: 23.50, tax: 1.88, total: 25.38, payment: 'Card', status: 'refunded' },
    { id: 'TXN-003', time: '14:25:10', cashier: 'Sarah Martinez', items: 5, subtotal: 67.25, tax: 5.38, total: 72.63, payment: 'Card', status: 'completed' },
    { id: 'TXN-004', time: '14:20:35', cashier: 'Mike Rodriguez', items: 2, subtotal: 12.99, tax: 1.04, total: 14.03, payment: 'Cash', status: 'completed' },
    { id: 'TXN-005', time: '14:15:22', cashier: 'Sarah Martinez', items: 4, subtotal: 89.75, tax: 7.18, total: 96.93, payment: 'Card', status: 'completed' },
    { id: 'TXN-006', time: '14:12:48', cashier: 'Mike Rodriguez', items: 1, subtotal: 5.99, tax: 0.48, total: 6.47, payment: 'Cash', status: 'voided' },
  ];

  const cashiers = ['Sarah Martinez', 'Mike Rodriguez', 'Emma Johnson'];
  const statuses = ['completed', 'refunded', 'voided'];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.cashier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesCashier = cashierFilter === 'all' || transaction.cashier === cashierFilter;
    return matchesSearch && matchesStatus && matchesCashier;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'refunded': return 'secondary';
      case 'voided': return 'destructive';
      default: return 'default';
    }
  };

  const totalSales = filteredTransactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.total, 0);

  const totalRefunds = filteredTransactions
    .filter(t => t.status === 'refunded')
    .reduce((sum, t) => sum + t.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Transaction History</h2>
          <p className="text-muted-foreground">View and manage all sales transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Transaction Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredTransactions.length}</div>
            <p className="text-xs text-muted-foreground">Today's transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Sales</CardTitle>
            <Receipt className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalSales.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {filteredTransactions.filter(t => t.status === 'completed').length} transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refunds</CardTitle>
            <Receipt className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${totalRefunds.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {filteredTransactions.filter(t => t.status === 'refunded').length} refunds
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Voided</CardTitle>
            <Receipt className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {filteredTransactions.filter(t => t.status === 'voided').length}
            </div>
            <p className="text-xs text-muted-foreground">Cancelled transactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-48">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFilter ? format(dateFilter, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateFilter}
                  onSelect={setDateFilter}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={cashierFilter} onValueChange={setCashierFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Cashier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cashiers</SelectItem>
                {cashiers.map(cashier => (
                  <SelectItem key={cashier} value={cashier}>{cashier}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Showing {filteredTransactions.length} transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Receipt className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{transaction.id}</h4>
                    <p className="text-sm text-muted-foreground">
                      {transaction.cashier} • {transaction.time} • {transaction.items} items
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm font-medium">${transaction.total.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{transaction.payment}</p>
                  </div>
                  
                  <Badge variant={getStatusColor(transaction.status)}>
                    {transaction.status}
                  </Badge>
                  
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
