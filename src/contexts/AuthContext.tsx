
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'super_admin' | 'owner' | 'cashier' | 'inventory_manager';

export interface Tenant {
  id: string;
  name: string;
  type: 'hotel' | 'supermarket' | 'shop';
  owner: string;
  active: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  tenantId?: string;
}

interface AuthContextType {
  user: User | null;
  currentTenant: Tenant | null;
  tenants: Tenant[];
  login: (email: string, password: string) => void;
  logout: () => void;
  switchTenant: (tenantId: string) => void;
  addTenant: (tenant: Omit<Tenant, 'id'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const [tenants, setTenants] = useState<Tenant[]>([
    { id: '1', name: 'Downtown Hotel', type: 'hotel', owner: 'John Smith', active: true },
    { id: '2', name: 'Corner Supermarket', type: 'supermarket', owner: 'Sarah Johnson', active: true },
    { id: '3', name: 'Fashion Boutique', type: 'shop', owner: 'Mike Rodriguez', active: true },
  ]);

  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(tenants[0]);

  const login = (email: string, password: string) => {
    // Mock login - in real app, this would authenticate with backend
    if (email === 'admin@saas.com') {
      setUser({ id: '1', name: 'Super Admin', email, role: 'super_admin' });
      setCurrentTenant(tenants[0]);
    } else if (email === 'owner@hotel.com') {
      setUser({ id: '2', name: 'Hotel Owner', email, role: 'owner', tenantId: '1' });
      setCurrentTenant(tenants[0]);
    } else if (email === 'cashier@hotel.com') {
      setUser({ id: '3', name: 'Hotel Cashier', email, role: 'cashier', tenantId: '1' });
      setCurrentTenant(tenants[0]);
    } else if (email === 'inventory@hotel.com') {
      setUser({ id: '4', name: 'Inventory Manager', email, role: 'inventory_manager', tenantId: '1' });
      setCurrentTenant(tenants[0]);
    }
  };

  const logout = () => {
    setUser(null);
    setCurrentTenant(null);
  };

  const switchTenant = (tenantId: string) => {
    const tenant = tenants.find(t => t.id === tenantId);
    if (tenant) {
      setCurrentTenant(tenant);
    }
  };

  const addTenant = (newTenant: Omit<Tenant, 'id'>) => {
    const tenant: Tenant = {
      ...newTenant,
      id: (tenants.length + 1).toString()
    };
    setTenants([...tenants, tenant]);
  };

  return (
    <AuthContext.Provider value={{
      user,
      currentTenant,
      tenants,
      login,
      logout,
      switchTenant,
      addTenant
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
