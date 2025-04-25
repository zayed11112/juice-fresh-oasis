
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, CreditCard, Clock, ExternalLink } from 'lucide-react';
import DesignerInfo from './DesignerInfo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  // Función para verificar si un enlace está activo
  const isActive = (path: string) => location.pathname === path;

  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black text-white text-sm animate-theme-transition shadow-lg">
      {/* Decoración superior */}
      <div className="h-1 w-full bg-gradient-to-r from-juice-green via-juice-orange to-juice-green"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-right">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-juice-green">Juice</span>
              <span className="text-2xl font-bold text-juice-orange">Fresh</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              العصائر الطازجة والمشروبات المنعشة بأعلى جودة وأفضل المكونات الطبيعية.
            </p>
            <div className="mt-auto hidden md:block">
              <Link
                to="/contact"
                className="inline-flex items-center text-juice-green hover:text-juice-orange transition-colors duration-300"
              >
                <span>تواصل معنا</span>
                <ExternalLink className="mr-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-right">
            <h3 className="text-lg font-bold mb-4 text-white relative inline-block">
              روابط سريعة
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 w-12 h-0.5 bg-gradient-to-r from-juice-green to-green-400 animate-gradient"></span>
            </h3>
            <div className="space-y-3">
              <Link
                to="/"
                className={`block transition-all duration-300 ${
                  isActive('/')
                    ? 'text-juice-green font-bold'
                    : 'text-gray-300 hover:text-juice-green hover:translate-x-1 rtl:hover:-translate-x-1'
                }`}
              >
                الرئيسية
              </Link>
              <Link
                to="/menu"
                className={`block transition-all duration-300 ${
                  isActive('/menu')
                    ? 'text-juice-green font-bold'
                    : 'text-gray-300 hover:text-juice-green hover:translate-x-1 rtl:hover:-translate-x-1'
                }`}
              >
                المنيو
              </Link>
              <Link
                to="/reviews"
                className={`block transition-all duration-300 ${
                  isActive('/reviews')
                    ? 'text-juice-green font-bold'
                    : 'text-gray-300 hover:text-juice-green hover:translate-x-1 rtl:hover:-translate-x-1'
                }`}
              >
                التقييمات
              </Link>
              <Link
                to="/payment"
                className={`block transition-all duration-300 ${
                  isActive('/payment')
                    ? 'text-juice-green font-bold'
                    : 'text-gray-300 hover:text-juice-green hover:translate-x-1 rtl:hover:-translate-x-1'
                }`}
              >
                الدفع
              </Link>
              <Link
                to="/contact"
                className={`block transition-all duration-300 ${
                  isActive('/contact')
                    ? 'text-juice-green font-bold'
                    : 'text-gray-300 hover:text-juice-green hover:translate-x-1 rtl:hover:-translate-x-1'
                }`}
              >
                تواصل معنا
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-right">
            <h3 className="text-lg font-bold mb-4 text-white relative inline-block">
              تواصل معنا
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 w-12 h-0.5 bg-gradient-to-r from-juice-orange to-yellow-400 animate-gradient" style={{animationDelay: '0.3s'}}></span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start text-gray-300 group">
                <Phone className="ml-2 h-4 w-4 text-juice-orange group-hover:animate-bounce" />
                <span className="group-hover:text-white transition-colors duration-300">01224350190</span>
              </div>
              <div className="flex items-start justify-center md:justify-start text-gray-300 group">
                <MapPin className="ml-2 h-4 w-4 text-juice-orange mt-1 group-hover:animate-bounce" />
                <span className="group-hover:text-white transition-colors duration-300">المساعيد - دوران شبرا - أمام مسجد عمرو بن العاص</span>
              </div>
              <div className="flex items-center justify-center md:justify-start text-gray-300 group">
                <CreditCard className="ml-2 h-4 w-4 text-juice-orange group-hover:animate-bounce" />
                <span className="group-hover:text-white transition-colors duration-300">فودافون كاش: 01018773855</span>
              </div>
              <div className="flex items-center justify-center md:justify-start text-gray-300 group">
                <Clock className="ml-2 h-4 w-4 text-juice-orange group-hover:animate-bounce" />
                <span className="group-hover:text-white transition-colors duration-300">يوميا من 9 صباحاً حتى 2 منتصف الليل</span>
              </div>
            </div>
          </div>

          {/* Social Media & Designer Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-right">
            <h3 className="text-lg font-bold mb-4 text-white relative inline-block">
              المصمم
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 md:left-auto md:right-0 md:translate-x-0 w-12 h-0.5 bg-gradient-to-r from-juice-green-dark to-juice-green animate-gradient" style={{animationDelay: '0.6s'}}></span>
            </h3>
            <div className="mt-auto">
              <DesignerInfo variant="footer" />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-xs">
          <p>© {currentYear} Juice Fresh - جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
