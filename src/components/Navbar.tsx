import React from 'react';
import { Cloud } from 'lucide-react';

export default function Navbar() {
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a 
            href="/" 
            className="flex items-center space-x-2"
            onClick={(e) => handleNavigation(e, '/')}
          >
            <Cloud className="h-8 w-8 text-sky-500" />
            <span className="text-xl font-bold text-sky-900">ParashikimiIMotit.com</span>
          </a>
          
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="/" 
              className="text-sky-900 hover:text-sky-600"
              onClick={(e) => handleNavigation(e, '/')}
            >
              Ballina
            </a>
            <a 
              href="/shqiperia" 
              className="text-sky-900 hover:text-sky-600"
              onClick={(e) => handleNavigation(e, '/shqiperia')}
            >
              Shqipëria
            </a>
            <a 
              href="/kosova" 
              className="text-sky-900 hover:text-sky-600"
              onClick={(e) => handleNavigation(e, '/kosova')}
            >
              Kosova
            </a>
            <a 
              href="/maqedonia" 
              className="text-sky-900 hover:text-sky-600"
              onClick={(e) => handleNavigation(e, '/maqedonia')}
            >
              Maqedonia
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}