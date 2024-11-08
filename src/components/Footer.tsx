import React from 'react';
import { Cloud } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-sky-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <Cloud className="h-8 w-8 text-sky-300 mr-2" />
              <span className="text-xl font-bold">ParashikimiIMotit.com</span>
            </div>
            <p className="text-sky-300">
              Informacioni më i saktë dhe i përditësuar për motin në Shqipëri, Kosovë dhe Maqedoninë e Veriut.
            </p>
          </div>
          
          <div>
            <p className="text-sky-300">
              Parashikimet tona bazohen në të dhëna nga stacionet meteorologjike moderne dhe përditësohen çdo orë për të siguruar informacionin më të saktë të motit.
            </p>
          </div>
        </div>
        
        <div className="text-center pt-8 border-t border-sky-800">
          <p className="text-sky-300">
            © {new Date().getFullYear()} ParashikimiIMotit.com - Të gjitha të drejtat e rezervuara.
          </p>
        </div>
      </div>
    </footer>
  );
}