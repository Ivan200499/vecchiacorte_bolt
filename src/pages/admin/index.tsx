import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Ordini Oggi',
      value: '24',
      change: '+12%',
      icon: TrendingUp,
    },
    {
      title: 'Clienti Attivi',
      value: '12',
      change: '+3',
      icon: Users,
    },
    {
      title: 'Ordini in Preparazione',
      value: '8',
      icon: ShoppingBag,
    },
    {
      title: 'Incasso Giornaliero',
      value: '€1,459.00',
      change: '+8.2%',
      icon: DollarSign,
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Panoramica delle attività del ristorante</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="w-8 h-8 text-indigo-600" />
              {stat.change && (
                <span className="text-sm font-medium text-green-600">
                  {stat.change}
                </span>
              )}
            </div>
            <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}