import React from 'react';
import { X } from 'lucide-react';

interface ImageModalProps {
  imageUrl: string;
  altText: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, altText, onClose }) => {
  // منع انتشار النقرات إلى الخلفية
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden animate-scale-up shadow-2xl"
        onClick={handleContentClick}
      >
        <div className="relative">
          <img 
            src={imageUrl} 
            alt={altText} 
            className="w-full h-auto max-h-[80vh] object-contain"
          />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-800 hover:text-red-600 rounded-full p-2 transition-all duration-300 transform hover:scale-110"
            aria-label="إغلاق"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-4 bg-white">
          <p className="text-gray-700 text-center">{altText}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
