import React from 'react';
import { Search, Plus, LogIn, LogOut, User } from 'lucide-react';
import logo from '../../assets/codenest-logo.png';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { APP_NAME } from '../../constants/app.constants';

/**
 * Header component with logo, search, and auth controls
 */
const Header = ({ 
  user, 
  searchTerm, 
  onSearchChange, 
  onAddClick, 
  onSignInAnonymous, 
  onSignInWithGoogle, 
  onSignOut 
}) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logo} alt={`${APP_NAME} Logo`} className="h-14 w-14" />
            <h1 className="text-2xl font-bold text-gray-800">{APP_NAME}</h1>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="w-64">
              <Input
                type="text"
                placeholder="Search tutorials..."
                value={searchTerm}
                onChange={onSearchChange}
                icon={<Search size={20} />}
              />
            </div>

            {/* Auth Section */}
            {user ? (
              <>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User size={16} />
                  <span>{user.isAnonymous ? 'Guest' : user.email || 'User'}</span>
                </div>
                <Button 
                  onClick={onAddClick}
                  icon={<Plus size={16} />}
                >
                  Add
                </Button>
                <Button 
                  onClick={onSignOut}
                  variant="outline"
                  icon={<LogOut size={16} />}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  onClick={onSignInAnonymous}
                  variant="secondary"
                  icon={<LogIn size={16} />}
                >
                  Quick Access
                </Button>
                <Button 
                  onClick={onSignInWithGoogle}
                  icon={<LogIn size={16} />}
                >
                  Sign In
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
