import React, { useState, useEffect } from 'react';
import { Instagram, Facebook } from 'lucide-react';

interface DesignerInfoProps {
  variant?: 'footer' | 'sidebar';
}

const DesignerInfo: React.FC<DesignerInfoProps> = ({ variant = 'footer' }) => {
  const isFooter = variant === 'footer';
  const isSidebar = variant === 'sidebar';
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/assets/eslamzayed.jpg';
    img.onload = () => setIsImageLoaded(true);
  }, []);

  return (
    <div className={`${isFooter ? 'text-center' : 'text-right'} relative overflow-hidden`}>
      <div
        className={`
          ${isFooter ? 'py-3 px-4 rounded-lg' : 'py-3 px-4 rounded-xl'}
          ${isSidebar ? 'bg-gradient-to-br from-gray-800/95 to-gray-900/95' : 'bg-gradient-to-r from-gray-800/90 to-gray-900/90'}
          backdrop-blur-sm
          ${isSidebar ? 'border-0 shadow-2xl' : 'border border-gray-700/50 shadow-xl'}
          relative
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* زخرفة خلفية */}
        {isSidebar ? (
          <>
            <div className="absolute right-0 top-0 w-full h-full bg-gradient-to-br from-juice-green/5 to-juice-orange/5 opacity-50"></div>
            <div className="absolute right-0 top-0 w-20 h-20 bg-juice-green/10 rounded-full blur-xl animate-pulse-slow"></div>
            <div className="absolute left-0 bottom-0 w-20 h-20 bg-juice-orange/10 rounded-full blur-xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
          </>
        ) : (
          <>
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-juice-green/10 rounded-full blur-xl animate-pulse-slow"></div>
            <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-juice-orange/10 rounded-full blur-xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
          </>
        )}

        <div className="relative flex flex-col md:flex-row items-center gap-3">
          {/* صورة المصمم */}
          <div
            className={`
              ${isFooter ? 'w-16 h-16' : isSidebar ? 'w-20 h-20' : 'w-12 h-12'}
              rounded-full overflow-hidden
              ${isSidebar ? 'border-2 border-juice-green/30 shadow-xl' : 'border-2 border-white/20 shadow-lg'}
              transition-all duration-500 ease-in-out
              ${isHovered ? 'scale-110 rotate-6' : ''}
              ${isSidebar ? 'mx-auto mb-3' : ''}
            `}
          >
            <div className="relative w-full h-full">
              <div
                className={`
                  absolute inset-0 bg-gradient-to-br from-juice-green/30 to-juice-orange/30
                  animate-shimmer bg-[length:200%_100%]
                  ${isImageLoaded ? 'opacity-0' : 'opacity-100'}
                  transition-opacity duration-500
                `}
              ></div>
              <img
                src="/assets/eslamzayed.jpg"
                alt="م. إسلام زايد"
                className={`
                  w-full h-full object-cover
                  ${isImageLoaded ? 'opacity-100' : 'opacity-0'}
                  transition-opacity duration-500
                `}
                onLoad={() => setIsImageLoaded(true)}
              />
            </div>
          </div>

          <div className={`relative flex-1 ${isSidebar ? 'text-center' : ''}`}>
            <div className={`${isFooter ? 'text-center md:text-right' : isSidebar ? 'text-center' : 'text-right'}`}>
              <h3 className={`
                font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r
                from-juice-green via-juice-orange to-juice-green
                ${isFooter ? 'text-base' : isSidebar ? 'text-base' : 'text-sm'}
                ${isHovered ? 'animate-pulse-slow' : ''}
              `}>
                تم التصميم بواسطة
              </h3>

              <div className={`
                ${isFooter ? 'text-base' : isSidebar ? 'text-lg' : 'text-sm'}
                font-bold text-white mb-1
                transition-all duration-300
                ${isHovered ? 'text-juice-orange' : ''}
              `}>
                م. إسلام زايد
              </div>

              <div className={`${isFooter ? 'text-xs' : isSidebar ? 'text-sm' : 'text-xs'} text-gray-300 mb-2`}>
                هاتف: 01003193622
              </div>

              <div className={`flex ${isFooter ? 'justify-center md:justify-end' : isSidebar ? 'justify-center' : 'justify-end'} space-x-3 rtl:space-x-reverse`}>
                <a
                  href="https://www.instagram.com/eslamz11/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    bg-gradient-to-br from-purple-600 to-pink-500 ${isSidebar ? 'p-3' : 'p-2'} rounded-full
                    transform hover:scale-110 hover:rotate-12 transition-all duration-300
                    ${isHovered ? 'animate-bounce-slow' : ''}
                  `}
                  style={{animationDelay: '0.1s'}}
                  aria-label="Instagram"
                >
                  <Instagram size={isFooter ? 16 : isSidebar ? 18 : 14} className="text-white" />
                </a>

                <a
                  href="https://www.facebook.com/eslammosalah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    bg-gradient-to-br from-blue-600 to-blue-500 ${isSidebar ? 'p-3' : 'p-2'} rounded-full
                    transform hover:scale-110 hover:rotate-12 transition-all duration-300
                    ${isHovered ? 'animate-bounce-slow' : ''}
                  `}
                  style={{animationDelay: '0.2s'}}
                  aria-label="Facebook"
                >
                  <Facebook size={isFooter ? 16 : isSidebar ? 18 : 14} className="text-white" />
                </a>

                <a
                  href="https://wa.me/201003193622"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    bg-gradient-to-br from-green-600 to-green-500 ${isSidebar ? 'p-2' : 'p-2'} rounded-full
                    transform hover:scale-110 hover:rotate-12 transition-all duration-300
                    ${isHovered ? 'animate-bounce-slow' : ''}
                    flex items-center justify-center
                  `}
                  style={{animationDelay: '0.3s'}}
                  aria-label="WhatsApp"
                >
                  <img
                    src="/assets/WhatsApp.svg.webp"
                    alt="WhatsApp"
                    className={`${isFooter ? 'w-4 h-4' : isSidebar ? 'w-6 h-6' : 'w-4 h-4'} object-contain`}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* زخرفة خلفية متحركة */}
      <div
        className={`
          absolute -z-10 w-32 h-32 rounded-full
          bg-gradient-to-br from-juice-green/20 to-juice-orange/20
          blur-xl opacity-0 transition-opacity duration-1000
          ${isHovered ? 'opacity-100' : ''}
        `}
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: isHovered ? 'pulse-slow 3s infinite' : 'none'
        }}
      ></div>
    </div>
  );
};

export default DesignerInfo;
