import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-amber-50 to-yellow-50 border-t border-yellow-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left side - Brand */}
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="bg-gradient-to-br from-yellow-500 to-amber-600 w-10 h-10 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-base">SD</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-amber-800">StudentsDesk</h2>
              <p className="text-amber-600 text-xs font-medium">Academic Management Platform</p>
            </div>
          </div>

          {/* Center - Copyright */}
          <div className="text-amber-700 text-sm text-center mb-4 md:mb-0">
            <p className="font-medium">© {currentYear} StudentsDesk. All rights reserved.</p>
          </div>

          {/* Right side - Links */}
          <div className="flex items-center space-x-6 text-sm">
            <Link 
              to="/privacy" 
              className="text-amber-700 hover:text-amber-900 font-medium hover:underline"
            >
              Privacy
            </Link>
            <span className="text-amber-400">•</span>
            <Link 
              to="/terms" 
              className="text-amber-700 hover:text-amber-900 font-medium hover:underline"
            >
              Terms
            </Link>
            <span className="text-amber-400">•</span>
            <Link 
              to="/contact" 
              className="text-amber-700 hover:text-amber-900 font-medium hover:underline"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Simple divider and tagline */}
        <div className="mt-6 pt-6 border-t border-yellow-200">
          <p className="text-center text-amber-600 text-xs font-medium">
            Empowering students worldwide with academic tools and resources.
          </p>
        </div>
      </div>
    </footer>
  );
}