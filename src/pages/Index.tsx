
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ZoomIn, BookOpen, CreditCard } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import ImageModal from '../components/ImageModal';
import ReviewsGrid from '../components/ReviewsGrid';

// مكون عرض التقييمات
const ReviewsCarousel = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<{url: string, alt: string} | null>(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);

  // التعامل مع حركات اللمس للتمرير
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // تمرير لليسار
      setActiveIndex(prevIndex =>
        reviews.length > 0 ? (prevIndex + 1) % reviews.length : 0
      );
    }

    if (touchStart - touchEnd < -75) {
      // تمرير لليمين
      setActiveIndex(prevIndex =>
        reviews.length > 0 ? (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1) : 0
      );
    }
  };

  useEffect(() => {
    async function fetchReviews() {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(6);

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

    // تغيير التقييم النشط كل 5 ثوانٍ
    const interval = setInterval(() => {
      setActiveIndex(prevIndex =>
        reviews.length > 0 ? (prevIndex + 1) % reviews.length : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const renderStars = (count: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < count ? 'fill-juice-yellow text-juice-yellow' : 'text-gray-300 dark:text-gray-600'}`}
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

  return (
    <div className="mt-12 relative">
      <div className="overflow-hidden">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${activeIndex * (100 / reviews.length)}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >

          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`w-full md:w-1/3 flex-shrink-0 px-3 transition-all duration-500 ${index === activeIndex ? 'scale-105 opacity-100' : 'scale-95 opacity-70'}`}
            >
              <div className="juice-card p-6 h-full animate-fade-in hover:border-juice-green dark:hover:border-juice-green transition-colors duration-300 cursor-grab active:cursor-grabbing" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex text-juice-yellow mb-4">
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  "{review.comment}"
                </p>
                {review.image_url && (
                  <div className="relative group cursor-pointer mb-2" onClick={() => setSelectedImage({url: review.image_url, alt: review.name})}>
                    <img
                      src={review.image_url}
                      alt={review.name}
                      className="h-16 rounded-md transition-all duration-300 group-hover:brightness-90 animate-fade-in"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-black/50 rounded-full p-1">
                        <ZoomIn className="text-white h-5 w-5" />
                      </div>
                    </div>
                  </div>
                )}
                <div className="font-bold">{review.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{review.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* أزرار التنقل */}
      <div className="flex justify-center items-center mt-6 space-x-4 rtl:space-x-reverse">
        <button
          onClick={() => setActiveIndex(prevIndex => reviews.length > 0 ? (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1) : 0)}
          className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 shadow-md flex items-center justify-center text-juice-green hover:bg-juice-green hover:text-white transition-colors duration-300"
          aria-label="التقييم السابق"
        >
          <ArrowRight className="w-4 h-4 transform rotate-180 rtl:rotate-0" />
        </button>

        <div className="flex justify-center space-x-2 rtl:space-x-reverse">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-juice-green w-6' : 'bg-gray-300 dark:bg-gray-600'}`}
              aria-label={`انتقل إلى التقييم ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setActiveIndex(prevIndex => reviews.length > 0 ? (prevIndex + 1) % reviews.length : 0)}
          className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 shadow-md flex items-center justify-center text-juice-green hover:bg-juice-green hover:text-white transition-colors duration-300"
          aria-label="التقييم التالي"
        >
          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
        </button>
      </div>

      <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
        <p className="md:hidden">اسحب لليمين أو لليسار للتنقل بين التقييمات</p>
      </div>

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

const Index = () => {
  return (
    <div className="text-right" dir="rtl">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-juice-green/10 to-white dark:from-juice-green-dark/20 dark:to-gray-900 py-16 animate-fade-in animate-theme-transition">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-bold text-juice-green-dark dark:text-juice-green mb-4 animate-slide-right">
                عصائر طازجة <span className="text-juice-orange">100%</span>
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 animate-fade-in" style={{animationDelay: '0.3s'}}>
                استمتع بأشهى وألذ العصائر الطبيعية والفريشات المنعشة في محل جوس فريش. نستخدم فواكه طازجة عالية الجودة لتقديم أفضل المشروبات لعملائنا.
              </p>
              <div className="mt-8 animate-fade-in" style={{animationDelay: '0.5s'}}>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 transform hover:scale-105 transition-all duration-300">
                  <div className="flex flex-col space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        to="/menu"
                        className="btn-juice-primary group"
                      >
                        <span>المنيو</span>
                        <ArrowRight size={20} className="rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
                      </Link>
                      <Link
                        to="/reviews"
                        className="btn-juice-secondary group"
                      >
                        <span>قيمنا الآن</span>
                        <Star size={20} className="group-hover:scale-110 transition-transform duration-300" />
                      </Link>
                    </div>

                    <div className="relative overflow-hidden mt-2">
                      <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-red-500/20 to-transparent rounded-full animate-pulse-slow"></div>
                      <Link
                        to="/payment"
                        className="flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl shadow-lg px-8 py-4 hover:shadow-xl transition-all duration-300 w-full group hover:scale-105 border border-transparent hover:border-red-400 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <img
                          src="/assets/فودافون كاش.png"
                          alt="فودافون كاش"
                          className="h-12 relative z-10 group-hover:scale-110 transition-transform duration-300 mr-2"
                        />
                        <div className="flex flex-col items-start relative z-10">
                          <span className="text-xs text-red-200">الدفع السريع</span>
                          <span className="font-bold text-white text-lg">ادفع بفودافون كاش</span>
                        </div>
                        <CreditCard className="h-5 w-5 text-white relative z-10 mr-2 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <Link to="/menu" className="block relative group cursor-pointer">
                <div className="aspect-video rounded-2xl overflow-hidden animate-float shadow-lg relative">
                  <video
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="/assets/Video frise.mp4" type="video/mp4" />
                    متصفحك لا يدعم تشغيل الفيديو
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/80 text-juice-green-dark px-4 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center">
                      <span>انتقل إلى المنيو</span>
                      <ArrowRight size={18} className="mr-2 rtl:rotate-180" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Preview */}
      <section className="py-16 bg-white dark:bg-gray-900 animate-theme-transition">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="section-title animate-fade-in mb-4">ماذا يقول عملاؤنا</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg animate-fade-in" style={{animationDelay: '0.2s'}}>
              نفخر بآراء عملائنا الكرام ونسعى دائماً لتقديم أفضل تجربة ممكنة
            </p>
          </div>

          {/* عرض التقييمات كشبكة على الهاتف وكشريط على الشاشات الكبيرة */}
          <div className="md:block hidden bg-gradient-to-r from-juice-green/5 to-juice-orange/5 dark:from-juice-green-dark/10 dark:to-juice-orange-dark/10 rounded-3xl p-6 shadow-lg animate-theme-transition touch-pan-x">
            <ReviewsCarousel />
          </div>

          {/* عرض التقييمات كشبكة على الهاتف */}
          <div className="md:hidden block bg-gradient-to-r from-juice-green/5 to-juice-orange/5 dark:from-juice-green-dark/10 dark:to-juice-orange-dark/10 rounded-3xl p-6 shadow-lg animate-theme-transition">
            <ReviewsGrid />
          </div>

          <div className="flex justify-center mt-10 space-x-4 rtl:space-x-reverse animate-fade-in" style={{animationDelay: '0.4s'}}>
            <Link to="/reviews" className="btn-juice-secondary flex items-center group">
              <span> التقييمات</span>
              <ArrowRight size={18} className="mr-2 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
            </Link>
            <Link to="/reviews" className="btn-juice-primary flex items-center group">
              <span>قيمنا </span>
              <Star size={18} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 animate-fade-in animate-theme-transition" style={{animationDelay: '0.2s'}}>
        <div className="section-container">
          <h2 className="section-title animate-fade-in" style={{animationDelay: '0.3s'}}>لماذا تختار جوس فريش؟</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <div className="bg-gradient-to-br from-juice-green/10 to-juice-green/5 p-6 rounded-2xl text-center animate-float" style={{animationDelay: '0.1s'}}>
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-juice-green text-white rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-juice-green-dark dark:text-juice-green mb-3">فواكه طازجة 100%</h3>
              <p className="text-gray-600 dark:text-gray-300">نستخدم فقط الفواكه الطازجة عالية الجودة في جميع مشروباتنا لضمان النكهة المثالية.</p>
            </div>

            <div className="bg-gradient-to-br from-juice-orange/10 to-juice-orange/5 p-6 rounded-2xl text-center animate-float" style={{animationDelay: '0.3s'}}>
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-juice-orange text-white rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-juice-orange-dark dark:text-juice-orange mb-3">خدمة سريعة</h3>
              <p className="text-gray-600 dark:text-gray-300">نحرص على تقديم طلبك بأسرع وقت ممكن مع الحفاظ على أعلى معايير الجودة.</p>
            </div>

            <div className="bg-gradient-to-br from-juice-yellow/10 to-juice-yellow/5 p-6 rounded-2xl text-center animate-float" style={{animationDelay: '0.5s'}}>
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-juice-yellow text-white rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-juice-green-dark dark:text-juice-green mb-3">تنوع كبير</h3>
              <p className="text-gray-600 dark:text-gray-300">نوفر تشكيلة واسعة من العصائر والمكسات والفريشات لتناسب جميع الأذواق.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-juice-green/20 to-juice-orange/20 dark:from-juice-green-dark/30 dark:to-juice-orange-dark/30 animate-fade-in animate-theme-transition" style={{animationDelay: '0.6s'}}>
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 animate-pulse-slow">جاهز لتجربة ألذ العصائر؟</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              اطلب الآن واستمتع بتجربة مميزة مع جوس فريش. يمكنك الطلب عبر الموقع أو الاتصال بنا مباشرة!
            </p>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex justify-center space-x-4 rtl:space-x-reverse">
                <Link to="/menu" className="btn-juice-primary group">
                  <span>تصفح المنيو</span>
                  <BookOpen size={20} className="group-hover:scale-110 transition-transform duration-300" />
                </Link>
                <Link to="/reviews" className="btn-juice-secondary group">
                  <span>قيمنا الآن</span>
                  <Star size={20} className="group-hover:scale-110 transition-transform duration-300" />
                </Link>
              </div>

              <Link
                to="/payment"
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl shadow-lg px-8 py-4 hover:shadow-xl transition-all duration-300 group hover:scale-105 border border-transparent hover:border-red-400 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img src="/assets/فودافون كاش.png" alt="فودافون كاش" className="h-12 relative z-10 group-hover:scale-110 transition-transform duration-300 mr-2" />
                <div className="flex flex-col items-start relative z-10">
                  <span className="text-xs text-red-200">الدفع السريع</span>
                  <span className="font-bold text-white text-lg">ادفع بفودافون كاش</span>
                </div>
                <CreditCard className="h-5 w-5 text-white relative z-10 mr-2 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
