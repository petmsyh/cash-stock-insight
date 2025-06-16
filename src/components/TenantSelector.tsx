
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Building, Hotel, ShoppingCart, Store } from 'lucide-react';

export const TenantSelector = () => {
  const { currentTenant, tenants, switchTenant, user } = useAuth();

  if (user?.role !== 'super_admin') return null;

  const getTenantIcon = (type: string) => {
    switch (type) {
      case 'hotel': return <Hotel className="h-4 w-4" />;
      case 'supermarket': return <ShoppingCart className="h-4 w-4" />;
      case 'shop': return <Store className="h-4 w-4" />;
      default: return <Building className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm font-medium text-slate-700">Current Business:</span>
      <Select 
        value={currentTenant?.id || ''} 
        onValueChange={switchTenant}
      >
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Select business" />
        </SelectTrigger>
        <SelectContent>
          {tenants.map(tenant => (
            <SelectItem key={tenant.id} value={tenant.id}>
              <div className="flex items-center space-x-2">
                {getTenantIcon(tenant.type)}
                <span>{tenant.name}</span>
                <Badge variant="secondary" className="ml-2">
                  {tenant.type}
                </Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
