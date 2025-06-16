
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Building, User, LogIn } from 'lucide-react';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('cashier');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  const roleOptions = [
    { value: 'super_admin', label: 'Super Administrator', description: 'Full system access' },
    { value: 'owner', label: 'Business Owner', description: 'Business management' },
    { value: 'cashier', label: 'Cashier', description: 'Sales and transactions' },
    { value: 'inventory_manager', label: 'Inventory Manager', description: 'Stock management' },
  ];

  const quickLogin = (role: UserRole) => {
    switch (role) {
      case 'super_admin':
        setEmail('admin@saas.com');
        break;
      case 'owner':
        setEmail('owner@hotel.com');
        break;
      case 'cashier':
        setEmail('cashier@hotel.com');
        break;
      case 'inventory_manager':
        setEmail('inventory@hotel.com');
        break;
    }
    setPassword('password');
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <Building className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl">BizFlow SaaS</CardTitle>
          <CardDescription>Multi-Tenant Business Management System</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          </form>

          <div className="space-y-3">
            <div className="text-center text-sm text-muted-foreground">
              Quick Login Demo
            </div>
            <div className="grid gap-2">
              {roleOptions.map((role) => (
                <Button
                  key={role.value}
                  variant="outline"
                  size="sm"
                  onClick={() => quickLogin(role.value as UserRole)}
                  className="justify-start"
                >
                  <User className="h-3 w-3 mr-2" />
                  <div className="text-left">
                    <div className="font-medium text-xs">{role.label}</div>
                    <div className="text-xs text-muted-foreground">{role.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
