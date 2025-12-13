import React from 'react';
import PhotoManagement from '../admin/PhotoManagement';

const AdminMediaDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Media Dashboard</h1>
      <PhotoManagement />
    </div>
  );
};

export default AdminMediaDashboard;