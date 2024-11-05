import React from 'react';
import { LayoutDashboard, UtensilsCrossed, ClipboardList, Users } from 'lucide-react';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: UtensilsCrossed, label: 'Menu', path: '/admin/menu' },
    { icon: ClipboardList, label: 'Ordini', path: '/admin/orders' },
    { icon: Users, label: 'Staff', path: '/admin/staff' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar menuItems={menuItems} />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}