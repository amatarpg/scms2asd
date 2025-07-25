import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  FileText, 
  HelpCircle, 
  BookOpen, 
  School, 
  BarChart3, 
  User, 
  LogOut,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  activeMenu: string;
  onMenuClick: (menu: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeMenu, onMenuClick, isOpen, onClose }) => {
  const { logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'teachers', label: 'Kelola Guru', icon: Users },
    { id: 'students', label: 'Kelola Siswa', icon: GraduationCap },
    { id: 'exams', label: 'Kelola Ujian', icon: FileText },
    { id: 'questions', label: 'Kelola Soal', icon: HelpCircle },
    { id: 'subjects', label: 'Mata Pelajaran', icon: BookOpen },
    { id: 'classes', label: 'Kelas', icon: School },
    { id: 'analytics', label: 'Analitik', icon: BarChart3 },
  ];

  const bottomMenuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'logout', label: 'Logout', icon: LogOut, action: logout },
  ];

  const handleMenuClick = (menu: string, action?: () => void) => {
    if (action) {
      action();
    } else {
      onMenuClick(menu);
    }
    onClose(); // Close mobile menu after selection
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Logo/Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <School className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
              <p className="text-sm text-gray-500">School Management</p>
            </div>
          </div>
        </div>

        {/* Main Menu */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeMenu === item.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Menu */}
        <div className="px-4 py-4 border-t border-gray-200">
          <ul className="space-y-2">
            {bottomMenuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuClick(item.id, item.action)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeMenu === item.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  } ${item.id === 'logout' ? 'hover:bg-red-50 hover:text-red-700' : ''}`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;