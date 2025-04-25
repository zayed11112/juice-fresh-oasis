import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ZoomIn } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import ImageModal from './ImageModal';

const ReviewsGrid = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<{url: string, alt: string} | null>(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(8); // زيادة الحد إلى 8 للسماح بعرض المزيد

        if (error) throw error;

        if (data) {
          setReviews(data);
        }
      } catch (error) {
        console.error('حدث خطأ أثناء تحميل التقييمات:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  const renderStars = (count) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < count ? 'fill-juice-yellow text-juice-yellow' : 'text-gray-300 dark:text-gray-600'}`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-juice-green"></div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 animate-fade-in">
        <p className="text-gray-500">لا توجد تقييمات حتى الآن. كن أول من يضيف تقييم!</p>
        <Link to="/reviews" className="text-juice-green hover:underline mt-2 inline-block">
          أضف تقييمك الآن
        </Link>
      </div>
    );
  }

  // عرض 4 تقييمات فقط في البداية، ثم عرض المزيد عند النقر على زر "عرض المزيد"
  const displayedReviews = showMore ? reviews : reviews.slice(0, 4);

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedReviews.map((review, index) => (
          <div key={review.id} className="animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
            <div className="juice-card p-4 h-full hover:border-juice-green dark:hover:border-juice-green transition-colors duration-300">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-bold text-gray-800 dark:text-white">{review.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{review.date}</div>
                </div>
                <div className="flex">
                  {renderStars(review.rating)}
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm line-clamp-3">
                "{review.comment}"
              </p>
              
              {review.image_url && (
                <div className="relative group cursor-pointer" onClick={() => setSelectedImage({url: review.image_url, alt: review.name})}>
                  <img
                    src={review.image_url}
                    alt={review.name}
                    className="h-16 rounded-md transition-all duration-300 group-hover:brightness-90 animate-fade-in"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/50 rounded-full p-1">
                      <ZoomIn className="text-white h-4 w-4" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {reviews.length > 4 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-juice-green hover:text-juice-green-dark dark:text-juice-green dark:hover:text-juice-green-light transition-colors duration-300 font-medium"
          >
            {showMore ? 'عرض أقل' : 'عرض المزيد من التقييمات'}
          </button>
        </div>
      )}

      {/* مكون عرض الصورة المكبرة */}
      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage.url}
          altText={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default ReviewsGrid;
