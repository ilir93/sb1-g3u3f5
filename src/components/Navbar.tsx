import React from 'react';
import { Cloud } from 'lucide-react';

export default function Navbar() {
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a 
            href="/" 
            className="flex items-center space-x-2"
            onClick={handleNavigation}
          >
            <Cloud className="h-8 w-8 text-sky-500" />
            <span className="text-xl font-bold text-sky-900">ParashikimiIMotit.com</span>
          </a>
        </div>
      </div>
    </nav>
  );
}