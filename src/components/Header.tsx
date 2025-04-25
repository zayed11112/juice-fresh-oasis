
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, BookOpen, Star, CreditCard, Phone } from 'lucide-react';
import DesignerInfo from './DesignerInfo';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Función para verificar si un enlace está activo
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 animate-theme-transition">
      {/* Decoración superior - línea de color */}
      <div className="h-1 w-full bg-gradient-to-r from-juice-green via-juice-orange to-juice-green"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="relative mr-2 w-10 h-10 overflow-hidden rounded-full shadow-md transform transition-transform duration-500 group-hover:scale-110">
                <img
                  src="/assets/logo_juice.png"
                  alt="Juice Fresh Logo"
                  className="w-full h-full object-cover animate-spin-slow"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-juice-green/20 to-juice-orange/20 group-hover:opacity-0 transition-opacity duration-500"></div>
              </div>
              <div className="flex flex-col items-start ml-1">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-juice-green-dark group-hover:text-juice-green transition-colors duration-300">Juice</span>
                  <span className="text-2xl font-bold text-juice-orange group-hover:text-juice-orange-dark transition-colors duration-300">Fresh</span>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-300 -mt-1 font-medium">عصائر طازجة 100%</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
            <Link
              to="/"
              className={`relative px-2 py-1 font-medium transition-all duration-300 ${
                isActive('/')
                  ? 'text-juice-green font-bold'
                  : 'text-gray-700 dark:text-gray-200 hover:text-juice-green'
              }`}
            >
              <span className="flex items-center gap-1">
                <Home className={`h-4 w-4 ${isActive('/') ? 'text-juice-green' : ''}`} />
                <span>الرئيسية</span>
              </span>
              {isActive('/') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-juice-green rounded-full"></span>
              )}
            </Link>

            <Link
              to="/menu"
              className={`relative px-2 py-1 font-medium transition-all duration-300 ${
                isActive('/menu')
                  ? 'text-juice-green font-bold'
                  : 'text-gray-700 dark:text-gray-200 hover:text-juice-green'
              }`}
            >
              <span className="flex items-center gap-1">
                <BookOpen className={`h-4 w-4 ${isActive('/menu') ? 'text-juice-green' : ''}`} />
                <span>المنيو</span>
              </span>
              {isActive('/menu') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-juice-green rounded-full"></span>
              )}
            </Link>

            <Link
              to="/reviews"
              className={`relative px-2 py-1 font-medium transition-all duration-300 ${
                isActive('/reviews')
                  ? 'text-juice-green font-bold'
                  : 'text-gray-700 dark:text-gray-200 hover:text-juice-green'
              }`}
            >
              <span className="flex items-center gap-1">
                <Star className={`h-4 w-4 ${isActive('/reviews') ? 'text-juice-green' : ''}`} />
                <span>التقييمات</span>
              </span>
              {isActive('/reviews') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-juice-green rounded-full"></span>
              )}
            </Link>

            <Link
              to="/payment"
              className={`relative px-2 py-1 font-medium transition-all duration-300 ${
                isActive('/payment')
                  ? 'text-juice-green font-bold'
                  : 'text-gray-700 dark:text-gray-200 hover:text-juice-green'
              }`}
            >
              <span className="flex items-center gap-1">
                <CreditCard className={`h-4 w-4 ${isActive('/payment') ? 'text-juice-green' : ''}`} />
                <span>الدفع</span>
              </span>
              {isActive('/payment') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-juice-green rounded-full"></span>
              )}
            </Link>

            <Link
              to="/contact"
              className={`relative px-2 py-1 font-medium transition-all duration-300 ${
                isActive('/contact')
                  ? 'text-juice-green font-bold'
                  : 'text-gray-700 dark:text-gray-200 hover:text-juice-green'
              }`}
            >
              <span className="flex items-center gap-1">
                <Phone className={`h-4 w-4 ${isActive('/contact') ? 'text-juice-green' : ''}`} />
                <span>تواصل معنا</span>
              </span>
              {isActive('/contact') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-juice-green rounded-full"></span>
              )}
            </Link>
          </nav>

          {/* Theme Toggle and Mobile menu button */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <ThemeToggle />

            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-500 hover:text-juice-green focus:outline-none transition-all duration-300 transform hover:scale-110"
                aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-juice-green animate-pulse-slow" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div
          className={`fixed inset-y-0 right-0 max-w-xs w-full bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="px-4 pt-5 pb-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="relative mr-2 w-8 h-8 overflow-hidden rounded-full shadow-md">
                <img
                  src="/assets/logo_juice.png"
                  alt="Juice Fresh Logo"
                  className="w-full h-full object-cover animate-spin-slow"
                />
              </div>
              <div className="flex items-center">
                <span className="text-xl font-bold text-juice-green-dark">Juice</span>
                <span className="text-xl font-bold text-juice-orange">Fresh</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <ThemeToggle className="mr-2" />
              <button
                onClick={toggleMenu}
                className="p-2 rounded-full bg-gray-50 text-gray-500 hover:text-juice-green focus:outline-none transition-all duration-300 transform hover:scale-110 hover:rotate-90"
                aria-label="إغلاق القائمة"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="px-2 pt-2 pb-3 space-y-3 sm:px-3 text-center font-bold overflow-y-auto max-h-[calc(100vh-80px)]">
            <Link
              to="/"
              className={`flex items-center justify-center gap-2 px-3 py-3 rounded-lg text-base font-bold transition-all duration-300 text-center animate-fade-in ${
                isActive('/')
                  ? 'bg-juice-green text-white'
                  : 'text-gray-700 dark:text-gray-200 hover:text-white hover:bg-juice-green'
              }`}
              onClick={() => setIsMenuOpen(false)}
              style={{animationDelay: '0.1s'}}
            >
              <Home className="h-5 w-5" />
              <span>الرئيسية</span>
            </Link>
            <Link
              to="/menu"
              className={`flex items-center justify-center gap-2 px-3 py-3 rounded-lg text-base font-bold transition-all duration-300 text-center animate-fade-in ${
                isActive('/menu')
                  ? 'bg-juice-green text-white'
                  : 'text-gray-700 dark:text-gray-200 hover:text-white hover:bg-juice-green'
              }`}
              onClick={() => setIsMenuOpen(false)}
              style={{animationDelay: '0.2s'}}
            >
              <BookOpen className="h-5 w-5" />
              <span>المنيو</span>
            </Link>
            <Link
              to="/reviews"
              className={`flex items-center justify-center gap-2 px-3 py-3 rounded-lg text-base font-bold transition-all duration-300 text-center animate-fade-in ${
                isActive('/reviews')
                  ? 'bg-juice-green text-white'
                  : 'text-gray-700 dark:text-gray-200 hover:text-white hover:bg-juice-green'
              }`}
              onClick={() => setIsMenuOpen(false)}
              style={{animationDelay: '0.3s'}}
            >
              <Star className="h-5 w-5" />
              <span>التقييمات</span>
            </Link>
            <Link
              to="/payment"
              className={`flex items-center justify-center gap-2 px-3 py-3 rounded-lg text-base font-bold transition-all duration-300 text-center animate-fade-in ${
                isActive('/payment')
                  ? 'bg-juice-green text-white'
                  : 'text-gray-700 dark:text-gray-200 hover:text-white hover:bg-juice-green'
              }`}
              onClick={() => setIsMenuOpen(false)}
              style={{animationDelay: '0.4s'}}
            >
              <CreditCard className="h-5 w-5" />
              <span>الدفع</span>
            </Link>
            <Link
              to="/contact"
              className={`flex items-center justify-center gap-2 px-3 py-3 rounded-lg text-base font-bold transition-all duration-300 text-center animate-fade-in ${
                isActive('/contact')
                  ? 'bg-juice-green text-white'
                  : 'text-gray-700 dark:text-gray-200 hover:text-white hover:bg-juice-green'
              }`}
              onClick={() => setIsMenuOpen(false)}
              style={{animationDelay: '0.5s'}}
            >
              <Phone className="h-5 w-5" />
              <span>تواصل معنا</span>
            </Link>

            <div className="mt-6 px-3 animate-fade-in" style={{animationDelay: '0.6s'}}>
              <DesignerInfo variant="sidebar" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
