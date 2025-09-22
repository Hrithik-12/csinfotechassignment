import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AgentForm from "../components/AgentForm";
import AgentList from "../compo/AgentList";
import UploadForm from "../compo/UploadForm";
import CompactDistributionList from "../compo/CompactDistributionList";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  const handleUpload = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div 
      className="min-h-screen bg-gray-50"
      style={{
        backgroundImage: 'url(/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background overlay for better readability */}
      <div className="min-h-screen bg-white/85 backdrop-blur-sm">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome Admin!
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="bg-white/95 backdrop-blur-sm shadow-lg rounded-xl border border-white/30">
              <div className="px-6 py-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Welcome to Your Admin Dashboard
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-600 mb-4">
                      Manage your agents and distribute tasks efficiently. Upload files to automatically 
                      assign tasks to your team members.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-900 mb-2">Security Features:</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm text-blue-700">
                        <div className="flex items-center gap-1">
                          <span className="text-green-500">✅</span> JWT Authentication
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-green-500">✅</span> Protected Routes
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-green-500">✅</span> Secure Hashing
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-green-500">✅</span> Session Management
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <img 
                        src="/welcome.jpg" 
                        alt="Welcome to Dashboard" 
                        className="rounded-lg shadow-lg max-w-full h-auto object-cover"
                        style={{ maxHeight: '250px', width: 'auto' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Agent Management Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 drop-shadow-sm">Agent Management</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <AgentForm onAgentAdded={() => window.location.reload()} />
              </div>
              <div>
                <AgentList />
              </div>
            </div>
          </div>

          {/* Task Distribution Section - Side by Side Layout */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 drop-shadow-sm">Task Distribution</h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div>
                <UploadForm onUpload={handleUpload} />
              </div>
              <div key={refreshKey}>
                <CompactDistributionList refreshKey={refreshKey} />
              </div>
            </div>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
};

export default Dashboard;